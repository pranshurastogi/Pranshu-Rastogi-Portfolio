export default function BlockchainMeshBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      width="100%"
      height="100%"
      viewBox="0 0 1200 300"
    >
      <polyline
        points="60,120 180,80 320,160 500,100 700,180 900,120 1100,180"
        fill="none"
        stroke="#39FF14"
        strokeWidth="2.2"
        strokeDasharray="16 12"
        opacity="0.15"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="60;0;100"
          dur="10s"
          repeatCount="indefinite"
        />
      </polyline>
      <polyline
        points="100,200 220,110 340,180 480,90 600,210 740,130 900,200 1150,140"
        fill="none"
        stroke="#AEEA00"
        strokeWidth="1.5"
        strokeDasharray="10 8"
        opacity="0.12"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="40;0;60"
          dur="13s"
          repeatCount="indefinite"
        />
      </polyline>
      <polyline
        points="80,60 200,140 350,100 520,180 700,80 850,160 1050,100 1190,180"
        fill="none"
        stroke="#00e0ff"
        strokeWidth="1.2"
        strokeDasharray="8 7"
        opacity="0.10"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="30;0;50"
          dur="15s"
          repeatCount="indefinite"
        />
      </polyline>
      <polyline
        points="120,180 260,90 400,160 600,120 800,200 1000,140 1150,220"
        fill="none"
        stroke="#a259ff"
        strokeWidth="1.1"
        strokeDasharray="12 10"
        opacity="0.08"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="20;0;40"
          dur="17s"
          repeatCount="indefinite"
        />
      </polyline>
      <polyline
        points="60,220 180,160 320,240 500,180 700,260 900,200 1100,260"
        fill="none"
        stroke="#39FF14"
        strokeWidth="1.3"
        strokeDasharray="14 11"
        opacity="0.06"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="10;0;30"
          dur="19s"
          repeatCount="indefinite"
        />
      </polyline>
    </svg>
  );
}
