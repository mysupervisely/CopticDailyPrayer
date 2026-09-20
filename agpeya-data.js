window.loadCanonicalAgpeya=async function(){
 if(window.AGPEYA_DATA)return window.AGPEYA_DATA;
 const urls=['/?agpeya-source=1'];
 let lastError=null;
 for(const url of urls){
  try{
   const html=await fetch(url,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('source '+r.status);return r.text()});
   const start=html.indexOf('const firstHourSections='),end=html.indexOf('const fatherLibraries=',start);
   if(start<0||end<0)throw new Error('Canonical Agpeya data not found at '+url);
   let source=html.slice(start,end).replace(/let currentHour='first';\s*let sections=firstHourSections;?/g,'');
   const factory=new Function(source+'; return {first:firstHourSections,third:thirdHourSections,sixth:sixthHourSections,ninth:ninthHourSections,eleventh:eleventhHourSections,compline:complineSections,midnight:midnightSections};');
   const data=factory();

   // Preferred wording supplied by the user. Keep this override local so the
   // reader remains stable while each Hour is transcribed and verified.
   const first=data.first||[];
   const replace=(title,text)=>{
    const item=first.find(s=>String(s.title||'').toLowerCase().includes(title.toLowerCase()));
    if(item)item.text=text;
   };
   replace('Introduction of Every Hour',`In the name of the Father and the Son and the Holy Spirit, one God. Amen.

Kyrie eleison. Lord have mercy. Lord have mercy. Lord bless us. Amen.

Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen.`);
   replace('Our Father',`Make us worthy to pray thankfully:

Our Father who art in heaven, hallowed be Thy name.

Thy kingdom come, Thy will be done, on earth as it is in heaven.

Give us this day our daily bread and forgive us our trespasses, as we forgive those who trespass against us and lead us not into temptation, but deliver us from the evil one.

In Christ Jesus our Lord. For Thine is the kingdom, and the power, and the glory, forever. Amen.`);
   replace('Prayer of Thanksgiving',`Let us give thanks to the beneficent and merciful God, the Father of our Lord, God, and Savior Jesus Christ.

For He has covered us, helped us, guarded us, accepted us to Himself, spared us, supported us, and has brought us to this hour.

Let us also ask Him, the Lord our God, the Pantocrator, to guard us in all peace this holy day and all the days of our life.

O Master, Lord, God the Pantocrator, the Father of our Lord, God, and Savior Jesus Christ,

we thank You for everything, concerning everything, and in everything.

For You have covered us, helped us, guarded us, accepted us to Yourself, spared us, supported us, and have brought us to this hour.

Therefore, we ask and entreat Your goodness, O Lover of Mankind, grant us to complete this holy day and all the days of our life in all peace with Your fear.

All envy, all temptation, all the work of Satan, the counsel of wicked men and the rising up of enemies, hidden and manifest,

take them away from us

and from all Your people,

and from this Your holy place.

But those things which are good and profitable do provide for us, for it is You who have given us the authority to tread on serpents and scorpions, and upon all the power of the enemy.

And lead us not into temptation, but deliver us from the evil one,

Through the grace, compassion, and love-of-mankind of Your only-begotten Son, our Lord, God, and Savior Jesus Christ.

through whom the glory, honor, dominion, and worship are due unto You, with Him and the Holy Spirit, the Giver of Life, who is of one essence with You,

now and at all times and unto the age of all ages. Amen.`);
   replace('Psalm 50',`Have mercy upon me, O God, according to Your great mercy; and according to the multitude of Your compassions blot out my iniquity. Wash me thoroughly from my iniquity, and cleanse me from my sin. For I am conscious of my iniquity; and my sin is at all times before me.

Against You only I have sinned, and done evil before You, that You might be just in Your sayings, and might overcome when You are judged. For, behold, I was conceived in iniquities, and in sins my mother conceived me.

For, behold, You have loved the truth; You have manifested to me the hidden and unrevealed things of Your wisdom. You shall sprinkle me with Your hyssop, and I shall be purified. You shall wash me, and I shall be made whiter than snow. You shall make me to hear gladness and joy; the humbled bones shall rejoice.

Turn away Your face from my sins, and blot out all my iniquities. Create in me a clean heart, O God; and renew a right spirit in my inward parts. Do not cast me away from Your face; and do not remove Your Holy Spirit from me. Give me the joy of Your salvation, and uphold me with a directing spirit. Then I shall teach the transgressors Your ways; and the ungodly men shall turn to You.

Deliver me from blood, O God, the God of my salvation, and my tongue shall rejoice in Your righteousness. O Lord, You shall open my lips, and my mouth shall declare Your praise. For if You desired sacrifice, I would have given it; You do not take pleasure in burnt offerings. The sacrifice of God is a broken spirit; a broken and humbled heart God shall not despise.

Do good, O Lord, in Your good pleasure to Zion; and let the walls of Jerusalem be built. Then You shall be pleased with sacrifices of righteousness, offering, and burnt sacrifices: then they shall offer calves upon Your altar. ALLELUIA.`);
   replace('Come Let Us Kneel Down',`Come let us kneel down, let us ask Christ our God.

Come let us kneel down, let us beseech Christ our King.

Come let us kneel down, let us entreat Christ our Savior.

O Lord Jesus Christ, the Word of God, our God, through the intercession of Saint Mary and all Your saints, preserve us, and bring us to a good start. Have mercy on us according to Your will forever.

The night has passed; we thank You, O Lord, and we ask You to keep us this day away from sin and deliver us.`);
   replace('Pauline Epistle',`I, therefore, the prisoner of the Lord, beseech you to walk worthy of the calling with which you were called, with all lowliness and meekness, with longsuffering, bearing with one another in love, endeavoring to keep the unity of the Spirit in the bond of peace. There is one body, and one Spirit, just as you were called in one hope of your calling; one Lord, one faith, one baptism.`);
   replace('Faith of the Church',`One is God the Father of everyone. One is His Son, Jesus Christ the Word, who took flesh and died and rose from the dead on the third day, and raised us with Him. One is the Holy Spirit, the Comforter, one in His hypostasis, proceeding from the Father, purifying the whole creation, and teaching us to worship the Holy Trinity, one in divinity and one in essence. We praise Him and bless Him forever. Amen.`);
   replace('Conclusion of Every Hour',`Have mercy on us, O God, and have mercy on us, who at all times and in every hour, in heaven and on earth, is worshipped and glorified; Christ our God, the good, the long suffering, the abundant in mercy, and the great in compassion, who loves the righteous and has mercy on the sinners of whom I am chief, who does not wish the death of the sinner but rather that he returns and lives, who calls all to salvation for the promise of the good things to come.

Lord receive from us our prayers in this hour and in every hour. Ease our life and guide us to fulfill Your commandments. Sanctify our spirits. Cleanse our bodies. Conduct our thoughts. Purify our intentions. Heal our diseases. Forgive our sins. Deliver us from every evil grief and distress of heart. Surround us by Your holy angels, that, by their camp, we may be guarded and guided, and attain the unity of faith, and the knowledge of Your imperceptible and infinite glory. For You are blessed forever. Amen.`);
   // Common prayers use the same supplied wording in each Hour.
   const preferredIntro=first.find(s=>String(s.title||'').toLowerCase().includes('introduction of every hour'));
   const preferredOurFather=first.find(s=>String(s.title||'').toLowerCase().includes('our father'));
   const preferredThanksgiving=first.find(s=>String(s.title||'').toLowerCase().includes('thanksgiving'));
   const preferredPsalm50=first.find(s=>String(s.title||'').toLowerCase().includes('psalm 50'));
   const preferredConclusion=first.find(s=>String(s.title||'').toLowerCase().includes('conclusion of every hour'));
   [data.third,data.sixth,data.ninth,data.eleventh,data.compline,data.midnight].forEach(hourSections=>{
    if(!hourSections)return;
    hourSections.forEach(section=>{
     const t=String(section.title||'').toLowerCase();
     if(preferredIntro&&t.includes('introduction of every hour'))section.text=preferredIntro.text;
     else if(preferredOurFather&&t.includes('our father'))section.text=preferredOurFather.text;
     else if(preferredThanksgiving&&t.includes('thanksgiving'))section.text=preferredThanksgiving.text;
     else if(preferredPsalm50&&t.includes('psalm 50'))section.text=preferredPsalm50.text;
     else if(preferredConclusion&&t.includes('conclusion of every hour'))section.text=preferredConclusion.text;
    });
   });

   // Third Hour wording verified from the supplied screenshots.
   const third=data.third||[];
   const replaceThird=(title,text)=>{
    const item=third.find(s=>String(s.title||'').toLowerCase().includes(title.toLowerCase()));
    if(item)item.text=text;
   };
   replaceThird('Gospel',`When the Comforter, the Holy Spirit, whom the Father will send in My name, has come, He shall teach you all things, and bring to your remembrance all things that I have said to you. My peace I leave with you, My peace I give unto you; not as the world gives do I give unto you. Let not your heart be troubled, neither let it be afraid.

You have heard Me say to you, "I am going away, and coming back to you." If you loved Me, you would rejoice, because I said, "I am going to the Father," for My Father is greater than I. And now I have told you before it comes, that when it does come to pass, you may believe.

I will no longer talk much with you, for the prince of this world comes, and has nothing in Me. But that the world may know that I love the Father, and as the Father gave Me commandment, so I do.

I am the true vine, and My Father is the vinedresser. Every branch in Me that does not bear fruit He takes away; and every branch that bears fruit He prunes, that it may bear more fruit. Now you are clean through the word which I have spoken unto you. Abide in Me, and I in you.

Glory be to God forever. Amen.`);
   replaceThird('Absolution',`O God of compassion, the Lord of all comfort, who comforted us at all times with the comfort of Your Holy Spirit, we thank You for raising us for prayer in this holy hour, in which You abundantly poured the grace of Your Holy Spirit upon Your holy disciples and honorable and blessed apostles, like tongues of fire.

We ask and entreat You, O Lover of Mankind, accept our prayers and forgive our sins and send forth upon us the grace of Your Holy Spirit, and purify us from all defilement of body and spirit.

Change us into a spiritual manner of life, that we may walk in the Spirit and not fulfill the lusts of the flesh. And make us worthy to serve You with purity and righteousness all the days of our life.

For unto You is due glory, honor, and dominion, with Your good Father and the Holy Spirit, now and ever and unto the ages of all ages. Amen.`);
   window.AGPEYA_DATA=data;
   return data;
  }catch(e){lastError=e}
 }
 throw lastError||new Error('Unable to load canonical Agpeya');
};