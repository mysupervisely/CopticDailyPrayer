module.exports=(req,res)=>{
  // The Hobby plan cannot run the minute-level scheduler needed to honour
  // individual local reminder times. Keep the Web Push foundation dormant
  // until a reliable external scheduler is introduced in a later milestone.
  res.status(200).json({scheduledDeliveryAvailable:false,publicKey:null});
};
