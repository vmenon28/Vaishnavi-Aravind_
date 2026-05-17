
/* main.js - Loader, Init Orchestration */
document.addEventListener('DOMContentLoaded',function(){
  var loader=document.getElementById('loader');
  var minWait=2600;
  var loaded=false;
  var waited=false;

  function tryHideLoader(){
    if(loaded&&waited){
      if(loader){
        loader.classList.add('fade-out');
        setTimeout(function(){
          loader.style.display='none';
          if(window._mandalaInterval)clearInterval(window._mandalaInterval);
          if(window.initHeroAnimations)window.initHeroAnimations();
        },900);
      }
    }
  }

  window.addEventListener('load',function(){loaded=true;tryHideLoader();});
  setTimeout(function(){waited=true;loaded=true;tryHideLoader();},minWait);

  /* Smooth scroll for any anchor link */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var target=document.querySelector(a.getAttribute('href'));
      if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
    });
  });

  /* Parallax on hero */
  window.addEventListener('scroll',function(){
    var hero=document.getElementById('hero');
    if(!hero)return;
    var sy=window.scrollY;
    hero.style.backgroundPositionY=(sy*.3)+'px';
    var ganesha=document.querySelector('.ganesha-wrapper');
    if(ganesha)ganesha.style.transform='translateX(-50%) translateY('+(sy*.15)+'px)';
  });
});
