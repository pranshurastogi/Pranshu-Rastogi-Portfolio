import React from 'react';

const CustomLogo = ({ width = 24, height = 24, className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 64 64" 
      width={width} 
      height={height}
      className={className}
    >
      <rect width="64" height="64" rx="12" fill="#181c1f"/>
      <text 
        x="50%" 
        y="54%" 
        textAnchor="middle" 
        dominantBaseline="middle" 
        fontFamily="'Fira Mono', 'Menlo', 'Monaco', 'Consolas', monospace" 
        fontSize="32" 
        fontWeight="bold" 
        fill="#AEEA00" 
        stroke="#39FF14" 
        strokeWidth="1.5" 
        paintOrder="stroke" 
        style={{ textShadow: '0 0 8px #39FF14,0 0 2px #AEEA00' }}
      >
        PR
      </text>
    </svg>
  );
};

export default CustomLogo;
