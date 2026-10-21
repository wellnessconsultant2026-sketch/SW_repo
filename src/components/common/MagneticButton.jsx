'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function MagneticButton({ 
  children, 
  onClick, 
  className = '', 
  style = {}, 
  strength = 0.22,
  ...props 
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e) => {
    if (prefersReduced || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      style={style}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 240, damping: 18, mass: 0.1 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
