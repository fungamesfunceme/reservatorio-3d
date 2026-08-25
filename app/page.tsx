'use client';
import { useEffect, useMemo, useState } from 'react';
import ReservoirScene from './ReservoirScene';
const MONTHS=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const VM1=[30,28,26,26,28,28,44,42,40,37,35,32], VM2=[23,22,20,20,22,22,36,34,32,30,27,25], VM3=[12,11,10,10,12,12,22,21,19,18,16,14];
const states={normal:{label:'Normal',color:'#2ea7df',capacity:'700 L/s'},alerta:{label:'Alerta',color:'#f6d74b',capacity:'511 L/s'},seca:{label:'Seca',color:'#f3a13b',capacity:'224 L/s'},severa:{label:'Seca Severa',color:'#e85b4f',capacity:'140 L/s'}};
export default function Home(){
 const [volume,setVolume]=useState(44),[month,setMonth]=useState(6);
 const [simulationMode,setSimulationMode]=useState<'fill'|'drain'>('fill');
 const [isPlaying,setIsPlaying]=useState(false);
 const stateKey=useMemo(()=>volume>VM1[month]?'normal':volume>VM2[month]?'alerta':volume>VM3[month]?'seca':'severa',[volume,month]);
 const current=states[stateKey];
 useEffect(()=>{
  if(!isPlaying)return;
  const timer=window.setInterval(()=>{
   setVolume(previous=>{
    const next=simulationMode==='fill'?Math.min(100,previous+1):Math.max(0,previous-1);
    if(next===0||next===100)setIsPlaying(false);
    return next;
   });
  },80);
  return()=>window.clearInterval(timer);
 },[isPlaying,simulationMode]);
 const selectMode=(mode:'fill'|'drain')=>{setSimulationMode(mode);setIsPlaying(false)};
 const limitReached=simulationMode==='fill'?volume>=100:volume<=0;
 return <main className="app-shell">
  <header className="topbar"><div><p className="eyebrow">PLANO DE GESTÃO PROATIVA DE SECAS</p><h1>Reservatório</h1></div><div className="state-pill" style={{'--state':current.color} as React.CSSProperties}><span/>Estado atual: <strong>{current.label}</strong></div></header>
  <section className="workspace">
   <aside className="control-panel"><div className="panel-heading"><span className="tiny-cube"/><div><p>SIMULAÇÃO 3D</p><h2>Relógio da Seca</h2></div></div>
    <label>Volume armazenado <strong>{volume}%</strong></label><input aria-label="Volume armazenado" type="range" min="0" max="100" value={volume} onChange={e=>{setIsPlaying(false);setVolume(+e.target.value)}}/>
    <div className="simulation-controls" style={{margin:'13px 0 6px',padding:11,border:'1px solid #ded8cf',borderRadius:13,background:'#f5f1e9'}}>
     <div className="direction-toggle" aria-label="Sentido da simulação" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4,padding:3,borderRadius:9,background:'#e4ded4'}}>
      <button type="button" className={simulationMode==='fill'?'selected':''} style={{padding:7,background:simulationMode==='fill'?'#fff':'transparent',color:simulationMode==='fill'?'#1e292f':'#6d746f',fontSize:10,boxShadow:simulationMode==='fill'?'0 2px 8px #4c3c2820':'none'}} aria-pressed={simulationMode==='fill'} onClick={()=>selectMode('fill')}>Encher</button>
      <button type="button" className={simulationMode==='drain'?'selected':''} style={{padding:7,background:simulationMode==='drain'?'#fff':'transparent',color:simulationMode==='drain'?'#1e292f':'#6d746f',fontSize:10,boxShadow:simulationMode==='drain'?'0 2px 8px #4c3c2820':'none'}} aria-pressed={simulationMode==='drain'} onClick={()=>selectMode('drain')}>Esvaziar</button>
     </div>
     <button type="button" className="play-button" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginTop:9,background:'linear-gradient(135deg,#e57a2c,#c65416)',boxShadow:limitReached?'none':'0 7px 16px #b94c1430',opacity:limitReached?.45:1}} disabled={limitReached} onClick={()=>setIsPlaying(playing=>!playing)} aria-label={isPlaying?'Pausar simulação':'Iniciar simulação'}><span aria-hidden="true" style={{display:'grid',placeItems:'center',width:22,height:22,borderRadius:'50%',background:'#ffffff24',fontSize:11}}>{isPlaying?'Ⅱ':'▶'}</span>{isPlaying?'Pausar simulação':'Iniciar simulação'}</button>
     <p className="simulation-status" style={{minHeight:12,margin:'7px 2px 0',textAlign:'center',color:'#737b82',fontSize:9}}>{isPlaying?`${simulationMode==='fill'?'Enchendo':'Esvaziando'} automaticamente…`:limitReached?'Limite da simulação atingido.':'Escolha o sentido e pressione Play.'}</p>
    </div>
    <label>Mês de referência <strong>{MONTHS[month]}</strong></label><input aria-label="Mês de referência" type="range" min="0" max="11" value={month} onChange={e=>setMonth(+e.target.value)}/><div className="month-row"><span>Jan</span><span>Jul</span><span>Dez</span></div>
    <div className="metric-grid"><div><span>VM1</span><strong>{VM1[month]}%</strong></div><div><span>VM2</span><strong>{VM2[month]}%</strong></div><div><span>VM3</span><strong>{VM3[month]}%</strong></div></div>
    <div className="state-card" style={{'--state':current.color} as React.CSSProperties}><p>CLASSIFICAÇÃO</p><strong>{current.label}</strong><span>Vazão máxima de referência: {current.capacity}</span></div>
    <button onClick={()=>window.location.reload()}>Redefinir vista</button>
   </aside>
   <div className="scene-wrap">
    <div className="sky-label">MODELO CONCEITUAL • VOLUME NÃO BATIMÉTRICO</div>
    <div className="webgl-scene"><ReservoirScene level={volume} color={current.color} releasing={stateKey!=='severa'}/></div>
    <div className="interaction-hint">Arraste para girar · Scroll para zoom</div>
   </div>
   <aside className="legend-panel"><p className="eyebrow">LEITURA DO MODELO</p><h2>Zonas do reservatório</h2>{(Object.keys(states) as Array<keyof typeof states>).map(key=><div className={`legend-item ${key===stateKey?'active':''}`} key={key}><span style={{background:states[key].color}}/><div><strong>{states[key].label}</strong><small>{states[key].capacity}</small></div></div>)}<div className="reading-note">Em <strong>{MONTHS[month]}</strong>, {volume}% está {volume>VM1[month]?'acima do VM1':volume>VM2[month]?'entre VM1 e VM2':volume>VM3[month]?'entre VM2 e VM3':'abaixo do VM3'}.</div><p className="disclaimer">A simulação comunica os gatilhos do Relógio da Seca. A operação efetiva permanece vinculada à alocação negociada.</p></aside>
  </section>
 </main>
}
