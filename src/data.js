import {trackById} from '../shared/catalog/tracks.mjs';
import {STATUSES,CONCEPTS} from '../shared/catalog/concepts.mjs';
export {TRACKS,trackById} from '../shared/catalog/tracks.mjs';
export {STATUSES,CONCEPTS} from '../shared/catalog/concepts.mjs';
export const INITIAL_MESSAGES = [{role:'assistant',text:'Welcome back, Minh. Every great journey begins with a little curiosity. Tell me what you want to learn, and we will turn it into a roadmap together.',kind:'welcome'}];
export function questContent(trackId,topic,type='Practice') {
  const t=trackById(trackId);
  return {description:type==='Learn' ? `Explore ${topic.toLowerCase()} with a short reading and a concrete example. Focus on the ideas you can explain in your own words.` : `Put ${topic.toLowerCase()} into practice. Work through a small example, notice what changes, and record one useful insight.`, steps:[`Read the introduction to ${topic.toLowerCase()}`,`Try a small ${t.name} example of your own`,'Write down one observation or question','Reflect on where this could be useful'],prompt:t.practice,resource:t.resource};
}
