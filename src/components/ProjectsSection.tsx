import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Filter } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: 'Ai-Resume-Analyzer',
    category: 'Web Application',
    tags: ['HTML', 'Python', 'CSS', 'JavaScript'],
    description: 'AI Resume Analyzer: Developed a web app that analyzes resumes, extracts key details, and provides AI-based feedback and scoring. ',
    longDescription: 'An AI-powered resume analysis web application that allows users to upload their resumes in various formats (PDF, DOCX, TXT). The app utilizes natural language processing (NLP) techniques to extract key information such as skills, experience, and education. It then provides users with AI-generated feedback on how to improve their resumes, along with a scoring system to evaluate their effectiveness. The user-friendly interface ensures a seamless experience across all devices.',
    image: 'https://i.postimg.cc/L6hS9BL6/Screenshot-2026-01-30-142946.png',
    technologies: ['Python', 'HTML5', 'CSS3', 'JavaScript', 'NLP', 'Streamlit', 'Scikit-learn'],
    liveUrl: 'https://resume-analyzer-hytt22b0m-sks-projects-df082d85.vercel.app/',
    githubUrl: 'https://github.com/Sathish292004/Resume-Analyzer'
  },
  {
    title: 'Meme-Generator-App',
    category: 'Web Application',
    tags: ['React.js', 'APIs', 'Vite'],
    description: 'Created a React-based meme generator to select templates, add custom text, and preview memes instantly',
    longDescription: 'A fun and interactive meme generator web application built using React.js and Vite, allowing users to choose trending meme templates and add custom top and bottom text. The app provides a real-time preview feature for instant meme creation and delivers a smooth, responsive experience across all devices with a clean and modern user interface.',
    image: 'https://i.postimg.cc/HW9nc2rM/277428171-b80b2277-8d3b-4f4f-bca4-9a7e810d51bb.png',
    technologies: ['React.js', 'Vite', 'JavaScript', 'CSS', 'Responsive Design'],
    liveUrl: 'https://meme-generator-a1q05nydq-sks-projects-df082d85.vercel.app/',
    githubUrl: 'https://github.com/Sathish292004/meme-generator'
  },
  {
    id: 3,
    title: 'ML-Model-Datasets-Using-Streamlits',
    category: 'Data Science',
    tags: ['Python', 'Scikit-learn', 'Data Analysis'],
    description: 'Built a Streamlit web app to explore ML datasets, visualize data insights, and apply machine learning models interactively.',
    longDescription: 'Created a Streamlit-based interactive app to explore machine learning datasets, visualize key insights, and test ML models with real-time results, improving understanding of data and model performance.',
    image: 'https://i.postimg.cc/t4cSyFy4/Screenshot-2026-01-31-221953.png',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    liveUrl: 'https://ml-model-project.streamlit.app/',
    githubUrl: 'https://github.com/Sathish292004/ML-Model-Using-Streamlits'
  }
];

const categories = ['All', 'Web Application', 'Mobile Application', 'Data Science'];

const ProjectModal = ({ project, isOpen, onClose }: any) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-surface-dark/50 rounded-full hover:bg-surface-dark transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-6">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm mb-2">
                  {project.category}
                </span>
                <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-lg">{project.longDescription}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 btn-neon"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-all duration-300"
                >
                  <Github size={16} />
                  View Code
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProjectCard = ({ project, onClick }: any) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-lg overflow-hidden cursor-pointer group"
      onClick={() => onClick(project)}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <div className="p-2 bg-primary/20 rounded-full">
              <ExternalLink size={16} className="text-primary" />
            </div>
            <div className="p-2 bg-secondary/20 rounded-full">
              <Github size={16} className="text-secondary" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs">
            {project.category}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-accent/20 text-accent rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredProjects = selectedCategory === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-surface-dark to-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore my portfolio of innovative web applications and digital solutions
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Filter size={20} />
            <span>Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground glow'
                    : 'bg-surface-dark/50 text-muted-foreground hover:bg-surface-dark hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onClick={setSelectedProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;