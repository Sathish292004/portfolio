import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Server, Database, Cloud, Palette, Zap } from 'lucide-react';

const skillsData = [
  {
    category: 'Languages',
    icon: Code,
    color: 'text-primary',
    bgColor: 'bg-primary/20',
    skills: [
      { name: 'Java', level: 90, description: 'Object-oriented programming and enterprise application development' },
      { name: 'Python', level: 85, description: 'Machine learning, data analysis, and backend development' },
      { name: 'JavaScript', level: 88, description: 'Frontend and backend development with modern frameworks' },
      { name: 'HTML/CSS', level: 92, description: 'Responsive web design and modern CSS techniques' },
      { name: 'SQL', level: 82, description: 'Database design, queries, and optimization' }
    ]
  },
  {
    category: 'Tools & IDEs',
    icon: Server,
    color: 'text-accent',
    bgColor: 'bg-accent/20',
    skills: [
      { name: 'VS Code', level: 95, description: 'Primary development environment with advanced extensions' },
      { name: 'Eclipse', level: 88, description: 'Java development and enterprise applications' },
      { name: 'MySQL', level: 85, description: 'Database management and optimization' },
      { name: 'Power BI', level: 80, description: 'Data visualization and business analytics' },
      { name: 'Android Studio', level: 75, description: 'Mobile app development for Android platform' }
    ]
  },
  {
    category: 'Frameworks & Libraries',
    icon: Database,
    color: 'text-neon-cyan',
    bgColor: 'bg-neon-cyan/20',
    skills: [
      { name: 'JavaScript Frameworks', level: 85, description: 'Modern frontend development with component-based architecture' },
      { name: 'Scikit-learn', level: 82, description: 'Machine learning model development and deployment' },
      { name: 'RESTful APIs', level: 80, description: 'API design and integration for web applications' }
    ]
  },
  {
    category: 'Soft Skills',
    icon: Cloud,
    color: 'text-secondary',
    bgColor: 'bg-secondary/20',
    skills: [
      { name: 'Leadership', level: 90, description: 'Team management and project coordination' },
      { name: 'Strategy', level: 88, description: 'Strategic planning and problem-solving approach' },
      { name: 'Adaptability', level: 92, description: 'Quick learning and adaptation to new technologies' },
      { name: 'Collaboration', level: 95, description: 'Effective teamwork and communication skills' }
    ]
  }
];

const ProgressBar = ({ skill, delay }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{skill.name}</span>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${skill.level}%` : 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-1">{skill.description}</p>
    </div>
  );
};

const SkillCard = ({ category, index }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-lg p-6 hover:glow transition-all duration-300"
    >
      <div 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 ${category.bgColor} rounded-lg`}>
              <category.icon size={24} className={category.color} />
            </div>
            <h3 className="text-xl font-semibold">{category.category}</h3>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-muted-foreground"
          >
            ↓
          </motion.div>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          {category.skills.length} skills • Click to expand
        </div>

        {/* Skill Preview Bars */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {category.skills.slice(0, 4).map((skill, skillIndex) => (
            <div key={skillIndex} className="text-xs">
              <div className="flex justify-between mb-1">
                <span className="truncate">{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="h-1 bg-muted rounded">
                <motion.div
                  className={`h-full rounded bg-gradient-to-r from-primary to-accent`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.1 + skillIndex * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Content */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="border-t border-border/30 pt-4">
          {category.skills.map((skill, skillIndex) => (
            <ProgressBar
              key={skillIndex}
              skill={skill}
              delay={skillIndex * 100}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-background to-surface-dark">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and professional capabilities across various domains
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillsData.map((category, index) => (
            <SkillCard
              key={index}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* Technical Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-4 gap-6"
        >
          <div className="glass p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-primary mb-2">5+</div>
            <div className="text-muted-foreground">Projects Completed</div>
          </div>
          <div className="glass p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-accent mb-2">8+</div>
            <div className="text-muted-foreground">Technologies Used</div>
          </div>
          <div className="glass p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-neon-cyan mb-2">2+</div>
            <div className="text-muted-foreground">Internships</div>
          </div>
          <div className="glass p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-secondary mb-2">100%</div>
            <div className="text-muted-foreground">Passion for Learning</div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-8">
            Ready to bring your ideas to life with cutting-edge technology?
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-neon"
          >
            Let's Work Together
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;