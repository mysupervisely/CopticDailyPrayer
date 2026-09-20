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
   // First Hour closing prayers, transcribed from the supplied preferred wording.
   replace('Hail to You',`Hail to you. We ask you, O saint full of glory, the ever-virgin, the Theotokos, the Mother of Christ, lift up our prayers unto your beloved Son, that He may forgive us our sins.

Hail to the holy Virgin, who has brought forth unto us the true Light, Christ our God. Ask the Lord on our behalf that He may have mercy on our souls and forgive us our sins.

O Virgin Mary, the holy Theotokos, the faithful advocate for all mankind, intercede on our behalf before Christ whom you bore, that He may grant us the forgiveness of our sins.

Hail to you, O Virgin, the right and true Queen. Hail to the pride of our race, who bore to us Immanuel.

We ask you to remember us, O our faithful advocate, before our Lord Jesus Christ, that He may forgive us our sins.`);
   replace('Introduction to Creed',`We exalt you, the Mother of the true Light. We glorify you, O saint, the Theotokos, for you have brought forth unto us the Savior of the whole world. He came and saved our souls.

Glory be to You, our Master, our King, Christ, the pride of the apostles, the crown of the martyrs, the joy of the righteous, the firmness of the churches, the forgiveness of sins.

We proclaim the Holy Trinity in one Godhead. We worship Him. We glorify Him. Lord have mercy. Lord have mercy. Lord bless us. Amen.`);
   replace('Orthodox Creed',`We believe in one God, God the Father, the Pantocrator, Creator of heaven and earth, and of all things seen and unseen.

We believe in one Lord, Jesus Christ, the only-begotten Son of God, begotten of the Father before all ages.

Light of Light, true God of true God, begotten, not created; of one essence with the Father; by whom all things were made.

Who for us men and for our salvation came down from heaven, was incarnate of the Holy Spirit and of the Virgin Mary, and became man.

And He was crucified for us under Pontius Pilate, suffered and was buried, and on the third day He rose from the dead according to the Scriptures.

Ascended into the heavens; He sits at the right hand of His Father, and He is coming again in His glory to judge the living and the dead, whose Kingdom shall have no end.

Yes, we believe in the Holy Spirit, the Lord, the Giver of Life, who proceeds from the Father, who with the Father and the Son, is worshiped and glorified, who spoke by the prophets.

And in one holy, catholic (universal), and apostolic Church. We confess one baptism for the remission of sins.

We look for the resurrection of the dead, and the life of the age to come. Amen.`);
   replace('First Absolution',`O Lord, God of hosts, who is existing before all ages and abides forever, who created the sun for daylight, and the night as rest for all men; we thank You, O King of ages, for You have let us pass through the night in peace, and brought us to the daybreak.

Therefore, we ask You, O our Master, the King of all ages, let Your face shine upon us and the light of Your divine knowledge enlighten us. Grant us, O our Master, to be sons of light and sons of day, to pass this day in righteousness, chastity and good conduct, that we may complete all the rest of the days of our life without offense; through the grace, the compassion and the love of mankind of Your only-begotten Son, Jesus Christ, and the gift of Your Holy Spirit, now and at all times and forever. Amen.`);
   replace('Second Absolution',`O God who causes the light to burst forth, who lets His sun shine upon the righteous and the wicked, who created the light which illuminates the whole world, enlighten our minds, our hearts and our understandings, O Master of all, and grant us to please You this present day.

Guard us from every bad thing, from every sin, and from every adversative power, through Christ Jesus our Lord, with whom You are blessed, with the Holy Spirit, the Life-Giver, who is of one essence with You, now and at all times and unto the ages of all ages. Amen.`);
   // Sixth Hour: preserve the supplied edition's structure and identify its Gospel explicitly.
   const sixth=data.sixth||[];
   const sixthGospel=sixth.find(s=>String(s.title||'').toLowerCase().includes('gospel'));
   if(sixthGospel)sixthGospel.title='Gospel (Matthew 5:1-16)';
   const sixthAbsolution=sixth.find(s=>String(s.title||'').toLowerCase().includes('absolution'));
   if(sixthAbsolution)sixthAbsolution.title='Absolution';
   // Ninth Hour: align section identity with the supplied edition.
   const ninth=data.ninth||[];
   const ninthGospel=ninth.find(s=>String(s.title||'').toLowerCase().includes('gospel'));
   if(ninthGospel)ninthGospel.title='Gospel (Luke 9:10-17)';
   const ninthAbsolution=ninth.find(s=>String(s.title||'').toLowerCase().includes('absolution'));
   if(ninthAbsolution)ninthAbsolution.title='Absolution';
   // Eleventh Hour (Vespers): align section identity with the supplied edition.
   const eleventh=data.eleventh||[];
   const eleventhGospel=eleventh.find(s=>String(s.title||'').toLowerCase().includes('gospel'));
   if(eleventhGospel)eleventhGospel.title='Gospel (Luke 4:38-41)';
   const eleventhAbsolution=eleventh.find(s=>String(s.title||'').toLowerCase().includes('absolution'));
   if(eleventhAbsolution)eleventhAbsolution.title='Absolution';
   // Twelfth Hour (Compline): align section identity with the supplied edition.
   const compline=data.compline||[];
   const complineGospel=compline.find(s=>String(s.title||'').toLowerCase().includes('gospel'));
   if(complineGospel)complineGospel.title='Gospel (Luke 2:25-32)';
   const complineAbsolution=compline.find(s=>String(s.title||'').toLowerCase().includes('absolution'));
   if(complineAbsolution)complineAbsolution.title='Absolution';
   window.AGPEYA_DATA=data;
   return data;
  }catch(e){lastError=e}
 }
 throw lastError||new Error('Unable to load canonical Agpeya');
};