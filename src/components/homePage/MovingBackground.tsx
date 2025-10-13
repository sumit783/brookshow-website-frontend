interface MovingBackgroundProps {
  variant?: 'dots' | 'geometric' | 'particles' | 'waves';
  className?: string;
}

export const MovingBackground = ({ variant = 'dots', className = '' }: MovingBackgroundProps) => {
  if (variant === 'dots') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'geometric') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-accent/10 rotate-45 floating-card"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'particles') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-primary rounded-full opacity-30 floating-card"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `scale(${0.5 + Math.random() * 0.5})`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'waves') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(179, 12, 93, 0.1)" />
                <stop offset="50%" stopColor="rgba(79, 11, 176, 0.1)" />
                <stop offset="100%" stopColor="rgba(64, 224, 208, 0.1)" />
              </linearGradient>
            </defs>
            <path
              d="M0,50 Q250,10 500,50 T1000,50 L1000,100 L0,100 Z"
              fill="url(#wave-gradient)"
              className="moving-bg"
            />
            <path
              d="M0,70 Q250,30 500,70 T1000,70 L1000,100 L0,100 Z"
              fill="url(#wave-gradient)"
              className="moving-bg"
              style={{ animationDelay: '1s' }}
            />
          </svg>
        </div>
      </div>
    );
  }

  return null;
};