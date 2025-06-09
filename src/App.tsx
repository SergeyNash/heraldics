import React, { useState, useRef, useEffect } from 'react';
import { Crown } from 'lucide-react';
import Tooltip from './components/Tooltip';

// Данные интерактивных областей герба с координатами
const heraldryData = [
  {
    id: 'wolf-head',
    title: 'Голова волька',
    description: 'Верность и преданность семье, роду и своему слову',
    // Координаты: верхний левый квадрант щита (42% сверху, 35% слева)
    position: { top: '42%', left: '35%' }
  },
  {
    id: 'book-branch',
    title: 'Книга с ветвью',
    description: 'Знак разума и внутренней структуры, стремления к знанию и баланса между мышлением и справедливостью',
    // Координаты: верхний правый квадрант щита (32% сверху, 75% слева)
    position: { top: '42%', left: '65%' }
  },
  {
    id: 'hand-lightning',
    title: 'Рука с молнией',
    description: 'Сила духа, воля, стремление преодолевать и защищать',
    // Координаты: нижний левый квадрант щита (58% сверху, 25% слева)
    position: { top: '58%', left: '35%' }
  },
  {
    id: 'heart-ribbon',
    title: 'Сердце с лентой',
    description: 'Символ любви, как действия, как опоры, как силы, способной вести к истине',
    // Координаты: нижний правый квадрант щита (58% сверху, 75% слева)
    position: { top: '58%', left: '65%' }
  },
  {
    id: 'bear-supporter',
    title: 'Медведь',
    description: 'Сила земли, устойчивость, достоинство, защита семьи',
    // Координаты: левый щитоносец (45% сверху, 8% слева)
    position: { top: '45%', left: '15%' }
  },
  {
    id: 'eagle-supporter',
    title: 'Орёл',
    description: 'Стратегическое мышления, зоркость и высота духа',
    // Координаты: правый щитоносец (45% сверху, 92% слева)
    position: { top: '45%', left: '85%' }
  },
  {
    id: 'torch-tree',
    title: 'Факел в дереве',
    description: 'Связь поколений, пламя, передаваемое сквозь время',
    // Координаты: факел в верхней части (12% сверху, 50% слева - по центру)
    position: { top: '12%', left: '50%' }
  },
  {
    id: 'motto',
    title: 'Девиз рода',
    description: 'Через мудрость — к силе, через любовь — к истине',
    // Координаты: лента с девизом внизу (85% сверху, 50% слева - по центру)
    position: { top: '85%', left: '50%' }
  }
];

// Массив изображений гербов
const heraldryImages = [
  {
    src: '/herb.png',
    alt: 'Основной герб семьи Синяковых',
    title: 'Основной герб семьи Синяковых'
  },
  {
    src: '/herb2.png',
    alt: 'Альтернативный вариант в классическом стиле геральдики',
    title: 'Альтернативный вариант в классическом стиле геральдики'
  },
  {
    src: '/herb3.png',
    alt: 'Герба в стиле неогеральдики',
    title: 'Герба в стиле неогеральдики'
  },
  {
    src: '/herb4.png',
    alt: 'Герб в стиле гравировки',
    title: 'Герб в стиле гравировки'
  }
];

function App() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const crestRef = useRef<HTMLDivElement>(null);

  // Автоматическая смена изображений каждые 30 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % heraldryImages.length
        );
        setIsTransitioning(false);
      }, 300); // Половина времени перехода для плавности
    }, 30000); // 30 секунд

    return () => clearInterval(interval);
  }, []);

  const handleHotspotHover = (id: string, event: React.MouseEvent) => {
    setActiveTooltip(id);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleHotspotLeave = () => {
    setActiveTooltip(null);
  };

  const handleMobileTouch = (id: string, event: React.TouchEvent) => {
    event.preventDefault();
    if (activeTooltip === id) {
      setActiveTooltip(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      setActiveTooltip(id);
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
    }
  };

  const handleImageNavigation = (index: number) => {
    if (index !== currentImageIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Starry background overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(2px 2px at 20px 30px, #fbbf24, transparent),
                           radial-gradient(2px 2px at 40px 70px, #fbbf24, transparent),
                           radial-gradient(1px 1px at 90px 40px, #fbbf24, transparent),
                           radial-gradient(1px 1px at 130px 80px, #fbbf24, transparent),
                           radial-gradient(2px 2px at 160px 30px, #fbbf24, transparent)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px'
        }}
      />

      {/* Header */}
      <header className="relative z-10 text-center py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-garamond text-4xl md:text-6xl lg:text-7xl font-bold text-amber-100 mb-4 tracking-wide drop-shadow-2xl">
            Герб семьи
            <span className="block text-amber-400 italic">Синяковых</span>
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="font-garamond text-lg md:text-xl text-amber-200 italic max-w-2xl mx-auto leading-relaxed">
            Цифровая летопись родового наследия
          </p>
        </div>
      </header>

      {/* Main Crest Section */}
      <main className="relative z-10 flex flex-col items-center px-4 pb-16">
        <div 
          ref={crestRef}
          className="relative w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto"
        >
          {/* Crest Container */}
          <div className="relative">
            {/* Main Crest Image with transition */}
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={heraldryImages[currentImageIndex].src}
                alt={heraldryImages[currentImageIndex].alt}
                className={`w-full h-auto drop-shadow-2xl rounded-lg transition-all duration-600 ${
                  isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
                style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))' }}
              />
              
              {/* Image title overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-amber-400/30">
                  <p className="font-garamond text-sm md:text-base text-amber-200 text-center">
                    {heraldryImages[currentImageIndex].title}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Interactive Hotspots - увеличенная прозрачность */}
            {heraldryData.map((item) => (
              <button
                key={item.id}
                // Прозрачность увеличена до 60% для лучшей видимости
                className="absolute w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-amber-400/60 border-2 border-amber-500/80 hover:bg-amber-400/90 hover:border-amber-400 hover:scale-125 transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none focus:ring-4 focus:ring-amber-300/50 group shadow-lg shadow-amber-400/30"
                style={item.position}
                onMouseEnter={(e) => handleHotspotHover(item.id, e)}
                onMouseLeave={handleHotspotLeave}
                onTouchStart={(e) => handleMobileTouch(item.id, e)}
                aria-label={`${item.title}: ${item.description}`}
              >
                {/* Внутренний градиент с увеличенной прозрачностью */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/40 to-amber-600/40 animate-pulse group-hover:opacity-80"></div>
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-amber-400/50 to-amber-700/50 flex items-center justify-center shadow-lg">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-white/90 shadow-inner"></div>
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-amber-400/60 opacity-0 group-hover:opacity-80 transition-opacity duration-300 blur-sm scale-150"></div>
              </button>
            ))}
          </div>

          {/* Image Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-3">
            {heraldryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleImageNavigation(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                  index === currentImageIndex
                    ? 'bg-amber-400 shadow-lg shadow-amber-400/50'
                    : 'bg-amber-400/30 hover:bg-amber-400/60'
                }`}
                aria-label={`Показать ${heraldryImages[index].title}`}
              />
            ))}
          </div>

          {/* Progress bar for auto-transition */}
          <div className="mt-4 w-full bg-slate-700/50 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-1000 ease-linear"
              style={{
                width: '100%',
                animation: 'progress 30s linear infinite'
              }}
            />
          </div>

          {/* Instructions */}
          <div className="text-center mt-8 md:mt-12">
            <p className="font-garamond text-sm md:text-base text-amber-200 italic mb-2">
              <span className="hidden md:inline">Наведите курсор на золотые точки</span>
              <span className="md:hidden">Коснитесь золотых точек</span>
              {' '}для изучения символики герба
            </p>
            <p className="font-garamond text-xs md:text-sm text-amber-300/80">
              Изображения автоматически меняются каждые 30 секунд
            </p>
          </div>
        </div>

        {/* Motto Section */}
        <div className="mt-12 md:mt-16 text-center max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-2xl border border-amber-500/30">
            <Crown className="w-8 h-8 md:w-10 md:h-10 text-amber-400 mx-auto mb-4" />
            <blockquote className="font-garamond text-xl md:text-2xl lg:text-3xl font-medium text-amber-100 italic leading-relaxed">
              "Через мудрость — к силе,<br />
              через любовь — к истине"
            </blockquote>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-6"></div>
          </div>
        </div>
      </main>

      {/* Tooltip */}
      {activeTooltip && (
        <Tooltip
          isVisible={!!activeTooltip}
          content={heraldryData.find(item => item.id === activeTooltip)}
          position={tooltipPosition}
        />
      )}

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 px-4 border-t border-amber-500/20 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm">
        <p className="font-garamond text-sm text-amber-300">
          © {new Date().getFullYear()} Род Синяковых. Наследие поколений.
        </p>
      </footer>

      {/* Custom CSS for progress animation */}
      <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}

export default App;