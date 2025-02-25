// src/components/analytics/TouchableChart.tsx
'use client';

import { useState, useRef, TouchEvent } from 'react';
import { ResponsiveContainer } from 'recharts';

interface TouchableChartProps {
  children: React.ReactNode;
  onTouchMove?: (e: TouchEvent) => void;
  onTouchStart?: (e: TouchEvent) => void;
  onTouchEnd?: (e: TouchEvent) => void;
}

export default function TouchableChart({
  children,
  onTouchMove,
  onTouchStart,
  onTouchEnd,
}: TouchableChartProps) {
  const [isPinching, setIsPinching] = useState(false);
  const touchStartRef = useRef<Touch[]>([]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartRef.current = Array.from(e.touches);
    if (e.touches.length === 2) {
      setIsPinching(true);
    }
    onTouchStart?.(e);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isPinching && e.touches.length === 2) {
      // Handle pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      
      const startTouch1 = touchStartRef.current[0];
      const startTouch2 = touchStartRef.current[1];
      const startDist = Math.hypot(
        startTouch1.clientX - startTouch2.clientX,
        startTouch1.clientY - startTouch2.clientY
      );
      
      // Calculate zoom factor
      const zoomFactor = dist / startDist;
      // You can use this zoom factor to adjust chart scale
    }
    onTouchMove?.(e);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    setIsPinching(false);
    onTouchEnd?.(e);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="w-full h-full"
    >
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  );
}