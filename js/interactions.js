
/* interactions.js - Cursor, Easter Eggs, Tilt, Lantern Clicks, Heart Trail */
document.addEventListener('DOMContentLoaded',function(){

  /* Custom Cursor */
  var cursor=document.getElementById('cursor');
  var trail=document.getElementById('cursor-trail');
  var tx=0,ty=0,cx=0,cy=0;
  document.addEventListener('mousemove',function(e){
    tx=e.clientX;ty=e.clientY;
    if(cursor)cursor.style.transform='translate('+tx+'px,'+ty+'px) translate(-50%,-50%)';
  });
  setInterval(function(){
    cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;
    if(trail)trail.style.transform='translate('+cx+'px,'+cy+'px) translate(-50%,-50%)';
  },16);

  /* Sparkle trail on move */
  var lastSpark=0;
  document.addEventListener('mousemove',function(e){
    var now=Date.now();
    if(now-lastSpark<40)return;
    lastSpark=now;
    var sp=document.createElement('div');
    var emojis=['\uD83C\uDF38','\uD83C\uDF38','\uD83C\uDF38','\uD83C\uDF38','\uD83C\uDF38'];
    sp.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    sp.style.cssText='position:fixed;left:'+e.clientX+'px;top:'+e.clientY+'px;font-size:'+(10+Math.random()*8)+'px;pointer-events:none;z-index:9990;transform:translate(-50%,-50%);animation:heartFly .9s ease forwards;';
    document.body.appendChild(sp);
    setTimeout(function(){sp.remove();},900);
  });

  /* Lantern click sparkles */
  document.querySelectorAll('.lantern').forEach(function(l){
    l.addEventListener('click',function(e){
      for(var i=0;i<8;i++){
        var s=document.createElement('div');
        s.textContent='\u2728';
        s.style.cssText='position:fixed;left:'+e.clientX+'px;top:'+e.clientY+'px;font-size:'+(12+Math.random()*10)+'px;pointer-events:none;z-index:9995;animation:heartFly '+(0.6+Math.random()*.5)+'s ease forwards;transform:translate('+(Math.random()-0.5)*60+'px,'+(Math.random()-0.5)*60+'px);';
        document.body.appendChild(s);
        setTimeout(function(){s.remove();},1100);
      }
    });
  });

  /* Double-click secret blessing */
  var blessingShown=false;
  document.addEventListener('dblclick',function(){
    if(blessingShown)return;
    var blessings=[
      '\uD83C\uDF38 May your love bloom forever \uD83C\uDF38',
      '\u2728 Blessed are those who celebrate love \u2728',
      '\uD83D\uDC9B Wishing you joy beyond measure \uD83D\uDC9B',
      '\uD83C\uDF1F May your home be filled with laughter \uD83C\uDF1F'
    ];
    var div=document.createElement('div');
    div.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(255,255,255,.97);border:1.5px solid #c8963c;border-radius:16px;padding:20px 36px;font-family:Great Vibes,cursive;font-size:1.8rem;color:#e8789a;box-shadow:0 12px 50px rgba(200,150,60,.3);z-index:9000;pointer-events:none;text-align:center;animation:blessingFade 3s ease forwards;';
    div.textContent=blessings[Math.floor(Math.random()*blessings.length)];
    document.body.appendChild(div);
    setTimeout(function(){div.remove();blessingShown=false;},3000);
    blessingShown=true;
  });

  /* Event card tilt */
  document.querySelectorAll('.event-card[data-tilt]').forEach(function(card){
    card.addEventListener('mousemove',function(e){
      var r=card.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5;
      var y=(e.clientY-r.top)/r.height-.5;
      card.style.transform='perspective(600px) rotateX('+(-y*10)+'deg) rotateY('+(x*10)+'deg) translateY(-8px)';
    });
    card.addEventListener('mouseleave',function(){card.style.transform='';});
    card.addEventListener('click',function(){
      card.style.animation='cardPulse .5s ease';
      setTimeout(function(){card.style.animation='';},500);
    });
  });

  /* Moment card blessing popup */
  var popup=document.getElementById('blessing-popup');
  document.querySelectorAll('.moment-card').forEach(function(card){
    card.addEventListener('click',function(){
      if(!popup)return;
      popup.textContent=card.dataset.blessing||'\uD83C\uDF38 Blessings to you!';
      popup.classList.add('show');
      setTimeout(function(){popup.classList.remove('show');},2200);
    });
  });

  /* Open Invitation button scrolls to invitation */
  var btn=document.getElementById('open-invite-btn');
  if(btn){
    btn.addEventListener('click',function(){
      var inv=document.getElementById('invitation');
      if(inv)inv.scrollIntoView({behavior:'smooth',block:'start'});
    });
  }

  /* Flower hover petal release */
  document.querySelectorAll('.tl-dot').forEach(function(dot){
    dot.addEventListener('mouseenter',function(){
      var trail=document.getElementById('heart-trail');
      if(!trail)return;
      for(var i=0;i<4;i++){
        var h=document.createElement('span');
        h.className='trail-heart';
        h.textContent=['\uD83C\uDF38','\u2728','\uD83D\uDC96','\uD83C\uDF3A'][Math.floor(Math.random()*4)];
        var r=dot.getBoundingClientRect();
        h.style.left=(r.left+r.width/2)+'px';
        h.style.top=(r.top+r.height/2+window.scrollY)+'px';
        trail.appendChild(h);
        setTimeout(function(){h.remove();},1300);
      }
    });
  });
});
