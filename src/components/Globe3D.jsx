import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playBlip } from '../utils/audio';

export default function Globe3D() {
  const mountRef = useRef(null);
  const [activeThreat, setActiveThreat] = useState(null);
  const [coords, setCoords] = useState({ lat: '70.12', lon: '45.23', alt: '23.90', ping: '64.11' });
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 220;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 195;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Inner dark sphere
    const sphereRadius = 74;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 64, 64);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x050a0e,
      wireframe: false,
    });
    const baseSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(baseSphere);

    // 2. Subtle wireframe grid lines
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x112822,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const gridSphere = new THREE.Mesh(new THREE.SphereGeometry(sphereRadius + 0.3, 36, 18), gridMat);
    globeGroup.add(gridSphere);

    // 3. Atmosphere glow ring
    const atmosphereGeo = new THREE.SphereGeometry(sphereRadius + 4, 32, 32);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.06, 0.65, 0.45, 1.0) * intensity * 0.75;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphere);

    // Helper: Lat/Long to 3D Cartesian coordinates
    const latLongToVector3 = (lat, lon, radius) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    // 4. Dot matrix continents
    // Generate realistic continent clusters
    const landClusters = [
      // North America
      { minLat: 20, maxLat: 65, minLon: -140, maxLon: -60, density: 400 },
      // South America
      { minLat: -50, maxLat: 10, minLon: -80, maxLon: -35, density: 250 },
      // Europe
      { minLat: 35, maxLat: 68, minLon: -10, maxLon: 45, density: 350 },
      // Africa
      { minLat: -35, maxLat: 35, minLon: -15, maxLon: 50, density: 350 },
      // Asia & India
      { minLat: 5, maxLat: 70, minLon: 55, maxLon: 145, density: 650 },
      // Australia
      { minLat: -40, maxLat: -12, minLon: 112, maxLon: 154, density: 180 },
    ];

    const dotPositions = [];
    landClusters.forEach(cluster => {
      for (let i = 0; i < cluster.density; i++) {
        const lat = cluster.minLat + Math.random() * (cluster.maxLat - cluster.minLat);
        const lon = cluster.minLon + Math.random() * (cluster.maxLon - cluster.minLon);
        const pos = latLongToVector3(lat, lon, sphereRadius + 0.8);
        dotPositions.push(pos.x, pos.y, pos.z);
      }
    });

    const dotsGeo = new THREE.BufferGeometry();
    dotsGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    const dotsMat = new THREE.PointsMaterial({
      color: 0x4ade80,
      size: 1.4,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const continentDots = new THREE.Points(dotsGeo, dotsMat);
    globeGroup.add(continentDots);

    // 5. Major Cyber Security Hubs
    const hubs = [
      { name: 'Bengaluru (Defense Hub)', lat: 12.97, lon: 77.59, status: 'Normal', color: 0x10b981 },
      { name: 'New York (Financial Tier-1)', lat: 40.71, lon: -74.00, status: 'Normal', color: 0x06b6d4 },
      { name: 'Frankfurt (EU Gateway)', lat: 50.11, lon: 8.68, status: 'Suspicious', color: 0xf59e0b },
      { name: 'Tokyo (Asia Pacific)', lat: 35.68, lon: 139.76, status: 'Normal', color: 0x10b981 },
      { name: 'London (SOC Prime)', lat: 51.50, lon: -0.12, status: 'Suspicious', color: 0xf59e0b },
      { name: 'Singapore (Edge DC)', lat: 1.35, lon: 103.81, status: 'Normal', color: 0x06b6d4 },
      { name: 'Sydney (Pacific Link)', lat: -33.86, lon: 151.20, status: 'Normal', color: 0x10b981 },
      { name: 'Unknown (Malicious Origin)', lat: 55.75, lon: 37.61, status: 'Malicious', color: 0xef4444 },
    ];

    // Hub marker rings
    hubs.forEach(hub => {
      const pos = latLongToVector3(hub.lat, hub.lon, sphereRadius + 1.2);
      const ringGeo = new THREE.RingGeometry(1.4, 2.4, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: hub.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      globeGroup.add(ring);
    });

    // 6. Cyber Attack Beams & Great Circle Arcs
    const attackPairs = [
      { from: hubs[7], to: hubs[0], type: 'Malicious', attack: 'DDoS SYN Flood [Mitigated]', color: 0xef4444 },
      { from: hubs[2], to: hubs[1], type: 'Suspicious', attack: 'Brute-force SSH [Blocked]', color: 0xf59e0b },
      { from: hubs[4], to: hubs[0], type: 'Normal', attack: 'Telemetry Heartbeat [OK]', color: 0x10b981 },
      { from: hubs[5], to: hubs[3], type: 'Normal', attack: 'TLS 1.3 Handshake [OK]', color: 0x06b6d4 },
      { from: hubs[7], to: hubs[1], type: 'Malicious', attack: 'SQLi Exploit Probe [Blocked]', color: 0xef4444 },
    ];

    const arcLines = [];
    const arcMissiles = [];

    attackPairs.forEach(pair => {
      const vFrom = latLongToVector3(pair.from.lat, pair.from.lon, sphereRadius + 1);
      const vTo = latLongToVector3(pair.to.lat, pair.to.lon, sphereRadius + 1);

      // Arc curve control point elevated above surface
      const distance = vFrom.distanceTo(vTo);
      const mid = vFrom.clone().add(vTo).multiplyScalar(0.5);
      const altitude = sphereRadius + (distance * 0.35);
      mid.normalize().multiplyScalar(altitude);

      const curve = new THREE.QuadraticBezierCurve3(vFrom, mid, vTo);
      const points = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);

      const curveMat = new THREE.LineBasicMaterial({
        color: pair.color,
        transparent: true,
        opacity: 0.45,
        linewidth: 1.5,
      });

      const line = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(line);
      arcLines.push(line);

      // Moving energy pulse on arc
      const missileGeo = new THREE.SphereGeometry(1.6, 8, 8);
      const missileMat = new THREE.MeshBasicMaterial({
        color: pair.color,
      });
      const missile = new THREE.Mesh(missileGeo, missileMat);
      globeGroup.add(missile);

      arcMissiles.push({
        mesh: missile,
        curve,
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
        pair,
      });
    });

    // 7. Interactive mouse drag rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x += deltaY * 0.006;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Initial globe angle
    globeGroup.rotation.y = 1.2;
    globeGroup.rotation.x = 0.3;

    // Animation Loop
    let animationFrameId;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;

      if (autoRotate && !isDragging) {
        globeGroup.rotation.y += 0.0018;
      }

      // Animate missile pulses
      arcMissiles.forEach(missile => {
        missile.t += missile.speed;
        if (missile.t > 1) {
          missile.t = 0;
          if (Math.random() > 0.6) {
            setActiveThreat({
              from: missile.pair.from.name,
              to: missile.pair.to.name,
              attack: missile.pair.attack,
              type: missile.pair.type,
            });
          }
        }
        const point = missile.curve.getPoint(missile.t);
        missile.mesh.position.copy(point);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate]);

  // Telemetry fluctuation simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setCoords({
        lat: (69.8 + Math.random() * 0.6).toFixed(2),
        lon: (45.1 + Math.random() * 0.4).toFixed(2),
        alt: (23.7 + Math.random() * 0.5).toFixed(2),
        ping: (63.8 + Math.random() * 0.9).toFixed(2),
      });
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Dynamic Telemetry Readout */}
      <div className="absolute top-2 right-2 z-10 flex flex-col items-end font-mono text-[10px] text-gray-500 tracking-wider">
        <span>{coords.lat}</span>
        <span>{coords.lon}</span>
        <span>{coords.alt}</span>
        <span>{coords.ping}</span>
      </div>

      {/* 3D Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-[180px] sm:h-[195px] xl:h-[190px] 2xl:h-[220px] cursor-grab active:cursor-grabbing relative overflow-hidden flex items-center justify-center"
        title="Drag to rotate globe in 3D"
        onClick={() => playBlip(950, 0.04)}
      />

      {/* Rotation toggle & hint */}
      <div className="w-full px-2 flex items-center justify-between font-mono text-[9px] xl:text-[10px] text-gray-500 -mt-1">
        <button 
          onClick={() => setAutoRotate(!autoRotate)}
          className="hover:text-cyber-emerald transition-colors underline flex items-center gap-1"
        >
          <span>{autoRotate ? '⏸ PAUSE ROTATION' : '▶ RESUME ROTATION'}</span>
        </button>
        <span className="text-gray-400">DRAG TO EXPLORE 3D</span>
      </div>

      {/* Live Threat Notification Card */}
      {activeThreat && (
        <div className="w-full mt-1.5 bg-[#0c1216] border border-[#1b252c] rounded px-2 py-1 flex items-center justify-between text-[10px] font-mono animate-fadeIn">
          <div className="flex items-center gap-2 truncate">
            <span className={`w-1.5 h-1.5 rounded-full animate-ping ${
              activeThreat.type === 'Malicious' ? 'bg-red-500' :
              activeThreat.type === 'Suspicious' ? 'bg-amber-400' : 'bg-emerald-400'
            }`} />
            <span className="text-gray-300 truncate">{activeThreat.attack}</span>
          </div>
          <span className="text-gray-500 text-[9px] ml-2 shrink-0">{coords.ping}ms</span>
        </div>
      )}
    </div>
  );
}
