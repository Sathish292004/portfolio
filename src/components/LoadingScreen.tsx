import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(onComplete, 500); // Delay before calling onComplete
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center">
            {/* Logo/Brand */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-6xl font-bold gradient-text mb-4">Portfolio</h1>
              <p className="text-xl text-muted-foreground">Loading amazing experiences...</p>
            </motion.div>

            {/* 3D Loading Animation */}
            <motion.div
              className="relative w-24 h-24 mx-auto mb-8"
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <div className="absolute inset-2 border-4 border-accent/30 border-b-accent rounded-full animate-spin" style={{ animationDirection: 'reverse' }} />
              <div className="absolute inset-4 border-4 border-neon-cyan/30 border-l-neon-cyan rounded-full animate-spin" />
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto mb-4"
            >
              <div className="w-full h-2 bg-surface-dark rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-accent to-neon-cyan rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-center mt-2">
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>

            {/* Loading Text Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <LoadingText />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LoadingText = () => {
  const phrases = [
    "Initializing 3D engine...",
    "Loading creative assets...",
    "Preparing portfolio content...",
    "Setting up interactions...",
    "Almost ready..."
  ];

  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase(prev => (prev + 1) % phrases.length);
    }, 800);

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <motion.p
      key={currentPhrase}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-muted-foreground"
    >
      {phrases[currentPhrase]}
    </motion.p>
  );
};

export default LoadingScreen;