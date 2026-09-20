window.loadCanonicalAgpeya=async function(){
 if(window.AGPEYA_DATA)return window.AGPEYA_DATA;
 const urls=['/legacy.html?agpeya-source=1','/?agpeya-source=1'];
 let lastError=null;
 for(const url of urls){
  try{
   const html=await fetch(url,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('source '+r.status);return r.text()});
   const start=html.indexOf('const firstHourSections='),end=html.indexOf('const fatherLibraries=',start);
   if(start<0||end<0)throw new Error('Canonical Agpeya data not found at '+url);
   let source=html.slice(start,end).replace(/let currentHour='first';\s*let sections=firstHourSections;?/g,'');
   const factory=new Function(source+'; return {first:firstHourSections,third:thirdHourSections,sixth:sixthHourSections,ninth:ninthHourSections,eleventh:eleventhHourSections,compline:complineSections,midnight:midnightSections};');
   window.AGPEYA_DATA=factory();
   return window.AGPEYA_DATA;
  }catch(e){lastError=e}
 }
 throw lastError||new Error('Unable to load canonical Agpeya');
};