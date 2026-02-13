import React from 'react';
import { motion } from 'framer-motion';
import { FaEthereum, FaBitcoin } from 'react-icons/fa';
import { SiPolygon, SiSolana } from 'react-icons/si';
import BlockchainMeshBg from './BlockchainMeshBg';

const floatingIcons = [
  <FaEthereum size={32} color="#AEEA00" />,
  <FaBitcoin size={32} color="#F7931A" />,
  <SiPolygon size={32} color="#a259ff" />,
  <SiSolana size={32} color="#00FFA3" />
];

const seededFloat = (index, seed, min, max) => {
  const x = Math.sin(index * 1.618033988749 + seed * 7) * 10000;
  const t = x - Math.floor(x);
  return min + t * (max - min);
};

const FloatingLogos = () => {
  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => {
        const icon = floatingIcons[i % floatingIcons.length];
        const top = seededFloat(i, 1, 5, 85);
        const left = seededFloat(i, 2, 5, 90);
        const duration = seededFloat(i, 3, 7, 16);
        const delay = seededFloat(i, 4, 0, 4);
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: `${Number(top).toFixed(4)}%`,
              left: `${Number(left).toFixed(4)}%`,
              zIndex: 1,
              opacity: 0.5,
            }}
            initial={{ y: 0, opacity: 0.5 }}
            animate={{ y: [0, -30, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration, repeat: Infinity, repeatType: 'loop', delay, ease: 'easeInOut' }}
          >
            {icon}
          </motion.div>
        );
      })}
    </>
  );
};

const SectionWrapper = ({ children }) => {
  return (
    <section className="relative py-8 md:py-12 px-4 overflow-hidden">
      <BlockchainMeshBg />
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
        <FloatingLogos />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
