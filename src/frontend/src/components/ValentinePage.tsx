import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import FloatingHeartsBackground from './FloatingHeartsBackground';
import SuccessDialog from './SuccessDialog';
import MusicControl from './MusicControl';

const BUTTON_LABELS = ['No 🙃', 'Are you sure? 😏', 'One last chance 😢', 'Yes ❤️'];

export default function ValentinePage() {
  const [noAttempts, setNoAttempts] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLabel = BUTTON_LABELS[Math.min(noAttempts, BUTTON_LABELS.length - 1)];

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate safe bounds (keep button fully visible)
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;
    const minX = 20;
    const minY = 20;

    // Generate random position with variety (edges, corners, random)
    let newX: number, newY: number;
    const strategy = Math.floor(Math.random() * 6);

    switch (strategy) {
      case 0: // Left edge
        newX = minX;
        newY = Math.random() * (maxY - minY) + minY;
        break;
      case 1: // Right edge
        newX = maxX;
        newY = Math.random() * (maxY - minY) + minY;
        break;
      case 2: // Top edge
        newX = Math.random() * (maxX - minX) + minX;
        newY = minY;
        break;
      case 3: // Bottom edge
        newX = Math.random() * (maxX - minX) + minX;
        newY = maxY;
        break;
      case 4: // Random corner
        newX = Math.random() > 0.5 ? maxX : minX;
        newY = Math.random() > 0.5 ? maxY : minY;
        break;
      default: // Random position
        newX = Math.random() * (maxX - minX) + minX;
        newY = Math.random() * (maxY - minY) + minY;
    }

    setNoButtonPosition({ x: newX, y: newY });
    setNoAttempts((prev) => prev + 1);
    setYesScale((prev) => prev + 0.1);
  };

  const handleNoHover = () => {
    moveNoButton();
  };

  const handleNoClick = () => {
    moveNoButton();
  };

  const handleYesClick = () => {
    setShowSuccess(true);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden">
      <FloatingHeartsBackground />
      
      <MusicControl />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="romantic-title mb-12 text-4xl font-bold md:text-6xl">
            Will you be my Valentine? ❤️
          </h1>

          <div className="relative flex items-center justify-center gap-6">
            {/* Yes Button - Always centered */}
            <Button
              onClick={handleYesClick}
              size="lg"
              className="yes-button z-20 transform px-8 py-6 text-xl font-semibold transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                transform: `scale(${yesScale})`,
              }}
            >
              Yes 💖
            </Button>

            {/* No Button - Moves around */}
            <Button
              ref={noButtonRef}
              onMouseEnter={handleNoHover}
              onClick={handleNoClick}
              variant="outline"
              size="lg"
              className="no-button absolute z-10 px-8 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                left: `${noButtonPosition.x}px`,
                top: `${noButtonPosition.y}px`,
                transition: 'left 0.3s ease-out, top 0.3s ease-out, transform 0.2s',
              }}
            >
              {currentLabel}
            </Button>
          </div>
        </div>
      </div>

      <SuccessDialog open={showSuccess} onOpenChange={setShowSuccess} />
    </div>
  );
}
