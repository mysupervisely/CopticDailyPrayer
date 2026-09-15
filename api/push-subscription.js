const crypto=require('node:crypto');
function configured(){return process.env.KV_REST_API_URL&&process.env.KV_REST_API_TOKEN&&process.env.VAPID_PUBLIC_KEY&&process.env.VAPID_PRIVATE_KEY&&process.env.VAPID_SUBJECT&&process.env.CRON_SECRET;}
async function kv(command,...args){
  const path=[command.toLowerCase(),...args.map(value=>encodeURIComponent(String(value)))].join('/');
  const response=await fetch(`${process.env.KV_REST_API_URL}/${path}`,{headers:{Authorization:`Bearer ${process.env.KV_REST_API_TOKEN}`}});
  if(!response.ok) throw new Error('KV request failed');
  return response.json();
}
module.exports=async(req,res)=>{
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'});}
  if(!configured()) return res.status(503).json({error:'Push delivery is not configured on this deployment.'});
  const {subscription,reminders,timeZone}=req.body||{};
  if(!subscription?.endpoint||!subscription?.keys?.p256dh||!subscription?.keys?.auth) return res.status(400).json({error:'Invalid push subscription'});
  const safeReminders=['morning','jesus','evening'].filter(key=>reminders?.[key]).reduce((out,key)=>{out[key]=String(reminders[key]).slice(0,5);return out;},{});
  if(!Object.keys(safeReminders).length) return res.status(400).json({error:'Choose at least one reminder'});
  const id=crypto.createHash('sha256').update(subscription.endpoint).digest('hex');
  await kv('SET',`prayer-push:${id}`,JSON.stringify({subscription,reminders:safeReminders,timeZone:String(timeZone||'UTC'),updatedAt:Date.now()}));
  return res.status(201).json({saved:true});
};
