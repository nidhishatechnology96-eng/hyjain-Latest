import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './People.css';

const heroImage = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop';
const careerPathsImage = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop';
const lifeAtHyjainImage = 'https://images.unsplash.com/photo-1622258415402-d6f597973b03?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const skillsImage = 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070&auto=format&fit=crop';

function People() {
  // ✅ Refactored state for cleaner management
  const [expanded, setExpanded] = useState({
    careers: false,
    life: false,
    skills: false,
  });

  const toggleExpand = (section) => {
    setExpanded(prevState => ({ ...prevState, [section]: !prevState[section] }));
  };

  // Animation variants for sections appearing on scroll
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  // Animation variants for the expandable content
  const contentVariants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] } // easeOutExpo
    }
  };

  return (
    <div>
      <header className="people-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          A Home to Grow
        </motion.h1>
      </header>

      <div className="container people-content-container">
        <motion.div 
          className="people-intro"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2>Careers</h2>
          <p>
            Welcome to the core of our team, where passion meets purpose. At HYJAIN, we believe that our people are our greatest asset. We are committed to creating a work environment where every team member feels valued, respected, and empowered to contribute their best. Discover how you can grow with us, as we continue to innovate.
          </p>
        </motion.div>
      </div>

      {/* --- Career Paths Section --- */}
      <motion.section 
        className="feature-section bg-light-beige"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container"><div className="row align-items-center">
          <div className="col-md-6 feature-text">
            <h3>Career Paths</h3>
            <p>Explore diverse opportunities across departments—from sustainable agriculture to quality control and marketing. We provide the tools and mentorship for you to build a rewarding career.</p>
            <AnimatePresence>
              {expanded.careers && (
                <motion.div variants={contentVariants} initial="collapsed" animate="expanded" exit="collapsed" className="expanded-content">
                  <p>Whether you're an agronomist, data scientist, marketing specialist, or logistics expert, HYJAIN offers clear pathways for advancement. We champion internal mobility and provide leadership training programs to help you reach your full potential.</p>
                  <p>Our roles span across research & development, sustainable farming operations, supply chain management, and customer relations, ensuring a fit for a wide range of talents and ambitions.</p>
                </motion.div>
              )}
            </AnimatePresence>
            <button onClick={() => toggleExpand('careers')} className="btn-outline-maroon">
              {expanded.careers ? '← Read less' : 'Read more →'}
            </button>
          </div>
          <div className="col-md-6">
            <img src={careerPathsImage} alt="Career Paths at HYJAIN" className="feature-image" />
          </div>
        </div></div>
      </motion.section>

      {/* --- Life at HYJAIN Section --- */}
      <motion.section 
        className="feature-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container"><div className="row align-items-center">
          <div className="col-md-6 order-md-2 feature-text">
            <h3>Life at HYJAIN</h3>
            <p>Join a vibrant culture of collaboration, innovation, and mutual respect. We believe in work-life balance and fostering a community where everyone can thrive.</p>
            <AnimatePresence>
              {expanded.life && (
                <motion.div variants={contentVariants} initial="collapsed" animate="expanded" exit="collapsed" className="expanded-content">
                    <p><strong>Community & Connection:</strong> We foster a strong sense of community through regular team-building events, annual company retreats, and collaborative projects that break down departmental silos.</p>
                    <p><strong>Wellness & Balance:</strong> Your well-being is paramount. We offer flexible work arrangements, comprehensive wellness programs, and encourage a healthy work-life balance.</p>
                </motion.div>
              )}
            </AnimatePresence>
            <button onClick={() => toggleExpand('life')} className="btn-outline-maroon">
              {expanded.life ? '← Read less' : 'Read more →'}
            </button>
          </div>
          <div className="col-md-6 order-md-1">
            <img src={lifeAtHyjainImage} alt="Team collaboration" className="feature-image" />
          </div>
        </div></div>
      </motion.section>
      
      {/* --- Develop Skills Section --- */}
      <motion.section 
        className="feature-section bg-light-beige"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container"><div className="row align-items-center">
          <div className="col-md-6 feature-text">
            <h3>Develop Your Skills</h3>
            <p>We invest in our team's growth through continuous learning programs, workshops, and opportunities to take on new challenges. Your development is our priority.</p>
            <AnimatePresence>
              {expanded.skills && (
                <motion.div variants={contentVariants} initial="collapsed" animate="expanded" exit="collapsed" className="expanded-content">
                    <p><strong>Continuous Learning:</strong> Gain access to a vast library of online courses, attend industry-leading conferences, and participate in specialized workshops. We sponsor certifications to keep your skills sharp.</p>
                    <p><strong>Mentorship Program:</strong> Connect with experienced leaders within the company who can guide your career journey, offer valuable insights, and help you navigate new challenges.</p>
                </motion.div>
              )}
            </AnimatePresence>
            <button onClick={() => toggleExpand('skills')} className="btn-outline-maroon">
              {expanded.skills ? '← Read less' : 'Read more →'}
            </button>
          </div>
          <div className="col-md-6">
            <img src={skillsImage} alt="Skill development" className="feature-image" />
          </div>
        </div></div>
      </motion.section>

    </div>
  );
}

export default People;