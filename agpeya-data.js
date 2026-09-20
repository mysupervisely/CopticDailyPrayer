window.loadCanonicalAgpeya=async function(){
 if(window.AGPEYA_DATA)return window.AGPEYA_DATA;
 let lastError=null;
 try{
   if(!window.COPTIC_LOCAL_AGPEYA)throw new Error('Local Agpeya source unavailable');
   const data=JSON.parse(JSON.stringify(window.COPTIC_LOCAL_AGPEYA));

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
   // Midnight Prayer remains one Hour. The three Watches stay inside this sequence.
   const midnight=data.midnight||[];
   const gospelRefs=['Matthew 25:1-13','Luke 7:36-50','Luke 12:32-46'];
   let gospelIndex=0;
   midnight.forEach(section=>{
    const t=String(section.title||'').toLowerCase();
    if(t.includes('first watch'))section.title='First Watch';
    else if(t.includes('second watch'))section.title='Second Watch';
    else if(t.includes('third watch'))section.title='Third Watch';
    else if(t.includes('gospel')&&gospelIndex<gospelRefs.length)section.title='Gospel ('+gospelRefs[gospelIndex++]+')';
   });
   // Reconcile section names/references against the supplied Agpeya screenshots.
   const relabel=(sections,from,to)=>{const s=(sections||[]).find(x=>String(x.title||'').toLowerCase().includes(from.toLowerCase()));if(s)s.title=to};
   relabel(data.first,'Opening Prayers','Introduction of Every Hour');
   relabel(data.first,'Holy Gospel','Gospel (John 1:1-17)');
   relabel(data.first,'Morning Psali','Litanies');
   relabel(data.first,'Prayer of the Hours','Conclusion of Every Hour');
   relabel(data.third,'Opening Prayers','Introduction of Every Hour');
   relabel(data.third,'Holy Gospel','Gospel (John 14:26-15:4)');
   relabel(data.third,'Prayer of the Hours','Conclusion of Every Hour');
   relabel(data.sixth,'Opening Prayers','Introduction of Every Hour');
   relabel(data.sixth,'Prayer of the Hours','Conclusion of Every Hour');
   relabel(data.ninth,'Opening Prayers','Introduction of Every Hour');
   relabel(data.ninth,'Prayer of the Hours','Conclusion of Every Hour');
   relabel(data.eleventh,'Opening Prayers','Introduction of Every Hour');
   relabel(data.eleventh,'Prayer of the Hours','Conclusion of Every Hour');
   relabel(data.compline,'Opening Prayers','Introduction of Every Hour');
   relabel(data.compline,'Prayer for the Night','Graciously Accord, O Lord');
   relabel(data.compline,'The Trisagion','Trisagion');
   relabel(data.compline,'Prayer of the Hours','Conclusion of Every Hour');
   relabel(data.midnight,'Opening Prayers','Introduction of Every Hour');
   relabel(data.midnight,'Concluding Gospel','Gospel (Luke 2:29-32)');
   relabel(data.midnight,'Prayer of the Hours','Conclusion of Every Hour');
   // Normalize student-facing section names to the supplied Agpeya edition.
   const renameTroparia=(sections,label)=>{(sections||[]).forEach(s=>{if(/troparia/i.test(String(s.title||'')))s.title=label||'Litanies'})};
   renameTroparia(data.first,'Litanies');
   renameTroparia(data.third,'Litanies');
   renameTroparia(data.sixth,'Litanies');
   renameTroparia(data.ninth,'Litanies');
   renameTroparia(data.eleventh,'Litanies');
   renameTroparia(data.compline,'Litanies');
   renameTroparia(data.midnight,'Litanies');
   // Preserve Midnight as one Hour, but make its internal Watches easy to identify.
   const watchNames=['First Watch','Second Watch','Third Watch'];
   let watchIndex=0;
   (data.midnight||[]).forEach(s=>{const t=String(s.title||'');if(/watch/i.test(t)&&watchIndex<watchNames.length)s.title=watchNames[watchIndex++]});
   // Prayer of the Veil, kept separate from the seven daily Hours.
   // Structure and wording follow the user's supplied Agpeya screenshots.
   const allDaily=[data.first,data.third,data.sixth,data.ninth,data.eleventh,data.compline,data.midnight].flat().filter(Boolean);
   const copyMatch=(test,newTitle)=>{const s=allDaily.find(x=>test(String(x.title||'')));return s?{title:newTitle||s.title,text:s.text}:null};
   const psalm=(n)=>copyMatch(t=>{const label=String(n),base=label.replace(/\s*\([^)]*\)\s*$/,'');const re=new RegExp('^Psalm\\s+'+base+'(?:\\s|\\-|$)','i');return re.test(t)},'Psalm '+n);
   const veil=[];
   const push=x=>{if(x)veil.push(x)};
   push({title:'The Prayer of the Veil',text:'This prayer concerns monks, yet it is suitable for individual meditation. It is prayed daily in monasteries.'});
   push(copyMatch(t=>/Introduction of Every Hour/i.test(t),'Introduction of Every Hour'));
   push(copyMatch(t=>/^Our Father$/i.test(t),'Our Father'));
   push(copyMatch(t=>/Prayer of Thanksgiving/i.test(t),'The Prayer of Thanksgiving'));
   push(copyMatch(t=>/^Psalm 50/i.test(t),'Psalm 50'));
   push({title:'Introduction',text:'The blessed prayer of the veil, we offer to Christ our King and our God, beseeching Him to forgive us our sins.\n\nFrom the Psalms of our teacher David the prophet. May his blessings be upon us all. Amen.\n\nThe following psalms are reserved to be prayed by the priest: Psalms 4, 131, and Psalm 118 (20), (21), and (22).'});
   ['4','6','12','15','24','26','66','69','22','29','42','56','85','96','109','114','115','120','128','129','130','131','132','133','136','140','145','118 (20)','118 (21)','118 (22)'].forEach(n=>push(psalm(n)));
   push({title:'Gospel (John 6:15-23)',text:'Holy, holy, holy. A reading from the Holy Gospel according to our teacher Saint John. May his blessings be with us all. Amen.\n\nWhen Jesus therefore perceived that they would come and take Him by force to make Him a king, He departed again into a mountain by Himself alone.\n\nAnd when evening came, His disciples went down to the sea, and entered into a boat, and went over the sea toward Capernaum. And it was now dark, and Jesus had not come to them. And the sea arose by reason of a great wind that blew. So when they had rowed about three or four miles, they saw Jesus walking on the sea, and drawing near to the boat, and they were afraid. But He said to them, "It is I; do not be afraid." Then they willingly received Him into the boat: and immediately the boat was at the land where they were going.\n\nOn the following day, the people who stood on the other side of the sea saw that there was no other boat there, except that one which His disciples had entered, and that Jesus had not entered the boat with His disciples, but that His disciples had gone away alone. However, there came other boats from Tiberias near the place where they ate bread, after the Lord had given thanks.\n\nGlory be to God forever. Amen.\n\nMay the sayings of God be fulfilled in peace.\n\nOn joyful days: We worship You, O Christ, with Your good Father, and the Holy Spirit, for You have risen and saved us. Have mercy on us.'});
   push({title:'Litanies',text:'1. Lord, You know the alertness of my enemies; and as for my weakness, You are aware of it, my Creator. Therefore, I, hereby, place my soul into Your hands. So cover me with the wings of Your goodness, lest I might sleep till death. Enlighten my eyes by the greatness of Your sayings, and raise me up at all times for Your glorification, for You alone are Good and Lover of Mankind.\n\nGlory to the Father, and to the Son, and to the Holy Spirit.\n\n2. Lord, Your judgment is dreadful; when men shall be rushed, the angels shall stand, the books shall be opened, the deeds shall be revealed, and the thoughts examined. What a judgment mine will be, I who am entangled by sin?! Who would quench the flames of fire about me?! Who would enlighten my darkness, other than You, O Lord?! Have mercy on me, for You are compassionate to mankind.\n\nNow and ever and unto the ages of the ages. Amen.\n\n3. O Theotokos, because we have put our trust in you, we shall not be put to shame, but shall be saved. And because we have attained your help and intercession, O holy and perfect one, we shall not fear, but shall drive out our enemies and shall disperse them. And, in everything, we take your great help to protect us as if with a shield. We ask and entreat you, crying, O Theotokos, to save us by your intercessions, and raise us up from the dark sleep, in order to powerfully glorify God who took flesh from you.'});
   push(copyMatch(t=>/^Trisagion$/i.test(t),'Trisagion'));
   push(copyMatch(t=>/^Our Father$/i.test(t),'Our Father'));
   push(copyMatch(t=>/Hail to You/i.test(t),'Hail to You'));
   push(copyMatch(t=>/Introduction to Creed/i.test(t),'Introduction to the Creed'));
   push(copyMatch(t=>/Orthodox Creed/i.test(t),'The Orthodox Creed'));
   push(copyMatch(t=>/41/.test(t),'Lord Have Mercy (41)'));
   push(copyMatch(t=>/Holy, Holy, Holy/i.test(t),'Holy, Holy, Holy'));
   push(copyMatch(t=>/^Our Father$/i.test(t),'Our Father'));
   push({title:'Absolution',text:'O Lord and Master, Jesus Christ our God, grant us rest in our sleep, repose of our bodies, and purity of our souls, and protect us from the darkness of devastating sin. May the pangs of pain subside, and the heat of the flesh calm down, and the turmoil of the body come to an end. Grant us an alert mind, a humble thought, a life full of virtue, and a pure and undefiled bed. Raise us up for the night and morning praises, steadfast in Your commandments, keeping in ourselves, at all times, the thought of Your judgments. Grant us to praise You the whole night, blessing Your holy name full of glory and splendor, with Your good Father, and the Holy Spirit, the Life-Giver, now and at all times and unto the ages of all ages. Amen.'});
   push(copyMatch(t=>/Conclusion of Every Hour/i.test(t),'Conclusion of Every Hour'));
   data.veil=veil;
   window.AGPEYA_DATA=data;
   return data;
  }catch(e){lastError=e}
 throw lastError||new Error('Unable to load local Agpeya');
};