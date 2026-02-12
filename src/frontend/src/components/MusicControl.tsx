import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a romantic tune frequency
    // Using Web Audio API to generate a simple romantic melody
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const createRomanticTone = () => {
      if (!isPlaying) return;

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = 523.25; // C5 note
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    };

    let interval: NodeJS.Timeout;
    if (isPlaying) {
      createRomanticTone();
      interval = setInterval(createRomanticTone, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed right-4 top-4 z-30">
      <Button
        onClick={toggleMusic}
        variant="outline"
        size="icon"
        className="music-control h-12 w-12 rounded-full border-2 border-pink-300 bg-white/80 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-pink-50"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5 text-pink-600" />
        ) : (
          <VolumeX className="h-5 w-5 text-pink-400" />
        )}
      </Button>
    </div>
  );
}
