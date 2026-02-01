import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Award, Briefcase } from 'lucide-react';

const timelineData = [
  {
    year: '2023',
    title: 'B.E. Computer Science and Engineering',
    company: 'KPR Institute of Engineering and Technology',
    description: 'Currently in final year, focusing on software development, machine learning, and real-world problem solving.',
    icon: Award,
    type: 'education'
  },
  {
    year: '2023',
    title: 'Machine Learning Intern',
    company: 'CodSoft',
    description: 'Built and deployed ML models using Python and libraries like scikit-learn. Worked on real-world datasets, gained hands-on exposure to industry workflows.',
    icon: Briefcase,
    type: 'work'
  },
  {
    year: '2023',
    title: 'Virtual Intern',
    company: 'Cisco',
    description: 'Focused on networking concepts, design, and troubleshooting. Developed solid understanding of network infrastructure and IT practices.',
    icon: Briefcase,
    type: 'work'
  },
  {
    year: '2020',
    title: 'Diploma in Mechanical Engineering',
    company: 'Kongu Velalar Polytechnic College',
    description: 'Completed diploma with strong foundation in engineering principles and problem-solving methodologies.',
    icon: Award,
    type: 'education'
  }
];

const TimelineItem = ({ item, index }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'text-primary';
      case 'education': return 'text-accent';
      case 'certification': return 'text-neon-cyan';
      default: return 'text-primary';
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'work': return 'bg-primary/20 border-primary';
      case 'education': return 'bg-accent/20 border-accent';
      case 'certification': return 'bg-neon-cyan/20 border-neon-cyan';
      default: return 'bg-primary/20 border-primary';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Content */}
      <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <motion.div
          className="glass p-6 rounded-lg"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
            <span className={`text-2xl font-bold ${getTypeColor(item.type)}`}>{item.year}</span>
            <Calendar size={20} className={getTypeColor(item.type)} />
          </div>
          
          <h3 className="text-xl font-semibold text-foreground mb-1">{item.title}</h3>
          <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
            <MapPin size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">{item.company}</span>
          </div>
          <p className="text-muted-foreground">{item.description}</p>
        </motion.div>
      </div>

      {/* Timeline Node */}
      <div className="relative">
        <motion.div
          className={`w-16 h-16 rounded-full border-4 ${getTypeBg(item.type)} flex items-center justify-center glass`}
          whileHover={{ scale: 1.1 }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
          <item.icon size={24} className={getTypeColor(item.type)} />
        </motion.div>

        {/* Vertical Line */}
        {index < timelineData.length - 1 && (
          <motion.div
            className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-primary to-accent"
            initial={{ height: 0 }}
            animate={isInView ? { height: 64 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
          />
        )}
      </div>

      {/* Empty space for alternating layout */}
      <div className="flex-1" />
    </motion.div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-background to-surface-dark">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm currently in my final year of Computer Science Engineering, and what excites me most is building software that actually solves real-world problems. Whether it's writing code in Java or Python, or bringing ideas to life through web development, I enjoy not just the technical part — but also working with people, sharing ideas, and growing together as a team.
          </p>
        </motion.div>

        {/* Personal Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-20"
        >
          <div className="glass p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <p className="text-muted-foreground">Final Year CSE Student</p>
          </div>

          <div className="glass p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Internships</h3>
            <p className="text-muted-foreground">ML & Networking Experience</p>
          </div>

          <div className="glass p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="text-neon-cyan" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Focus</h3>
            <p className="text-muted-foreground">Real-World Solutions</p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl font-bold text-center mb-16"
          >
            My <span className="gradient-text">Journey</span>
          </motion.h3>

          <div className="relative">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Skills Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-8">
            My expertise spans across modern web technologies, cloud platforms, and development best practices.
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#skills');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-neon"
          >
            View My Skills
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;