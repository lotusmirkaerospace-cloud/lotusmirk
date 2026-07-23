"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Inline, orbit-controllable viewer for a single .obj mesh — the in-portal
 * 3D model view for photogrammetry deliverables. Loads a signed Storage
 * URL, so it must be re-mounted (not just re-rendered) if the URL's TTL
 * expires; the parent page re-fetches on each load, which is sufficient
 * for the ~10-minute signed-URL window in lib/deliverables.ts.
 */
export function ObjViewer({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    const width = container.clientWidth;
    const height = 420;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0d10);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    camera.position.set(2, 2, 2);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    const loader = new OBJLoader();
    loader.load(
      url,
      (object) => {
        if (disposed) return;

        // Center and scale the model to fit the view regardless of the
        // source mesh's original units/origin.
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3()).length() || 1;
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center);
        const scale = 2 / size;
        object.scale.setScalar(scale);

        scene.add(object);
        setLoading(false);
        animate();
      },
      undefined,
      (err) => {
        if (disposed) return;
        setError(err instanceof Error ? err.message : "Failed to load model");
        setLoading(false);
      },
    );

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [url]);

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10">
      <div ref={containerRef} className="h-[420px] w-full" />
      {loading && !error && (
        <p className="absolute inset-0 flex items-center justify-center text-sm text-white/40">
          Loading model…
        </p>
      )}
      {error && (
        <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-red-400">
          Couldn&apos;t load this model: {error}
        </p>
      )}
    </div>
  );
}
