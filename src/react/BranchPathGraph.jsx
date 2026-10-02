import React from 'react';
import { motion } from 'motion/react';

const compact = value => String(value || '').trim().toLowerCase();

function masteryFor(evidence, concept) {
  const key = compact(concept);
  const match = Object.entries(evidence || {}).find(([name]) => compact(name) === key);
  return match ? Math.round((match[1].masteryProbability ?? 0) * 100) : null;
}

export default function BranchPathGraph({ track, journey, chapters = [], selectedConcept, bktEvidence, onSelectConcept, onOpenQuest }) {
  const isRoadmap = Boolean(journey?.chapters?.length);
  const groups = isRoadmap
    ? chapters.map(chapter => ({ id: chapter.id || chapter.title, title: chapter.title, summary: chapter.summary, children: chapter.quests || [], kind: 'quest' }))
    : (track.modules || []).map((module, index) => ({ id: `${track.id}-${index}`, title: module.title, summary: module.summary, children: module.topics || [], kind: 'concept', practice: module.practice }));
  const columns = Math.min(4, Math.max(groups.length, 1));
  const rows = Math.ceil(groups.length / columns);
  const rowHeight = isRoadmap ? 280 : 330;
  const height = 205 + rows * rowHeight;
  const width = 1200;
  const centers = groups.map((_, index) => ((index % columns) + .5) * width / columns);
  const rootX = width / 2;

  return <section className="rx-branch-map" aria-label={`${journey?.title || track.name} learning tree`}>
    <div className="rx-branch-map-top">
      <div><span className="rx-branch-root-mark">✦</span><div><b>{journey?.title || track.name}</b><small>{isRoadmap ? `${groups.length} chapters · ${groups.reduce((n, group) => n + group.children.length, 0)} generated quests` : `${track.modules?.length || 0} modules · ${track.concepts?.length || 0} concepts`}</small></div></div>
      <span className="rx-branch-map-caption">{isRoadmap ? 'GEMINI ROADMAP TREE' : 'CURRICULUM PREVIEW'}</span>
    </div>
    <div className="rx-branch-scroll">
      <div className={`rx-branch-canvas ${isRoadmap ? 'roadmap' : 'curriculum'}`} style={{ height, minWidth: 920 }}>
        <svg className="rx-branch-lines" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
          <path className="rx-branch-line" d={`M${rootX} 72 V${130 + Math.max(rows - 1, 0) * rowHeight}`} />
          {Array.from({ length: rows }, (_, row) => {
            const first = row * columns;
            const last = Math.min(first + columns, groups.length) - 1;
            const busY = 130 + row * rowHeight;
            return <g key={`row-${row}`}>
              <path className="rx-branch-line" style={{ animationDelay: `${row * 90}ms` }} d={`M${centers[first]} ${busY} H${centers[last]}`} />
              {centers.slice(first, last + 1).map((x, offset) => <path key={x} className="rx-branch-line rx-branch-drop" style={{ animationDelay: `${(first + offset) * 65 + 100}ms` }} d={`M${x} ${busY} V${145 + row * rowHeight}`} />)}
            </g>;
          })}
        </svg>
        <div className="rx-branch-root-node" style={{ left: `${rootX / width * 100}%` }}><span>{isRoadmap ? 'ROADMAP' : 'FIELD'}</span><b>{isRoadmap ? journey.title : track.name}</b></div>
        <div className="rx-branch-groups" style={{ gridTemplateColumns: `repeat(${columns}, minmax(205px, 1fr))` }}>
          {groups.map((group, index) => <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .045 }} className="rx-branch-group" key={group.id} style={{ '--branch-color': track.color, gridRow: Math.floor(index / columns) + 1, gridColumn: index % columns + 1 }}>
            <div className="rx-branch-group-head"><span>{String(index + 1).padStart(2, '0')}</span><div><b>{group.title}</b>{group.summary && <small>{group.summary}</small>}</div></div>
            {group.kind === 'concept' ? <div className="rx-branch-children">{group.children.map((concept, childIndex) => {
              const mastery = masteryFor(bktEvidence, concept);
              return <button key={`${group.id}-${concept}`} className={`rx-branch-child ${selectedConcept === concept ? 'selected' : ''}`} onClick={() => onSelectConcept({ title: concept, module: group.title, summary: group.summary, practice: group.practice, mastery })}>
                <i aria-hidden="true"/><span>{concept}</span>{mastery !== null && <small>{mastery}%</small>}
              </button>;
            })}</div> : <div className="rx-branch-children quest">{group.children.map((quest, childIndex) => <button key={quest.id || `${group.id}-${childIndex}`} className="rx-branch-child quest" onClick={() => onOpenQuest(quest.id)}><i aria-hidden="true"/><span>{quest.title}</span><small>{quest.status === 'COMPLETED' ? 'Done' : `${quest.minutes || 25} min`}</small></button>)}</div>}
          </motion.article>)}
        </div>
      </div>
    </div>
    <p className="rx-branch-map-hint">{isRoadmap ? 'Open a quest to solve its generated problem.' : 'Select a topic to see what you could learn. Arcana can turn it into a roadmap with real quests.'}</p>
  </section>;
}
