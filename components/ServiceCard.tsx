import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  means: string;
  value: string;
  details: string;
  icon: React.ReactNode;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, means, value, details, icon }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      data-hoverable
      className="group p-6 rounded-lg border flex flex-col transition-all duration-300 bg-surface-1 backdrop-blur-lg backdrop-saturate-150 border-border hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 h-full"
    >
      <div style={{ transform: 'translateZ(50px)' }} className="flex-shrink-0 w-10 h-10 text-accent group-hover:text-accent-light group-hover:scale-110 transition-all duration-300">
          {icon}
      </div>
      
      <div style={{ transform: 'translateZ(40px)' }} className="mt-4">
        <h4 className="font-bold text-text-primary text-xl tracking-wide">{title}</h4>
        <p className="text-text-secondary text-sm leading-relaxed tracking-wider mt-1">{means}</p>
      </div>

      <div style={{ transform: 'translateZ(30px)' }} className="mt-5 pt-5 border-t border-border/50 flex-grow flex flex-col">
          <div>
            <strong className="text-text-primary block font-semibold text-base">Value Proposition:</strong>
            <p className="text-text-secondary text-sm leading-relaxed tracking-wider mt-1">{value}</p>
          </div>
          <div className="mt-4">
            <p className="text-text-secondary text-sm leading-relaxed tracking-wider">{details}</p>
          </div>
      </div>
    </motion.div>
  );
};
