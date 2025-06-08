import React from 'react';

interface TooltipProps {
  isVisible: boolean;
  content: {
    title: string;
    description: string;
  } | undefined;
  position: {
    x: number;
    y: number;
  };
}

const Tooltip: React.FC<TooltipProps> = ({ isVisible, content, position }) => {
  if (!isVisible || !content) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="bg-slate-900/95 backdrop-blur-sm text-white rounded-lg shadow-2xl p-4 max-w-xs mx-4 border border-amber-400/40 animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="relative">
          <h3 className="font-garamond text-lg font-semibold text-amber-300 mb-2">
            {content.title}
          </h3>
          <p className="font-garamond text-sm text-amber-100 leading-relaxed">
            {content.description}
          </p>
          
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-slate-900/95"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;