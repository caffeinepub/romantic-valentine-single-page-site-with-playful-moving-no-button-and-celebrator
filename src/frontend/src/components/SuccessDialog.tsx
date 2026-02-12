import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import HeartConfetti from './HeartConfetti';

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SuccessDialog({ open, onOpenChange }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="success-dialog max-w-2xl border-none bg-gradient-to-br from-pink-100 via-red-50 to-pink-100 shadow-2xl">
        {open && <HeartConfetti />}
        
        <DialogHeader className="space-y-6 text-center">
          <DialogTitle className="romantic-title text-5xl font-bold md:text-6xl">
            Congratulations ❤️🎉
          </DialogTitle>
          <DialogDescription className="success-message space-y-4 text-2xl leading-relaxed md:text-3xl">
            <p>I knew you'd say yes!</p>
            <p>You just made my day.</p>
            <p>I love you so much 😘</p>
            <p className="font-bold text-pink-600">Happy Valentine's Day 💕</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
