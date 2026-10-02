import React, { useEffect, useState } from 'react';
import { createAssessment, startQuest, submitAssessment } from '../api-client.js';

export default function GeneratedQuest({ quest, onScored, onAdapt }) {
  const pack = quest.metadata?.learningPackage || quest.learningPackage;
  const outcome = pack?.outcome;
  const problem = outcome?.problem;
  const questions = problem?.questions || [];
  const [assessment, setAssessment] = useState(null);
  const [selected, setSelected] = useState({});
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!problem) { setBusy(false); return; }
    let live = true;
    (async () => {
      try {
        await startQuest(quest.id).catch(() => {});
        const response = await createAssessment({ subtype: outcome.type === 'Assessment' ? 'QUIZ' : 'WRITTEN', topic: quest.topic || quest.title, prompt: outcome.prompt, questId: quest.id });
        if (live) setAssessment(response.assessment);
      } catch (cause) {
        if (live) setError(cause.message || 'Answer submission is unavailable right now. The saved problem is still shown below.');
      } finally {
        if (live) setBusy(false);
      }
    })();
    return () => { live = false; };
  }, [quest.id]);

  const submit = async () => {
    if (busy || !assessment) return;
    setBusy(true);
    setError('');
    try {
      const body = outcome.type === 'Assessment' ? { answers: questions.map((_, index) => selected[index]) } : { answer };
      const response = await submitAssessment(assessment.id, body);
      setResult(response.result);
      await onScored(quest, response.result);
    } catch (cause) {
      setError(cause.message || 'Your response could not be scored.');
    } finally {
      setBusy(false);
    }
  };

  if (!pack || !outcome || !problem) return <article className="rx-detail-card"><h2>{quest.title}</h2><p>This older quest has no saved problem. Generate a new roadmap with Arcana to receive actual questions or a project brief.</p></article>;

  return <article className="rx-detail-card">
    <div className="rx-detail-top"><span className="rx-pill">{quest.topic || 'GEMINI ROADMAP'}</span><span>◷ {quest.minutes || 25} min</span></div>
    <h2>{quest.title}</h2>
    <section className="rx-generated-challenge">
      <div className="rx-eyebrow">{outcome.type === 'Assessment' ? 'QUEST · SOLVE THESE QUESTIONS' : 'QUEST · SOLVE THIS PROJECT'}</div>
      <h3>{problem.task}</h3>
      {problem.starterMaterial && <div className="rx-example"><b>Given</b><pre>{problem.starterMaterial}</pre></div>}
      {outcome.type === 'Assessment' && questions.map((question, index) => <fieldset className="rx-generated-question" key={`${quest.id}-${index}`}><legend><b>{index + 1}. {question.question}</b></legend>{question.context && <p>{question.context}</p>}<small>Concept: {question.conceptName}</small><div>{question.choices.map((choice, choiceIndex) => <label key={choiceIndex}><input type="radio" name={`answer-${quest.id}-${index}`} checked={selected[index] === choiceIndex} onChange={() => setSelected(current => ({ ...current, [index]: choiceIndex }))} />{choice}</label>)}</div></fieldset>)}
      {outcome.type === 'Project' && <><h4>Requirements</h4><ul>{(problem.requirements || []).map((item, index) => <li key={index}>{item}</li>)}</ul><h4>Acceptance criteria</h4><ul>{(problem.acceptanceCriteria || []).map((item, index) => <li key={index}>{item}</li>)}</ul><p><b>Skills assessed:</b> {(problem.conceptNames || []).join(', ')}</p><label className="rx-entry-label" htmlFor="generated-project-answer">Your solution</label><textarea id="generated-project-answer" className="rx-response" value={answer} onChange={event => setAnswer(event.target.value)} placeholder="Describe your solution, show calculations or code, and explain why it meets the criteria." maxLength={8000} /></>}
    </section>
    {busy && !assessment && !result && <p role="status">Preparing answer submission…</p>}
    {error && <div className="rx-error" role="alert">{error}</div>}
    {!result && <button className="rx-button rx-full" disabled={busy || !assessment || (outcome.type === 'Assessment' ? questions.length < 3 || questions.some((_, index) => selected[index] === undefined) : answer.trim().length < 20)} onClick={submit}>{busy ? 'Scoring…' : outcome.type === 'Assessment' ? 'Submit answers for scoring' : 'Submit solution for Gemini review'} →</button>}
    {result && <section className="rx-generated-result"><div className="rx-eyebrow">{result.verdict} · BKT UPDATED</div><p>{result.feedback}</p>{result.correctCount !== undefined && <b>{result.correctCount} / {result.totalCount} correct</b>}<p>This evidence will guide the next roadmap and its new quests.</p><button className="rx-button rx-full" onClick={onAdapt}>Adapt roadmap using this result →</button></section>}
    <details className="rx-supporting-learning"><summary>Review the lesson and practice notes</summary><h4>Learn</h4><p>{pack.learn.explanation}</p><div className="rx-example"><b>Example</b><p>{pack.learn.example}</p></div><h4>Practice</h4><p>{pack.practice.scenario}</p><ul>{pack.practice.steps.map((step, index) => <li key={index}>{step}</li>)}</ul></details>
  </article>;
}
