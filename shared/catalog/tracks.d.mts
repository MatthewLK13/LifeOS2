export interface CurriculumModule {title:string;topics:string[];practice:string;summary:string}
export interface CatalogTrack {
 id:string;key?:string;name:string;subtitle:string;icon:string;color:string;goal:string;rank:string;description:string;resource:string;
 concepts:string[];chapters:string[];modules:CurriculumModule[];project?:string;practice:string;explanation:string;
}
export const TRACKS:CatalogTrack[];
export function trackById(id:string):CatalogTrack|undefined;
