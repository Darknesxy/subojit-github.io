import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TerrainMesh3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 100;
    const height = container.clientHeight || 120;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, -35, 25);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Plane geometry for wireframe terrain
    const gridX = 24;
    const gridY = 24;
    const geo = new THREE.PlaneGeometry(50, 50, gridX, gridY);

    const mat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 3;
    scene.add(mesh);

    // Animation
    let animationFrameId;
    let clock = new THREE.Clock();

    const pos = geo.attributes.position;
    const originalZ = [];
    for (let i = 0; i < pos.count; i++) {
      originalZ.push(pos.getZ(i));
    }

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime() * 1.5;

      for (let i = 0; i < pos.count; i++) {
        const u = (i % (gridX + 1)) / gridX;
        const v = Math.floor(i / (gridX + 1)) / gridY;
        const wave = Math.sin(u * 5 + time) * Math.cos(v * 4 + time) * 3.5;
        pos.setZ(i, wave);
      }
      pos.needsUpdate = true;

      mesh.rotation.z += 0.002;

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
    <div className="flex flex-col items-center">
      <div ref={mountRef} className="w-[75px] h-[48px] overflow-hidden" />
      <div className="flex flex-col items-start gap-0.5 font-mono text-[8px] xl:text-[8.5px] text-gray-500 tracking-wider uppercase mt-0.5">
        <span className="hover:text-black transition-colors cursor-default">IDEAS</span>
        <span className="hover:text-black transition-colors cursor-default">EXPERIMENTS</span>
        <span className="hover:text-black transition-colors cursor-default">PROJECTS</span>
        <span className="hover:text-black transition-colors cursor-default">LEARNING</span>
        <span className="hover:text-cyber-emerald transition-colors font-semibold cursor-default">A SAFER INTERNET</span>
      </div>
    </div>
  );
}
