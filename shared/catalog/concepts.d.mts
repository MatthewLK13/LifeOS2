export interface CatalogConcept {id:string;key:string;trackId:string;name:string;status:string;chapter:number;scope:string;evidence:Array<{date:string;text:string;reason:string}>}
export const STATUSES:Record<string,{label:string;short:string;color:string}>;
export const CONCEPTS:CatalogConcept[];
