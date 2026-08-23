import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x161412, 0.002);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient & Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x366299, 50, 150);
    blueLight.position.set(30, 20, 20);
    scene.add(blueLight);

    const warmLight = new THREE.PointLight(0xEAE2D4, 30, 120);
    warmLight.position.set(-30, -20, 10);
    scene.add(warmLight);

    // Geometries Group for Design Tokens
    const group = new THREE.Group();
    scene.add(group);

    // 1. Floating Torus (Represents Design Tokens Cycle)
    const torusGeo = new THREE.TorusGeometry(14, 2.5, 16, 60);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: 0x366299,
      metalness: 0.2,
      roughness: 0.1,
      transparent: true,
      opacity: 0.6,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(35, -5, -10);
    group.add(torus);

    // 2. Icosahedron (Atomic Components)
    const icoGeo = new THREE.IcosahedronGeometry(8, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x4A78B0,
      metalness: 0.5,
      roughness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-35, 15, -15);
    group.add(ico);

    // 3. Floating Token Cubes
    const cubes: THREE.Mesh[] = [];
    const cubeGeo = new THREE.BoxGeometry(3, 3, 3);
    for (let i = 0; i < 12; i++) {
      const cubeMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x366299 : 0xEAE2D4,
        metalness: 0.3,
        roughness: 0.4,
        transparent: true,
        opacity: 0.5,
      });
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.set(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 40
      );
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(cube);
      cubes.push(cube);
    }

    // 4. Particle Starfield / Token Constellation
    const particleCount = 400;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 200;
      posArray[i + 1] = (Math.random() - 0.5) * 200;
      posArray[i + 2] = (Math.random() - 0.5) * 100;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 1.2,
      color: 0x4A78B0,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.03;
      mouseY = (e.clientY - windowHalfY) * 0.03;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Group gentle sway
      group.rotation.y = elapsedTime * 0.08 + targetX * 0.01;
      group.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1 - targetY * 0.01;

      // Individual mesh rotations
      torus.rotation.x = elapsedTime * 0.2;
      torus.rotation.y = elapsedTime * 0.3;

      ico.rotation.x = -elapsedTime * 0.15;
      ico.rotation.z = elapsedTime * 0.2;

      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.01 * (index % 3 + 1);
        cube.rotation.y += 0.008 * (index % 2 + 1);
        cube.position.y += Math.sin(elapsedTime * 1.5 + index) * 0.04;
      });

      particleMesh.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
