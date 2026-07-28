import React from 'react';

interface BalLabsLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

export const BalLabsLogo: React.FC<BalLabsLogoProps> = ({
  size = 'md',
  showText = true,
  animated = false,
  className = '',
}) => {
  // Dimensions mapping
  const dimensions = {
    sm: { iconWidth: 28, iconHeight: 32, textSize: 'text-lg', letterGap: 'gap-0.5' },
    md: { iconWidth: 38, iconHeight: 44, textSize: 'text-2xl', letterGap: 'gap-1' },
    lg: { iconWidth: 54, iconHeight: 62, textSize: 'text-4xl', letterGap: 'gap-1.5' },
    xl: { iconWidth: 80, iconHeight: 92, textSize: 'text-6xl', letterGap: 'gap-2' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon Graphic reproducing the logo geometry */}
      <div className={`relative flex items-center justify-center ${animated ? 'group' : ''}`}>
        <svg
          width={dimensions.iconWidth}
          height={dimensions.iconHeight}
          viewBox="0 0 200 230"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-500 ${animated ? 'group-hover:scale-105' : ''}`}
        >
          <defs>
            <filter id="amberGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Top Horizontal Ring Ellipse */}
          <ellipse
            cx="100"
            cy="85"
            rx="85"
            ry="38"
            stroke="#f8fafc"
            strokeWidth="7"
            strokeOpacity="0.9"
          />

          {/* Bottom Horizontal Ring Ellipse */}
          <ellipse
            cx="100"
            cy="125"
            rx="85"
            ry="38"
            stroke="#f8fafc"
            strokeWidth="7"
            strokeOpacity="0.9"
          />

          {/* Vertical Standing Ring Ellipse */}
          <ellipse
            cx="100"
            cy="105"
            rx="38"
            ry="85"
            stroke="#f8fafc"
            strokeWidth="7"
            strokeOpacity="0.9"
          />

          {/* Highlighted Amber Accent Arc Top (matching golden ring section in image logo) */}
          <path
            d="M 66,72 A 85 38 0 0 1 134,72"
            stroke="url(#amberGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#amberGlow)"
          />

          {/* Highlighted Amber Accent Arc Bottom (matching golden ring section in image logo) */}
          <path
            d="M 66,138 A 85 38 0 0 0 134,138"
            stroke="url(#amberGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#amberGlow)"
          />

          {/* Subtle intersection center node accent */}
          <circle cx="100" cy="105" r="4" fill="#fbbf24" />
        </svg>

        {animated && (
          <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}
      </div>

      {/* Typography: "bal labs" with amber 'a' */}
      {showText && (
        <div
          className={`font-sans tracking-tight font-light ${dimensions.textSize} text-slate-100 flex items-baseline leading-none`}
          style={{ letterSpacing: '-0.03em' }}
        >
          <span className="font-normal text-slate-100">b</span>
          <span className="font-semibold text-amber-500 transition-colors duration-300 mx-[0.03em]">
            a
          </span>
          <span className="font-normal text-slate-100 mr-2">l</span>
          <span className="font-light text-slate-200 tracking-normal">labs</span>
        </div>
      )}
    </div>
  );
};
