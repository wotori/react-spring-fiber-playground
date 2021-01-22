import { useState, useRef } from "react";
import { Canvas, extend, useThree } from 'react-three-fiber';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  return <orbitControls args={[camera, gl.domElement]} refs={orbitRef} />
}

const WangCharacter = () => {
  const [model, setModel] = useState();
  new GLTFLoader().load('/wang/wang.gltf', setModel);
  return model ? <primitive object={model.scene} /> : null
}

export default () => ( 
  <Canvas>
    <ambientLight />
    <spotLight position={[0, 5, 10]}/>
    <Controls />
    <group scale={[20, 20, 20]} position={[0, -1.5, 0]}>
      <WangCharacter />
    </group>
  </Canvas>
)