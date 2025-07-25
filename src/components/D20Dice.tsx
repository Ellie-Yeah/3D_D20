import React, { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Edges, Icosahedron, OrbitControls, Text } from '@react-three/drei'
import { Quaternion, Euler, Vector3, Group } from 'three'
import gsap from 'gsap'

// Centros exatos das 20 faces do icosaedro, normalizados para raio 1
const faceCenters = [
    [0.0, 0.93417236, 0.35682209],
    [0.0, 0.93417236, -0.35682209],
    [0.0, -0.93417236, 0.35682209],
    [0.0, -0.93417236, -0.35682209],
    [0.93417236, 0.35682209, 0.0],
    [0.93417236, -0.35682209, 0.0],
    [-0.93417236, 0.35682209, 0.0],
    [-0.93417236, -0.35682209, 0.0],
    [0.35682209, 0.0, 0.93417236],
    [0.35682209, 0.0, -0.93417236],
    [-0.35682209, 0.0, 0.93417236],
    [-0.35682209, 0.0, -0.93417236],
    [0.57735027, 0.57735027, 0.57735027],
    [0.57735027, 0.57735027, -0.57735027],
    [0.57735027, -0.57735027, 0.57735027],
    [0.57735027, -0.57735027, -0.57735027],
    [-0.57735027, 0.57735027, 0.57735027],
    [-0.57735027, 0.57735027, -0.57735027],
    [-0.57735027, -0.57735027, 0.57735027],
    [-0.57735027, -0.57735027, -0.57735027],
];
// Ordem spindown exemplo
const d20Order = [20, 13, 8, 1, 15, 6, 11, 10, 17, 4, 18, 3, 16, 14, 7, 5, 19, 12, 9, 2];

// Calcula a rotação (Euler) para alinhar o centro de uma face com o eixo Z positivo
function getFaceRotation(face: [number, number, number]) {
    // A normal da face é o próprio vetor do centro (pois o icosaedro é regular)
    const normal = new Vector3(face[0], face[1], face[2]).normalize()
    // Cria um quaternion que alinha o vetor normal ao eixo Z
    const m = new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), normal)
    // Converte o quaternion para ângulos de Euler (x, y, z)
    const euler = new Euler().setFromQuaternion(m)
    return [euler.x, euler.y, euler.z] as [number, number, number]
}

// Função utilitária para calcular a rotação alvo para alinhar a face sorteada com o eixo Z positivo
function getRotationToFace(faceIndex: number): [number, number, number] {
    const facePos = d20Order.indexOf(faceIndex + 1)
    const face = faceCenters[facePos]
    const from = new Vector3(face[0], face[1], face[2]).normalize()
    const to = new Vector3(0, 0, 1)
    const q = new Quaternion().setFromUnitVectors(from, to)
    const euler = new Euler().setFromQuaternion(q)
    return [euler.x, euler.y, euler.z]
}

// Componente do mesh do D20, recebe uma ref para manipular a rotação
function D20Mesh({ groupRef }: { groupRef: React.RefObject<Group | null> }) {
    return (
        <group ref={groupRef}>
            {/* D20 icosaedro com material e arestas */}
            <Icosahedron args={[1, 0]}>
                <meshStandardMaterial color="white" />
                <Edges color="white" />
            </Icosahedron>
            {/* Números nas faces, posicionados e rotacionados conforme o centro e normal de cada face */}
            {faceCenters.map((pos, i) => (
                <Text
                    key={i}
                    position={pos.map(v => v * 0.8) as [number, number, number]} // ligeiramente afastado da face
                    fontSize={0.37}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                    rotation={getFaceRotation(pos as [number, number, number])}
                    font="/fonts/Joan/subset-Joan-Regular.woff"
                >
                    {d20Order[i]}
                </Text>
            ))}
        </group>
    )
}

export default function D20Dice() {
    // Estado para guardar o número sorteado
    const [numero, setNumero] = useState<number | null>(null)
    // Ref para acessar o grupo 3D do dado
    const groupRef = useRef<Group | null>(null)

    // Função chamada ao clicar no botão para rolar o dado
    function rolarDado() {
        const sorteado = Math.floor(Math.random() * 20) + 1
        setNumero(sorteado)
        const rot = getRotationToFace(sorteado - 1)
        if (groupRef.current) {
            // Anima a rotação do dado usando GSAP, adicionando voltas extras para efeito de rolagem
            gsap.to(groupRef.current.rotation, {
                x: rot[0] + Math.PI * 6, // 3 voltas extras
                y: rot[1] + Math.PI * 6,
                z: rot[2] + Math.PI * 6,
                duration: 2,
                ease: 'power2.out',
                onUpdate: () => {},
                onComplete: () => {
                    if (groupRef.current) {
                        groupRef.current.rotation.x = rot[0]
                        groupRef.current.rotation.y = rot[1]
                        groupRef.current.rotation.z = rot[2]
                    }
                }
            })
        }
    }

    return (
        <div style={{ width: '100%', height: '100vh', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {/* Canvas 3D centralizado */}
            <Canvas camera={{ position: [0, 0, 3] }} style={{ width: '100vw', height: '100vh' }}>
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} />
                {/* Mesh do dado com ref para rotação */}
                <D20Mesh groupRef={groupRef} />
                <OrbitControls />
            </Canvas>
            {/* Botão para rolar o dado e mostrar o resultado */}
            <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button onClick={rolarDado} style={{ fontWeight: 'bold', padding: '12px 32px', fontSize: '1.2rem', borderRadius: 8, background: '#750000', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                    Roll the Dice
                </button>
                {numero !== null && (
                    <div style={{ marginLeft: 20, fontSize: '1.5rem', color: 'white', textAlign: 'center', alignSelf: 'center' }}>
                        Result: {numero}
                    </div>
                )}
            </div>
        </div>
    )
}