'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ConstellationFallback } from './ConstellationFallback';

const ConstellationScene = dynamic(() => import('./ConstellationScene'), {
  ssr: false,
  loading: () => null,
});

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function subscribeViewport(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function subscribeVisibility(callback: () => void) {
  document.addEventListener('visibilitychange', callback);
  return () => document.removeEventListener('visibilitychange', callback);
}

const subscribeOnce = () => () => undefined;

export function HeroConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  );
  const isMobile = useSyncExternalStore(
    subscribeViewport,
    () => window.innerWidth < 768,
    () => false
  );
  const webglOk = useSyncExternalStore(subscribeOnce, hasWebGL, () => false);
  const tabHidden = useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => false
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries[0]?.isIntersecting ?? false;
        setIsVisible(visible);
        if (visible) setHasIntersected(true);
      },
      { threshold: 0.15, rootMargin: '80px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const canRender3D = hasIntersected && webglOk && !reducedMotion && !isMobile;

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {canRender3D ? (
        <Suspense fallback={<ConstellationFallback animated={false} />}>
          <ConstellationScene paused={!isVisible || tabHidden} />
        </Suspense>
      ) : (
        <ConstellationFallback animated={!reducedMotion} />
      )}
    </div>
  );
}
