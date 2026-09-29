self.addEventListener('push',event=>{
 let payload={};try{payload=event.data?.json()??{};}catch{payload={};}
 const title=typeof payload.title==='string'?payload.title:'LifeOS reminder',body=typeof payload.body==='string'?payload.body:'Your next small step is ready whenever you are.';
 event.waitUntil(self.registration.showNotification(title,{body,icon:'/assets/crest.png',badge:'/assets/crest.png',data:{url:typeof payload.url==='string'&&payload.url.startsWith('/')?payload.url:'/#today'}}));
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();const path=event.notification.data?.url;
 event.waitUntil((async()=>{const target=new URL(typeof path==='string'&&path.startsWith('/')?path:'/#today',self.location.origin);const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});for(const client of windows){if(new URL(client.url).origin===self.location.origin){await client.navigate(target.href);return client.focus();}}return self.clients.openWindow(target.href);})());
});
