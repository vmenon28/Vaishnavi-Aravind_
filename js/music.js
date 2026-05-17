
/* music.js
   HOW TO ADD MUSIC:
   1. Place your .mp3 file in /assets/music/
   2. In index.html <audio> tag change src to your file
   3. Multiple songs: add more <source> tags
*/
document.addEventListener('DOMContentLoaded',function(){
  var audio=document.getElementById('bg-music');
  var btn=document.getElementById('music-btn');
  var eq=btn?btn.querySelector('.eq-bars'):null;
  var muteIcon=btn?btn.querySelector('.mute-icon'):null;
  var player=document.getElementById('music-player');
  if(!audio||!btn)return;

  var playing=false;
  audio.volume=0;

  function fadeIn(){
    var v=0;
    var t=setInterval(function(){
      v=Math.min(v+.02,.55);
      audio.volume=v;
      if(v>=.55)clearInterval(t);
    },80);
  }

  function tryPlay(){
    var p=audio.play();
    if(p!==undefined){
      p.then(function(){
        playing=true;
        fadeIn();
        if(eq)eq.style.display='flex';
        if(muteIcon)muteIcon.classList.add('hidden');
      }).catch(function(){
        playing=false;
        if(eq)eq.style.display='none';
        if(muteIcon)muteIcon.classList.remove('hidden');
      });
    }
  }

  setTimeout(tryPlay,1200);

  btn.addEventListener('click',function(){
    if(playing){
      audio.pause();
      playing=false;
      if(eq)eq.style.display='none';
      if(muteIcon)muteIcon.classList.remove('hidden');
    } else {
      tryPlay();
    }
  });

  if(player)setTimeout(function(){player.classList.remove('hidden');},1500);
});
