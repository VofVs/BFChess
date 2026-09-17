(()=>{
  'use strict';
  document.title='Battlefield Chess v0.15';
  const get=id=>document.getElementById(id);
  const bar=document.querySelector('.bar');
  const clock=get('clock');
  const menuBtn=get('menuBtn');
  const scene=get('scene');
  const board=get('board');
  const menuActions=document.querySelector('.menuActions');
  if(!bar||!clock||!menuBtn||!scene||!board||!menuActions)return;

  let turns=get('turns-v015');
  if(!turns){
    turns=document.createElement('div');
    turns.id='turns-v015';
    turns.className='turns';
    turns.setAttribute('aria-label','Turn indicator');
    turns.innerHTML='<span id="turnN-v015" class="turnMark north">N</span><span id="turnS-v015" class="turnMark south">S</span>';
    bar.insertBefore(turns,clock);
  }

  const undo=get('undo'),pass=get('pass'),resume=get('resumeBtn');
  if(undo&&undo.parentElement!==menuActions)menuActions.insertBefore(undo,resume?resume.nextSibling:menuActions.firstChild);
  if(pass&&pass.parentElement!==menuActions)menuActions.insertBefore(pass,undo?undo.nextSibling:menuActions.firstChild);
  if(undo)undo.textContent='Undo';
  if(pass)pass.textContent='Pass Turn';

  let result=get('resultBanner-v015');
  if(!result){
    result=document.createElement('div');
    result.id='resultBanner-v015';
    result.className='resultBanner hidden';
    scene.appendChild(result);
  }

  function fitBoard(){
    const gap=1,w=Math.max(90,scene.clientWidth-6),h=Math.max(180,scene.clientHeight-6);
    let cw=Math.floor((w-gap*8)/9),ch=Math.floor((h-gap*28)/29);
    cw=Math.max(14,Math.min(38,cw));
    ch=Math.max(9,Math.min(34,ch));
    const th=Math.max(9,Math.min(22,ch-2));
    const tw=Math.max(12,Math.min(cw-4,Math.round(th*1.28)));
    const icon=Math.max(8,Math.min(15,th-5));
    board.style.setProperty('--cw',cw+'px');
    board.style.setProperty('--ch',ch+'px');
    board.style.setProperty('--tw',tw+'px');
    board.style.setProperty('--th',th+'px');
    board.style.setProperty('--icon',icon+'px');
  }

  function paintTurn(){
    try{
      const n=get('turnN-v015'),s=get('turnS-v015');
      if(!n||!s||typeof G==='undefined')return;
      const live=!G.winner&&!G.draw;
      n.classList.toggle('active',live&&G.turn==='N');
      s.classList.toggle('active',live&&G.turn==='S');
      if(G.winner||G.draw){result.textContent=G.msg||(G.draw?'Draw':'Match over');result.classList.remove('hidden')}
      else result.classList.add('hidden');
    }catch(_){ }
  }

  fitBoard();paintTurn();
  window.addEventListener('resize',fitBoard);
  if(window.visualViewport)window.visualViewport.addEventListener('resize',fitBoard);
  const obs=new MutationObserver(()=>{fitBoard();paintTurn()});
  obs.observe(board,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  setInterval(paintTurn,100);
})();
