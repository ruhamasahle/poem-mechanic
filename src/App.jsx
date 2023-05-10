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
  const { nodes, materials } = useGLTF('/pen-v1-transformed.glb')
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  })

  useFrame((state) => {
    ref.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.004),
      (data.rZ += 0.005)
    )

    ref.current.position
      .set(
        data.x * width, 
        (data.y += 0.004 ), 
        z/0.2)
    if (data.y > height / 1.5) {
      data.y = -height / 1.5
    }

     function Model(props) {
      const { nodes, materials } = useGLTF('/pen-v1-transformed.glb')
      return (
        <group {...props} dispose={null}>
          <group rotation={[-0.45, -0.07, 0.58]}>
            <mesh geometry={nodes.Object_2.geometry} 
            material={materials.skin} 
            rotation={[-0.23, -0.31, -2.38]} />
          </group>
        </group>
      )
    }
    

  })

  // lerp- friction based

  return (
    // <mesh
    //   ref={ref}
    //   geometry={nodes.defaultMaterial.geometry} material={materials.skin} material-emissive="pink"
    // //  rotation={[-3.05, 0.64, 3.01]} 
    // />
    <mesh 
    ref={ref}
    geometry={nodes.Object_2.geometry} 
    material={materials.skin} 
    // rotation={[-0.23, -0.31, -2.38]} 
    />
  )
}



export default function App({ count = 12 }) {
  return <Canvas gl ={{alpha: false}} camera={{near:0.0001, far: 110}}>
    <color 
    attach="background" args ={["#d9c6b8"]}/>
    <ambientLight intensity={0.2} />
    <spotLight position={[10, 10, 10]} intensity={2} />
    <Suspense fallback={null}>
      <Environment preset='sunset' />
      {Array.from({ length: count }, (_, i) => (<Scroll key={i} z={i}/>))}
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
