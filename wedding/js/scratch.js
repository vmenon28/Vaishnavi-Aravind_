
/* scratch.js - Scratch to Reveal */
document.addEventListener('DOMContentLoaded',function(){
  var canvas=document.getElementById('scratch-canvas');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var hint=document.getElementById('scratch-hint');
  var glitter=document.getElementById('scratch-glitter');
  var scratched=false;
  var scratchedPixels=0;

  /* Draw floral scratch overlay */
  function drawOverlay(){
    canvas.width=canvas.offsetWidth||360;
    canvas.height=canvas.offsetHeight||260;
    var w=canvas.width,h=canvas.height;
    var grd=ctx.createLinearGradient(0,0,w,h);
    grd.addColorStop(0,'#f9b8cc');
    grd.addColorStop(.35,'#fde7a0');
    grd.addColorStop(.65,'#b8d4f0');
    grd.addColorStop(1,'#fcd5b4');
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,w,h);
    /* Flower pattern */
    ctx.fillStyle='rgba(255,255,255,0.18)';
    for(var i=0;i<12;i++){
      var fx=Math.random()*w,fy=Math.random()*h,fr=10+Math.random()*18;
      for(var p=0;p<6;p++){
        ctx.beginPath();
        var pa=p*(Math.PI/3);
        ctx.ellipse(fx+Math.cos(pa)*fr,fy+Math.sin(pa)*fr,fr*.4,fr*.2,pa,0,Math.PI*2);
        ctx.fill();
      }
    }
    /* Text prompt */
    ctx.fillStyle='rgba(255,255,255,0.9)';
    ctx.font='bold 16px Cinzel, serif';
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.fillText('\uD83C\uDF38 Scratch to Reveal \uD83C\uDF38',canvas.width/2,canvas.height/2);
  }
  drawOverlay();

  ctx.globalCompositeOperation='destination-out';

  function getPos(e){
    var rect=canvas.getBoundingClientRect();
    var scaleX=canvas.width/rect.width;
    var scaleY=canvas.height/rect.height;
    if(e.touches){
      return{x:(e.touches[0].clientX-rect.left)*scaleX,y:(e.touches[0].clientY-rect.top)*scaleY};
    }
    return{x:(e.clientX-rect.left)*scaleX,y:(e.clientY-rect.top)*scaleY};
  }

  function scratchAt(x,y){
    ctx.beginPath();
    ctx.arc(x,y,22,0,Math.PI*2);
    ctx.fill();
    spawnGlitter(x,y);
    checkReveal();
  }

  var isDown=false;
  canvas.addEventListener('mousedown',function(e){isDown=true;var p=getPos(e);scratchAt(p.x,p.y);});
  canvas.addEventListener('mousemove',function(e){if(!isDown)return;var p=getPos(e);scratchAt(p.x,p.y);});
  canvas.addEventListener('mouseup',function(){isDown=false;});
  canvas.addEventListener('touchstart',function(e){e.preventDefault();var p=getPos(e);scratchAt(p.x,p.y);},{passive:false});
  canvas.addEventListener('touchmove',function(e){e.preventDefault();var p=getPos(e);scratchAt(p.x,p.y);},{passive:false});

  function checkReveal(){
    if(scratched)return;
    var data=ctx.getImageData(0,0,canvas.width,canvas.height);
    var transparent=0;
    for(var i=3;i<data.data.length;i+=4)if(data.data[i]<128)transparent++;
    var pct=transparent/(canvas.width*canvas.height);
    if(pct>.45){
      scratched=true;
      if(hint)hint.style.display='none';
      setTimeout(function(){
        canvas.style.transition='opacity .8s ease';
        canvas.style.opacity='0';
        setTimeout(function(){canvas.style.display='none';},900);
      },300);
    }
  }

  function spawnGlitter(x,y){
    if(!glitter)return;
    var rect=canvas.getBoundingClientRect();
    var scaleX=rect.width/canvas.width;
    var scaleY=rect.height/canvas.height;
    for(var i=0;i<5;i++){
      var g=document.createElement('div');
      var tx=(Math.random()-0.5)*60;
      var ty=(Math.random()-0.5)*60;
      var cols=['#c8963c','#f9b8cc','#fde7a0','#b8d4f0','#ffe066'];
      g.style.cssText='position:absolute;width:'+(4+Math.random()*5)+'px;height:'+(4+Math.random()*5)+'px;border-radius:50%;background:'+cols[Math.floor(Math.random()*cols.length)]+';left:'+(x*scaleX+rect.left - glitter.getBoundingClientRect().left)+'px;top:'+(y*scaleY+rect.top-glitter.getBoundingClientRect().top)+'px;pointer-events:none;--tx:'+tx+'px;--ty:'+ty+'px;animation:glitterPop .7s ease forwards;';
      glitter.appendChild(g);
      setTimeout(function(){g.remove();},700);
    }
  }

  if(hint){setTimeout(function(){if(hint)hint.style.opacity='0';},4000);}
});
