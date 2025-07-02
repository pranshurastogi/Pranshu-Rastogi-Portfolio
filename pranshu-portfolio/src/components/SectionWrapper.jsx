import React from 'react';
import FloatingBlockchainIcons from './FloatingBlockchainIcons';

const SectionWrapper = ({ children }) => (
  <div style={{
    position: 'relative',
    border: '3px solid #2d3748', // dark gray, blockchain-like
    borderRadius: '20px',
    padding: '2.5rem 1.5rem',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    background: '#181a20', // subtle dark background
    overflow: 'hidden',
    margin: '2rem 0',
  }}>
    {/* Background icons */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      opacity: 0.12,
    }}>
      <FloatingBlockchainIcons />
    </div>
    {/* Content */}
    <div style={{ position: 'relative', zIndex: 1 }}>
      {children}
    </div>
  </div>
);

export default SectionWrapper; 