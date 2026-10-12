import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Disable completely on mobile devices (< 768px) and for prefers-reduced-motion
    if (typeof window === 'undefined' || window.innerWidth < 768) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let isVisible = true;
    let animationFrameId: number | null = null;

    // 2. Setup Scene, Camera, Renderer
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting (White and Lavender)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(12, 18, 20);
    scene.add(keyLight);

    const lavenderLight = new THREE.DirectionalLight(0xb8a4f4, 0.85); // Pure brand lavender
    lavenderLight.position.set(-15, -10, 10);
    scene.add(lavenderLight);

    // 4. White and Lavender Particles
    const particleCount = 75;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cWhite = new THREE.Color(0xffffff);
    const cLavSoft = new THREE.Color(0xdcd2fb);
    const cLav = new THREE.Color(0xb8a4f4);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const rnd = Math.random();
      const col = rnd < 0.35 ? cLav : rnd < 0.7 ? cLavSoft : cWhite;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255,255,255,0.85)');
      grad.addColorStop(0.5, 'rgba(184,164,244,0.3)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTex = new THREE.CanvasTexture(canvas);

    const pMaterial = new THREE.PointsMaterial({
      size: 0.24,
      map: particleTex,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // 5. Delicate orbital ring in brand lavender
    const ringGeo = new THREE.TorusGeometry(12, 0.03, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xb8a4f4,
      transparent: true,
      opacity: 0.15,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3.5;
    scene.add(ring);

    // 6. Pause Three.js scene when Hero is off-screen using IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          tick();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 7. Interactive Mouse Parallax Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 8. Render Loop
    let clock = new THREE.Clock();

    const tick = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      camera.position.x = currentMouseX * 2.5;
      camera.position.y = -currentMouseY * 1.8;
      camera.lookAt(scene.position);

      particles.rotation.y = elapsedTime * 0.025 + currentMouseX * 0.15;
      particles.rotation.x = elapsedTime * 0.012 - currentMouseY * 0.1;
      ring.rotation.z = elapsedTime * 0.02;
      ring.rotation.x = Math.PI / 3.5 + currentMouseY * 0.1;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // 9. Resize Handler
    const handleResize = () => {
      if (window.innerWidth < 768) {
        isVisible = false;
        return;
      }
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 10. Cleanup & Texture Disposal
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      particleTex.dispose();
      geometry.dispose();
      pMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 hidden md:block"
    />
  );
};
