import React, { useEffect, useRef } from 'react';

const COLS = 32;
const ROWS = 18;
const DIGITS = ['0', '1'];

function getRandomDigit() {
  return DIGITS[Math.floor(Math.random() * DIGITS.length)];
}

export default function Matrix3DLayer() {
  const gridRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gridRef.current) return;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = gridRef.current.querySelector(`[data-row='${r}'][data-col='${c}']`);
          if (cell) {
            if (Math.random() > 0.92) {
              cell.textContent = getRandomDigit();
            }
          }
        }
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="matrix3d-bg">
      <div className="matrix3d-grid" ref={gridRef}>
        {Array.from({ length: ROWS }).map((_, r) => (
          <div className="matrix3d-row" key={r}>
            {Array.from({ length: COLS }).map((_, c) => (
              <span
                className="matrix3d-digit"
                key={c}
                data-row={r}
                data-col={c}
                style={{
                  // Perspective scaling and fading
                  opacity: 0.5 + 0.5 * (1 - r / ROWS),
                  filter: `blur(${r * 0.5}px)`,
                  fontSize: `${1.2 + (1 - r / ROWS) * 2.2}vw`,
                }}
              >
                {getRandomDigit()}
              </span>
            ))}
          </div>
        ))}
      </div>
      <style jsx>{`
        .matrix3d-bg {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }
        .matrix3d-grid {
          display: flex;
          flex-direction: column;
          width: 100vw;
          height: 100vh;
          perspective: 900px;
          transform-style: preserve-3d;
        }
        .matrix3d-row {
          display: flex;
          justify-content: center;
          transform: translateZ(0px);
        }
        .matrix3d-digit {
          color: #00ff55;
          text-shadow:
            0 0 8px #00ff55,
            0 0 16px #00ff55,
            0 0 32px #00ff55;
          font-family: 'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace;
          font-weight: bold;
          margin: 0 0.18vw;
          user-select: none;
          will-change: opacity, filter;
          animation: matrix3d-fall 2.8s linear infinite;
        }
        @keyframes matrix3d-fall {
          0% { transform: translateY(-10vh); opacity: 0.2; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(10vh); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
} 