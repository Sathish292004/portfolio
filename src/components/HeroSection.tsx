import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroImage from '../assets/hero-bg.jpg';

// 3D Geometric Shape Component
const GeometricShape = ({ position, rotation, scale }: any) => {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.8}
          wireframe
          emissive="#1e40af"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

// Particle System Component
const ParticleSystem = () => {
  return (
    <Stars
      radius={300}
      depth={60}
      count={1000}
      factor={7}
      saturation={0}
      fade
      speed={1}
    />
  );
};

// 3D Scene Component
const Scene3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
      
      <Suspense fallback={null}>
        <ParticleSystem />
        <GeometricShape position={[-3, 2, 0]} rotation={[0.5, 0.5, 0]} scale={0.8} />
        <GeometricShape position={[3, -1, -2]} rotation={[1, 1, 0.5]} scale={1.2} />
        <GeometricShape position={[0, 3, -3]} rotation={[0, 0.5, 1]} scale={1} />
        <GeometricShape position={[-2, -2, 1]} rotation={[1.5, 0, 0.5]} scale={0.6} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  );
};

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      </div>

      {/* 3D Canvas Overlay */}
      <div className="absolute inset-0 opacity-70">
        <Scene3D />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Profile Photo */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative inline-block">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/50 glow mx-auto"

>
                <img
                  src="https://i.postimg.cc/ZRJ8VHxv/Generated-Image-September-05-2025-11-21-AM.jpg" alt="SK" className="profile-img" 
                  className="w-full h-full object-cover bg-surface-dark"
                />
              </div>
              {/* Decorative ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="text-foreground">Hi, I'm</span>
            <br />
            <span className="gradient-text">Sathish Kumar B</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            A developer passionate about building real-world software solutions
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <button
              onClick={scrollToAbout}
              className="btn-neon"
            >
              View My Work
            </button>
            
            <motion.a
              href="#contact"
              className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-all duration-300 glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.button
            onClick={scrollToAbout}
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown size={24} />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full glow"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent rounded-full glow"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-neon-cyan rounded-full glow"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
      />
    </section>
  );
};

export default HeroSection;