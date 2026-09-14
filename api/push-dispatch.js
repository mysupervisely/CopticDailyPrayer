const webpush=require('web-push');
function ready(){return process.env.VAPID_PUBLIC_KEY&&process.env.VAPID_PRIVATE_KEY&&process.env.VAPID_SUBJECT&&process.env.KV_REST_API_URL&&process.env.KV_REST_API_TOKEN&&process.env.CRON_SECRET;}
async function kv(command,...args){const path=[command.toLowerCase(),...args.map(value=>encodeURIComponent(String(value)))].join('/');const r=await fetch(`${process.env.KV_REST_API_URL}/${path}`,{headers:{Authorization:`Bearer ${process.env.KV_REST_API_TOKEN}`}});if(!r.ok)throw new Error('KV request failed');return r.json();}
function localTime(zone){return new Intl.DateTimeFormat('en-CA',{timeZone:zone,hour:'2-digit',minute:'2-digit',hour12:false,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).reduce((o,p)=>(o[p.type]=p.value,o),{});}
module.exports=async(req,res)=>{
  if(req.headers.authorization!==`Bearer ${process.env.CRON_SECRET}`) return res.status(401).json({error:'Unauthorized'});
  if(!ready()) return res.status(503).json({error:'Push delivery is not configured'});
  webpush.setVapidDetails(process.env.VAPID_SUBJECT,process.env.VAPID_PUBLIC_KEY,process.env.VAPID_PRIVATE_KEY);
  const scan=await kv('SCAN','0','MATCH','prayer-push:*','COUNT','200'); const keys=scan.result?.[1]||[];
  const records=keys.length?(await kv('MGET',...keys)).result||[]:[]; let sent=0;
  for(const raw of records){if(!raw)continue;const record=JSON.parse(raw);let parts;try{parts=localTime(record.timeZone);}catch(_){continue;}const time=`${parts.hour}:${parts.minute}`;
    for(const [kind,chosen] of Object.entries(record.reminders||{})){if(chosen!==time)continue;const dedupe=`prayer-push-sent:${record.subscription.endpoint}:${parts.year}${parts.month}${parts.day}:${kind}`;if((await kv('SET',dedupe,'1','NX','EX',120)).result!== 'OK')continue;
      const labels={morning:'Morning prayer',jesus:'Jesus Prayer',evening:'Evening prayer'};try{await webpush.sendNotification(record.subscription,JSON.stringify({title:'Coptic Daily Prayer',body:`It is time for ${labels[kind]}.`,url:'/'}));sent++;}catch(error){if(error.statusCode===404||error.statusCode===410)await kv('DEL',keys[records.indexOf(raw)]);}
    }}
  return res.status(200).json({sent});
};
