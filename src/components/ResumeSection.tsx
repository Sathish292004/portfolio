import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, FileText, ExternalLink } from 'lucide-react';

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="resume" className="py-16 md:py-20 bg-gradient-to-br from-surface-dark to-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            View or download my resume to learn more about my qualifications
          </p>
        </motion.div>

        {/* Resume Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass rounded-xl overflow-hidden hover:glow transition-all duration-300">
            {/* Resume Preview Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative bg-surface-dark/50 p-6 md:p-8 lg:p-12"
            >
              {/* PDF Resume Preview */}
              <div className="aspect-[8.5/11] bg-white rounded-lg border border-border/30 overflow-hidden">
                <iframe
                  src="/Resume.pdf"
                  className="w-full h-full"
                  title="Resume Preview"
                />
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-4 md:p-6 bg-background/30 border-t border-border/30"
            >
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <motion.a
                  href="c:\Users\skleg\OneDrive\Desktop\3d-portfolio-main\sk2004-40\public\Resume.pdf"
                  download="c:\Users\skleg\OneDrive\Desktop\3d-portfolio-main\sk2004-40\public\Resume.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-neon flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Download size={18} />
                  Download Resume
                </motion.a>
                
                <motion.a
                  href="c:\Users\skleg\OneDrive\Desktop\3d-portfolio-main\sk2004-40\public\Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <ExternalLink size={18} />
                  View Full Screen
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
