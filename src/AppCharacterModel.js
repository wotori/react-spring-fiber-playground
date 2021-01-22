import { useRef, useState, useEffect } from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, extend, useThree } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';
import * as THREE from 'three';
import Model from './Wang.js'

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  return <orbitControls autoRotate maxPolarAngle={Math.PI / 3} minPolarAngle={Math.PI / 3} args={[camera, gl.domElement]} refs={orbitRef} />
}

const Plane = () => {
  return (
  <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
    <planeBufferGeometry attach="geometry" args={[100, 100]} />
    <meshPhysicalMaterial attach="material" color='white' />
  </mesh>
  )
};

const Box = () => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1], 
    color: hovered ? "blue" : "hotpink"
  })
  
  return (
    <a.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach="material" color={props.color} />
    </a.mesh>
  )
}

const WangCharacter = () => {
  const [model, setModel] = useState();
  new GLTFLoader().load('/wang/wang.gltf', setModel);
  return model ? <primitive object={model.scene} /> : null
}

export default () => ( 
  <Canvas camera={{'position' : [0, 0, 3]}} onCreated={ ({ gl }) => {
    gl.shadowMap.enabled = true
    gl.shadowMap.type = THREE.PCFSoftShadowMap
  } }>
    <ambientLight />
    <spotLight position={[0, 5, 10]} penumbra={1} castShadow />
    <Controls />
    <fog attach='fog' args={['white', 10, 20]} />
    {/* <Model /> */}
    <WangCharacter />
    {/* <Box /> */}
    <Plane />
  </Canvas>
)