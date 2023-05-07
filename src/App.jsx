import { Environment, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef, useState, } from 'react'
import * as THREE from 'three'
import { EffectComposer, DepthOfFieldEffect } from 'postprocessing'
//  render based not event based render loop- 60fps

// animate wih useFrame hook

function Scroll({ z }) {
  const ref = useRef()
  const [clicked, setClicked] = useState(false)
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])
  const { nodes, materials } = useGLTF('/poet-scroll-v1-transformed.glb')

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  })

  useFrame((state) => {
    ref.current.rotation.set(
      (data.rX += 0.0001),
      (data.rY += 0.004),
      (data.rZ += 0.000)
    )

    ref.current.position
      .set(data.x * width, (data.y += 0.002), z)
    if (data.y > height / 1.5) {
      data.y = -height / 1.5
    }

  })

  // lerp- friction based

  return (
    <mesh
      ref={ref}
      geometry={nodes.defaultMaterial.geometry} material={materials.skin} material-emissive="piink"
    //  rotation={[-3.05, 0.64, 3.01]} 
    />
  )
}



export default function App({ count = 400 }) {
  return <Canvas gl ={{alpha: false}} camera={{near:0.0001, far: 110}}>
    <color 
    attach="background" args ={["#d9c6b8"]}/>
    <ambientLight intensity={0.2} />
    <spotLight position={[10, 10, 10]} intensity={2} />
    <Suspense fallback={null}>
      <Environment preset='sunset' />
      {Array.from({ length: 400 }, (_, i) => (<Scroll key={i} z={i* 0.25}/>))}
     {/* <EffectComposer>
      <DepthOfFieldEffect 
      target = {[0,0,30]} 
      focalLength={0.5}
      bokehScale={11}
      height={700}
      />
     </EffectComposer> */}
      
    </Suspense>


  </Canvas>
}
