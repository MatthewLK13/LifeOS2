import React, { useState } from 'react';
import { motion } from 'motion/react';

const titleCase = value => String(value || 'DISCOVERED').toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());

export function buildKnowledgeDomains(knowledge, skillState, tracks) {
  const trackById = new Map(tracks.map(track => [track.id, track]));
  if (Array.isArray(knowledge?.domains) && Array.isArray(knowledge?.concepts)) {
    const progressByConcept = new Map((knowledge.progress || []).map(item => [item.conceptId, item]));
    return knowledge.domains.map(domain => {
      const concepts = knowledge.concepts.filter(concept => concept.domainId === domain.id && concept.level !== 'UNSEEN').map(concept => {
        const progress = progressByConcept.get(concept.id);
        return { id: concept.id, name: concept.name, description: concept.description, level: concept.level, firstSeenAt: progress?.firstSeenAt, updatedAt: progress?.updatedAt };
      });
      return { id: domain.id, name: domain.name, description: domain.description, color: trackById.get(domain.id)?.color || '#677fbd', concepts };
    }).filter(domain => domain.concepts.length);
  }

  const groups = new Map();
  for (const concept of skillState?.learnerState?.concepts || []) {
    if (concept.masteryLevel === 'UNSEEN' || (!concept.evidenceStrength?.length && !concept.masteryProbability)) continue;
    const name = concept.domainName || 'Other knowledge';
    if (!groups.has(name)) groups.set(name, { id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name, description: '', color: '#677fbd', concepts: [] });
    groups.get(name).concepts.push({ id: concept.conceptId, name: concept.name, description: '', level: concept.masteryLevel, masteryProbability: concept.masteryProbability, evidenceStrength: concept.evidenceStrength });
  }
  return [...groups.values()];
}

export default function KnowledgeGraph({ domains, isDemo }) {
  const [selectedDomainId, setSelectedDomainId] = useState(null);
  const [selectedConceptId, setSelectedConceptId] = useState(null);
  const selectedDomain = domains.find(domain => domain.id === selectedDomainId) || domains[0];
  const selectedConcept = selectedDomain?.concepts.find(concept => concept.id === selectedConceptId) || null;
  const columns = 4;
  const rowCount = Math.ceil(domains.length / columns);
  const height = rowCount * 142 + 120;
  const rowCenters = Array.from({ length: rowCount }, (_, row) => 175 + row * 142);
  const nodes = domains.map((domain, index) => {
    const row = Math.floor(index / columns);
    const start = row * columns;
    const inRow = Math.min(columns, domains.length - start);
    const column = index - start;
    return { domain, index, x: inRow === 1 ? 500 : (column + .5) * 1000 / inRow, y: rowCenters[row] };
  });

  if (!domains.length) return <section className="rx-knowledge-empty"><span>✦</span><h2>Your knowledge tree is ready to grow</h2><p>Concepts will appear here after you complete learning activities or assessments. Their recorded level will change as you build evidence.</p></section>;

  const selectDomain = id => {
    setSelectedDomainId(id);
    setSelectedConceptId(null);
    window.setTimeout(() => document.getElementById('rx-knowledge-branch')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
  };

  return <>
    <div className="rx-graph-scroll"><div className="rx-tree-graph" style={{ height }}>
      <svg viewBox={`0 0 1000 ${height}`} preserveAspectRatio="none" aria-hidden="true"><path className="rx-tree-trunk" d={`M500 68 V${rowCenters.at(-1) - 50}`} />{nodes.map(node => <path key={node.domain.id} className="rx-tree-limb" d={`M500 68 C500 112 ${node.x} ${node.y - 85} ${node.x} ${node.y - 34}`} />)}</svg>
      <div className="rx-tree-root"><span>✦</span><b>MY KNOWLEDGE</b><small>{domains.reduce((sum, domain) => sum + domain.concepts.length, 0)} recorded concepts</small></div>
      {nodes.map(({ domain, index, x, y }) => <motion.button whileHover={{ y: -3 }} className={`rx-tree-branch ${selectedDomain?.id === domain.id ? 'selected' : ''}`} key={domain.id} style={{ left: `${x / 10}%`, top: y, '--c': domain.color }} onClick={() => selectDomain(domain.id)} aria-expanded={selectedDomain?.id === domain.id} aria-controls="rx-knowledge-branch"><span className="rx-tree-node-dot" /><small>BRANCH {String(index + 1).padStart(2, '0')}</small><b>{domain.name}</b><span className="rx-tree-concepts">{domain.concepts.slice(0, 3).map(concept => concept.name).join(' · ')}</span><em>{domain.concepts.length} recorded · View knowledge →</em></motion.button>)}
    </div></div>
    <p className="rx-graph-hint">Select a branch to inspect your recorded concepts and their current levels.</p>
    <section className="rx-knowledge-branch" id="rx-knowledge-branch" aria-label={`${selectedDomain.name} recorded knowledge`}>
      <div className="rx-knowledge-branch-head"><div><div className="rx-eyebrow">RECORDED KNOWLEDGE · {selectedDomain.name.toUpperCase()}</div><h2>{selectedDomain.name}</h2><p>{selectedDomain.concepts.length} concepts with learning evidence{isDemo ? ' · Illustrative guest profile' : ''}</p></div><span className="rx-knowledge-branch-count">{selectedDomain.concepts.length}</span></div>
      <div className="rx-knowledge-concepts">{selectedDomain.concepts.map(concept => <button className={`rx-knowledge-concept ${selectedConcept?.id === concept.id ? 'selected' : ''}`} key={concept.id} onClick={() => setSelectedConceptId(concept.id)}><i /><span><b>{concept.name}</b><small>{titleCase(concept.level)}</small></span><span className="rx-knowledge-chevron">›</span></button>)}</div>
      {selectedConcept && <motion.article initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} className="rx-knowledge-detail" aria-live="polite"><div className="rx-eyebrow">CONCEPT DETAIL</div><h3>{selectedConcept.name}</h3><p>{selectedConcept.description || `Recorded knowledge in ${selectedDomain.name}.`}</p><div><span>Current level <b>{titleCase(selectedConcept.level)}</b></span>{selectedConcept.firstSeenAt && <span>First recorded <b>{new Date(selectedConcept.firstSeenAt).toLocaleDateString('en-US')}</b></span>}{selectedConcept.masteryProbability != null && <span>Mastery estimate <b>{Math.round(selectedConcept.masteryProbability * 100)}%</b></span>}</div></motion.article>}
    </section>
  </>;
}
