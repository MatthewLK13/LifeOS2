// Suggested study dependencies; these guide exploration without locking activities.
export function chapterPath(index,count){
 const dependencies=count===10?[[],[0],[1],[1],[3],[2,4],[5],[5],[7],[6,7]]:[[],[0],[1],[1],[2,3],[4],[4],[5]];
 const optional=index===count-2;
 return {requires:dependencies[index]||[index-1],optional,lane:index<2?'Foundation':index===count-1?'Project':optional?'Optional exploration':'Parallel study'};
}
