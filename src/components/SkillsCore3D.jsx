import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SkillsCore3D({ activeSkill }) {
  const mountRef = useRef(null);
  const meshRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 180;
    const height = container.clientHeight || 180;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    meshRef.current = group;

    // 1. Central wireframe icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(11, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x0e5a3c,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    group.add(ico);

    // 2. Inner glowing core
    const innerGeo = new THREE.OctahedronGeometry(6, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    // 3. Orbital rings
    const ring1Geo = new THREE.RingGeometry(16, 16.5, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x64748b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 4;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ring1Geo, ringMat.clone());
    ring2.rotation.y = Math.PI / 3;
    group.add(ring2);

    // 4. Floating particles around core
    const particleCount = 40;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 14 + Math.random() * 5;
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x059669,
      size: 1.2,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Animation
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      group.rotation.x += 0.005;
      group.rotation.y += 0.008;
      inner.rotation.x -= 0.01;
      inner.rotation.y -= 0.015;
      particles.rotation.y += 0.003;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-[180px] h-[180px] pointer-events-none flex items-center justify-center"
      title="3D Cyber Polyhedron Core"
    />
  );
}
