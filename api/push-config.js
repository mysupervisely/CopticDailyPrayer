module.exports=(req,res)=>{
  const configured=Boolean(process.env.VAPID_PUBLIC_KEY&&process.env.VAPID_PRIVATE_KEY&&process.env.VAPID_SUBJECT&&process.env.CRON_SECRET&&process.env.KV_REST_API_URL&&process.env.KV_REST_API_TOKEN);
  res.status(200).json({configured,publicKey:configured?process.env.VAPID_PUBLIC_KEY:null});
};
