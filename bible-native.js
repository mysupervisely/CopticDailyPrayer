(function(){
'use strict';
var books={
 old:['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Tobit','Judith','Esther','1 Maccabees','2 Maccabees','Job','Psalms','Proverbs','Ecclesiastes','Song of Songs','Wisdom of Solomon','Sirach','Isaiah','Jeremiah','Lamentations','Baruch','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi'],
 new:['Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation']
};
var omitted=['Tobit','Judith','1 Maccabees','2 Maccabees','Wisdom of Solomon','Sirach','Baruch'];
function id(x){return document.getElementById(x)}
function build(){
 var host=id('bible');if(!host||host.getAttribute('data-ready'))return;host.setAttribute('data-ready','1');
 host.innerHTML='<header class="pageHead bibleHead"><div class="eyebrow">Holy Scripture</div><h1>Bible</h1><p class="subtitle">A Coptic Orthodox Bible reader.</p></header><div class="bibleNotice"><strong>Bible reader foundation</strong><p>The reader is being prepared for the Coptic Orthodox canon. Full NKJV text will be added only through an authorized licensed source.</p></div><div class="serviceTabs bibleTabs" role="tablist"><button class="serviceTab active" type="button" data-testament="old">Old Testament</button><button class="serviceTab" type="button" data-testament="new">New Testament</button></div><div class="bibleBooks" id="bibleBooks"></div><p class="bibleSource">Canon structure follows Coptic Orthodox usage. The omitted canonical books are treated as Scripture, not as a separate “Apocrypha” section.</p>';
 var tabs=host.querySelectorAll('[data-testament]');for(var i=0;i<tabs.length;i++)tabs[i].onclick=function(){for(var j=0;j<tabs.length;j++)tabs[j].classList.toggle('active',tabs[j]===this);render(this.getAttribute('data-testament'))};render('old')
}
function render(which){var host=id('bibleBooks');if(!host)return;host.innerHTML='';var list=books[which]||[];for(var i=0;i<list.length;i++){var b=document.createElement('button'),name=list[i];b.type='button';b.className='bibleBook';b.innerHTML='<span></span><small>›</small>';b.querySelector('span').textContent=name;if(omitted.indexOf(name)>=0)b.setAttribute('data-canonical-omitted','1');b.onclick=function(){alert('Chapter reading will open here once the authorized Bible text source is connected.')};host.appendChild(b)}}
function route(){if(location.hash==='#bible')build()}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',route);else route();window.addEventListener('hashchange',route);
})();