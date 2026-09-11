import { motion, useMotionValue, useTransform, type PanInfo } from 'motion/react';
import { useState, useEffect } from 'react';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="absolute inset-0 cursor-pointer" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  cards?: React.ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
  onTopCardChange?: (topIndex: number) => void;
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  onTopCardChange
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  interface StackCardItem {
    id: number;
    content: React.ReactNode;
    rotation: number;
  }

  const [stack, setStack] = useState<StackCardItem[]>(() => {
    if (cards.length) {
      return cards.map((content, index) => ({
        id: index + 1,
        content,
        rotation: randomRotation ? Math.random() * 10 - 5 : 0
      }));
    } else {
      const defaultContents = [
        <img
          key="card-1"
          src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"
          alt="card-1"
          className="w-full h-full object-cover pointer-events-none"
        />,
        <img
          key="card-2"
          src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format"
          alt="card-2"
          className="w-full h-full object-cover pointer-events-none"
        />,
        <img
          key="card-3"
          src="https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format"
          alt="card-3"
          className="w-full h-full object-cover pointer-events-none"
        />,
        <img
          key="card-4"
          src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
          alt="card-4"
          className="w-full h-full object-cover pointer-events-none"
        />
      ];
      return defaultContents.map((content, index) => ({
        id: index + 1,
        content,
        rotation: randomRotation ? Math.random() * 10 - 5 : 0
      }));
    }
  });

  useEffect(() => {
    if (cards.length) {
      setStack(prev =>
        cards.map((content, index) => {
          const existing = prev.find(card => card.id === index + 1);
          return {
            id: index + 1,
            content,
            rotation: existing ? existing.rotation : (randomRotation ? Math.random() * 10 - 5 : 0)
          };
        })
      );
    }
  }, [cards, randomRotation]);

  const sendToBack = (id: number) => {
    setStack(prev => {
      const newStack = [...prev];
      const index = newStack.findIndex(card => card.id === id);
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  };

  useEffect(() => {
    if (stack.length > 0 && onTopCardChange) {
      const topCard = stack[stack.length - 1];
      if (topCard) {
        onTopCardChange(topCard.id - 1);
      }
    }
  }, [stack, onTopCardChange]);

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id;
        sendToBack(topCardId);
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused]);

  return (
    <div
      className="relative w-full h-full"
      style={{
        perspective: 600
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const depth = stack.length - 1 - index;
        if (depth > 5) return null;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="rounded-2xl overflow-hidden w-full h-full"
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={{
                rotateZ: depth * 2.5 + card.rotation,
                scale: Math.max(0.85, 1 - depth * 0.035),
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
