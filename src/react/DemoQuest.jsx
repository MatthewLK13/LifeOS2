import React, { useState } from 'react';

export default function DemoQuest({ quest, onScored, onAdapt }) {
  const pack = quest.metadata.learningPackage;
  const { outcome } = pack;
  const problem = outcome.problem;
  const questions = problem.questions || [];
  const [selected, setSelected] = useState({});
  const [answer, setAnswer] = useState('');
  const [checks, setChecks] = useState({});
  const [result, setResult] = useState(null);
  const isAssessment = outcome.type === 'Assessment';
  const criteria = problem.acceptanceCriteria || [];
  const ready = isAssessment
    ? questions.length > 0 && questions.every((_, index) => selected[index] !== undefined)
    : answer.trim().length >= 20 && criteria.every((_, index) => checks[index]);

  const submit = () => {
    if (!ready || result) return;
    let scored;
    if (isAssessment) {
      const evidence = questions.map((item, index) => ({ conceptName: item.conceptName, correct: selected[index] === item.answerIndex }));
      const correctCount = evidence.filter(item => item.correct).length;
      const ratio = correctCount / evidence.length;
      scored = { evidence, correctCount, totalCount: evidence.length, verdict: ratio >= .8 ? 'STRONG' : ratio >= .5 ? 'GOOD' : 'NEEDS_WORK', feedback: evidence.map((item, index) => (index + 1) + '. ' + (item.correct ? 'Correct.' : questions[index].explanation)).join('\n') };
    } else {
      const completed = Object.values(checks).filter(Boolean).length;
      const met = completed / Math.max(1, criteria.length) >= .7;
      scored = { evidence: problem.conceptNames.map(conceptName => ({ conceptName, correct: met })), correctCount: completed, totalCount: criteria.length, verdict: met ? 'SELF_CHECK_RECORDED' : 'NEEDS_REVIEW', feedback: completed + ' of ' + criteria.length + ' acceptance criteria checked. This demo records your self-check; it does not claim an AI review.' };
    }
    setResult(scored);
    onScored(quest, scored);
  };

  return <article className="rx-detail-card">
    <div className="rx-detail-top"><span className="rx-pill">SAMPLE QUEST · NO ACCOUNT NEEDED</span><span>◷ {quest.minutes} min</span></div>
    <h2>{quest.title}</h2>
    <section className="rx-package">
      <section><span>01</span><div><div className="rx-eyebrow">LEARN</div><p>{pack.learn.explanation}</p><div className="rx-example"><b>Example</b><p>{pack.learn.example}</p></div></div></section>
      <section><span>02</span><div><div className="rx-eyebrow">PRACTICE</div><p>{pack.practice.scenario}</p><ul>{pack.practice.steps.map((step, index) => <li key={index}>{step}</li>)}</ul></div></section>
    </section>
    <section className="rx-generated-challenge">
      <div className="rx-eyebrow">{isAssessment ? 'ASSESSMENT · KNOWLEDGE CHECK' : 'PROJECT · YOUR SOLUTION'}</div>
      <h3>{problem.task}</h3>
      <div className="rx-example"><b>Given</b><pre>{problem.starterMaterial}</pre></div>
      {isAssessment ? questions.map((item, index) => <fieldset className="rx-generated-question" key={index}>
        <legend><b>{index + 1}. {item.question}</b></legend><p>{item.context}</p><small>Concept: {item.conceptName}</small>
        <div>{item.choices.map((choice, choiceIndex) => <label key={choiceIndex}><input type="radio" name={'demo-'+quest.id+'-'+index} checked={selected[index] === choiceIndex} onChange={() => setSelected(current => ({ ...current, [index]: choiceIndex }))} />{choice}</label>)}</div>
      </fieldset>) : <>
        <h4>Requirements</h4><ul>{problem.requirements.map((item, index) => <li key={index}>{item}</li>)}</ul>
        <h4>Acceptance criteria</h4>
        <div className="rx-demo-checks">{criteria.map((item, index) => <label key={index}><input type="checkbox" checked={Boolean(checks[index])} onChange={event => setChecks(current => ({ ...current, [index]: event.target.checked }))} />{item}</label>)}</div>
        <label className="rx-entry-label" htmlFor={'demo-solution-'+quest.id}>Your solution</label>
        <textarea id={'demo-solution-'+quest.id} className="rx-response" value={answer} onChange={event => setAnswer(event.target.value)} placeholder="Write your solution, working, or design notes." maxLength={6000} />
        <small>Self-assessed for the demo. No AI grading is claimed.</small>
      </>}
    </section>
    {!result && <button className="rx-button rx-full" disabled={!ready} onClick={submit}>{isAssessment ? 'Check answers and record evidence' : 'Record self-check and learning evidence'} →</button>}
    {result && <section className="rx-generated-result"><div className="rx-eyebrow">{result.verdict} · BKT UPDATED</div><p>{result.feedback}</p>{isAssessment && <b>{result.correctCount} / {result.totalCount} correct</b>}<p>Your result is saved in this browser and will guide the next roadmap request.</p>{onAdapt && <button className="rx-button rx-full" onClick={onAdapt}>Talk with Arcana about the next roadmap →</button>}</section>}
  </article>;
}
