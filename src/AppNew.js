import { useRef, useState } from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  return <orbitControls args={[camera, gl.domElement]} refs={orbitRef} />
}

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
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshBasicMaterial attach="material" color={props.color} />
    </a.mesh>
  )
}

export default () => ( 
  <Canvas>
    <Controls />
    <Box />
  </Canvas>
)