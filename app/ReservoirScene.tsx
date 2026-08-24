'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return <group position={position} scale={scale}>
    <mesh position={[0, .45, 0]} castShadow><cylinderGeometry args={[.09,.14,.9,8]}/><meshStandardMaterial color="#75492e"/></mesh>
    <mesh position={[0,1.05,0]} castShadow><icosahedronGeometry args={[.48,2]}/><meshStandardMaterial color="#3f784b" roughness={.9}/></mesh>
  </group>;
}

function Water({ level, color }: { level:number; color:string }) {
  const geometry=useMemo(()=>{
    const width=.58+level*.005;
    const reach=.72+level*.003;
    const depth=.08+level*.0075;
    const s=new THREE.Shape();
    // A borda de jusante permanece fixa junto à barragem em qualquer volume.
    s.moveTo(-2.35*width,-2.08);
    s.bezierCurveTo(-2.55*width,-1.25,-1.92*width,-.55,-2.38*width,.18*reach);
    s.bezierCurveTo(-2.82*width,.85*reach,-2.05*width,1.45*reach,-2.22*width,2.05*reach);
    s.bezierCurveTo(-2.38*width,2.72*reach,-1.28*width,3.18*reach,-.48*width,3.48*reach);
    s.bezierCurveTo(.35*width,3.72*reach,1.02*width,3.42*reach,1.18*width,2.96*reach);
    s.bezierCurveTo(1.38*width,2.42*reach,2.42*width,2.25*reach,2.18*width,1.54*reach);
    s.bezierCurveTo(1.98*width,.92*reach,2.68*width,.4*reach,2.35*width,-.3);
    s.bezierCurveTo(2.1*width,-.9,2.56*width,-1.48,2.36*width,-2.08);
    s.lineTo(-2.35*width,-2.08);
    return new THREE.ExtrudeGeometry(s,{depth,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:2,curveSegments:32});
  },[level]);
  return <mesh geometry={geometry} rotation={[-Math.PI/2,0,0]} position={[0,.34,-1.1]} receiveShadow>
    <meshPhysicalMaterial color={color} transparent opacity={.82} roughness={.1} metalness={.03} transmission={.14} thickness={.8} side={THREE.DoubleSide}/>
  </mesh>;
}

function BasinFloor(){
 const geometry=useMemo(()=>{
  const s=new THREE.Shape();
  s.moveTo(-2.55,-2.18);s.bezierCurveTo(-2.78,-1.28,-2.12,-.55,-2.62,.2);s.bezierCurveTo(-3.02,.9,-2.28,1.5,-2.42,2.15);s.bezierCurveTo(-2.58,2.9,-1.42,3.42,-.52,3.72);s.bezierCurveTo(.42,4,1.25,3.62,1.4,3.12);s.bezierCurveTo(1.58,2.55,2.66,2.38,2.4,1.6);s.bezierCurveTo(2.18,.92,2.92,.38,2.55,-.35);s.bezierCurveTo(2.3,-.98,2.78,-1.55,2.56,-2.18);s.lineTo(-2.55,-2.18);
  return new THREE.ExtrudeGeometry(s,{depth:.32,bevelEnabled:true,bevelSize:.06,bevelThickness:.04,bevelSegments:2,curveSegments:32});
 },[]);
 return <mesh geometry={geometry} rotation={[-Math.PI/2,0,0]} position={[0,.04,-1.1]} scale={[.42,.58,1]} receiveShadow><meshStandardMaterial color="#b59a69" roughness={1}/></mesh>
}

function ValleyTerrain(){
 const geometry=useMemo(()=>{
  const outer=new THREE.Shape();
  outer.moveTo(-5.7,-2.7);
  outer.lineTo(3.15,-2.7);outer.lineTo(3.15,-1.7);outer.lineTo(2.22,-1.7);outer.lineTo(2.22,-.82);outer.lineTo(4.3,-.82);outer.lineTo(4.3,-2.7);
  outer.lineTo(5.7,-2.7);outer.lineTo(5.7,4.45);outer.lineTo(-5.7,4.45);outer.closePath();
  const hole=new THREE.Path();
  hole.moveTo(-2.78,-2.3);hole.bezierCurveTo(-3.02,-1.3,-2.35,-.58,-2.86,.18);hole.bezierCurveTo(-3.28,.94,-2.5,1.62,-2.67,2.28);hole.bezierCurveTo(-2.82,3.08,-1.58,3.66,-.58,3.98);hole.bezierCurveTo(.48,4.28,1.47,3.82,1.62,3.24);hole.bezierCurveTo(1.82,2.66,2.92,2.52,2.66,1.68);hole.bezierCurveTo(2.43,.94,3.18,.35,2.8,-.42);hole.bezierCurveTo(2.52,-1.08,3.02,-1.68,2.79,-2.3);hole.lineTo(-2.78,-2.3);hole.closePath();
  outer.holes.push(hole);
  return new THREE.ExtrudeGeometry(outer,{depth:1.05,bevelEnabled:true,bevelSize:.08,bevelThickness:.06,bevelSegments:2,curveSegments:36});
 },[]);
 return <mesh geometry={geometry} rotation={[-Math.PI/2,0,0]} position={[0,.08,-1.1]} castShadow receiveShadow><meshStandardMaterial color="#5f9257" roughness={1}/></mesh>
}

function BasinSlopes(){
 const geometry=useMemo(()=>{
  const contour=new THREE.Shape();
  contour.moveTo(-2.78,-2.3);contour.bezierCurveTo(-3.02,-1.3,-2.35,-.58,-2.86,.18);contour.bezierCurveTo(-3.28,.94,-2.5,1.62,-2.67,2.28);contour.bezierCurveTo(-2.82,3.08,-1.58,3.66,-.58,3.98);contour.bezierCurveTo(.48,4.28,1.47,3.82,1.62,3.24);contour.bezierCurveTo(1.82,2.66,2.92,2.52,2.66,1.68);contour.bezierCurveTo(2.43,.94,3.18,.35,2.8,-.42);contour.bezierCurveTo(2.52,-1.08,3.02,-1.68,2.79,-2.3);contour.lineTo(-2.78,-2.3);
  const outer=contour.getSpacedPoints(128),positions:number[]=[],indices:number[]=[];
  for(const point of outer){
   positions.push(point.x,1.08,-point.y-1.1);
   // Recuo médio de 1,78 m para 0,83 m de desnível: talude ≈ 25°.
   positions.push(point.x*.42,.25,-(point.y*.58)-1.1);
  }
  const n=outer.length;
  for(let i=0;i<n;i++){const j=(i+1)%n,a=i*2,b=a+1,c=j*2,d=c+1;indices.push(a,c,b,c,d,b)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();return g;
 },[]);
 return <mesh geometry={geometry} receiveShadow castShadow><meshStandardMaterial color="#8da96b" roughness={1} side={THREE.DoubleSide}/></mesh>
}

function ReleasedRiver({level}:{level:number}){
 const geometry=useMemo(()=>{
  const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-.8,.5,1.92),new THREE.Vector3(-.35,.49,2.65),new THREE.Vector3(.45,.47,3.25),new THREE.Vector3(-.18,.45,4.15),new THREE.Vector3(.18,.43,5.7)]);
  const points=curve.getPoints(52),positions:number[]=[],uvs:number[]=[],indices:number[]=[];
  const base=.09+level*.0022;
  points.forEach((point,i)=>{const tangent=curve.getTangent(i/(points.length-1));const side=new THREE.Vector3(-tangent.z,0,tangent.x).normalize();const width=base*(.65+i/(points.length-1)*.7);const left=point.clone().addScaledVector(side,width),right=point.clone().addScaledVector(side,-width);positions.push(left.x,left.y,left.z,right.x,right.y,right.z);uvs.push(0,i/(points.length-1),1,i/(points.length-1));if(i<points.length-1){const a=i*2,b=a+1,c=a+2,d=a+3;indices.push(a,c,b,c,d,b)}});
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();return g;
 },[level]);
 return <mesh geometry={geometry} receiveShadow><meshPhysicalMaterial color="#31aeca" transparent opacity={.9} roughness={.15} metalness={.02} side={THREE.DoubleSide}/></mesh>
}

function Model({level,color,releasing}:{level:number;color:string;releasing:boolean}){
 return <group rotation={[0,-.12,0]}>
   <mesh position={[0,-.65,0]} receiveShadow><boxGeometry args={[12,1.3,10]}/><meshStandardMaterial color="#9a7a48" roughness={1}/></mesh>
   <ValleyTerrain/>
   <mesh position={[3.72,.34,1.35]} rotation={[0,.06,0]} receiveShadow><boxGeometry args={[1.14,.68,3.12]}/><meshStandardMaterial color="#5f9257" roughness={1}/></mesh>
   <mesh position={[3.1,.34,.18]} receiveShadow><boxGeometry args={[1.64,.68,.78]}/><meshStandardMaterial color="#5f9257" roughness={1}/></mesh>
   <BasinSlopes/>
   <BasinFloor/>
   <Water level={level} color={color}/>
   <mesh position={[0,1.05,1.45]} castShadow receiveShadow><boxGeometry args={[8.1,1.35,.9]}/><meshStandardMaterial color="#b66c2f" roughness={.85}/></mesh>
   <mesh position={[0,1.77,1.45]} castShadow><boxGeometry args={[8.25,.16,.9]}/><meshStandardMaterial color="#df9a52"/></mesh>
   <mesh position={[-.8,.62,1.45]} rotation={[Math.PI/2,0,0]} castShadow><cylinderGeometry args={[.2,.2,1.2,20]}/><meshStandardMaterial color="#777c78" metalness={.35} roughness={.55}/></mesh>
   <mesh position={[-.8,.62,1.98]} rotation={[0,0,0]} castShadow><torusGeometry args={[.2,.055,10,24]}/><meshStandardMaterial color="#555b59" metalness={.45} roughness={.48}/></mesh>
   {releasing&&<mesh position={[-.8,.62,2.02]}><circleGeometry args={[.16,20]}/><meshStandardMaterial color="#30b2d0" side={THREE.DoubleSide}/></mesh>}
   {releasing&&<ReleasedRiver level={level}/>} 
   <mesh position={[3.72,.87,1.35]} rotation={[0,.06,0]} castShadow><boxGeometry args={[.82,.38,3.05]}/><meshStandardMaterial color="#8e9996"/></mesh>
   <mesh position={[3.1,.87,.18]} castShadow><boxGeometry args={[1.55,.36,.72]}/><meshStandardMaterial color="#8e9996"/></mesh>
   {level>=99&&<>
    <mesh position={[3.72,1.075,1.35]} rotation={[-Math.PI/2,0,.06]}><planeGeometry args={[.48,2.8]}/><meshStandardMaterial color="#32b6d3" side={THREE.DoubleSide}/></mesh>
    <mesh position={[3.1,1.075,.18]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[1.3,.42]}/><meshStandardMaterial color="#32b6d3" side={THREE.DoubleSide}/></mesh>
   </>}
   <mesh position={[-.8,1.45,.75]} castShadow><cylinderGeometry args={[.28,.38,1.35,16]}/><meshStandardMaterial color="#d8d3c5"/></mesh>
   <mesh position={[-.8,2.15,.75]} castShadow><cylinderGeometry args={[.42,.42,.18,16]}/><meshStandardMaterial color="#696b66"/></mesh>
   {[[-5,-3.4],[-4.6,2.9],[-3.6,-4],[3.8,-3.8],[5,-1.5],[4.9,3.5],[-4.5,4]].map(([x,z],i)=><Tree key={i} position={[x,z>1.6?.02:1.12,z]} scale={.8+(i%3)*.14}/>)}
  </group>
}

export default function ReservoirScene({level,color,releasing}:{level:number;color:string;releasing:boolean}){
 return <Canvas shadows camera={{position:[10,9,12],fov:42}} dpr={[1,1.7]}>
   <color attach="background" args={["#dcecf1"]}/><fog attach="fog" args={["#dcecf1",18,34]}/>
   <ambientLight intensity={1.15}/><directionalLight position={[7,12,8]} intensity={2.4} castShadow shadow-mapSize={[2048,2048]}/>
   <Model level={level} color={color} releasing={releasing}/><Environment preset="park"/>
   <OrbitControls makeDefault target={[0,.3,0]} minDistance={10} maxDistance={24} minPolarAngle={.45} maxPolarAngle={1.42} enablePan={false}/>
 </Canvas>
}
