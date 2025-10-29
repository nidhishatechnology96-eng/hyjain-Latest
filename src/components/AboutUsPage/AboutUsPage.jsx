import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AboutUsSidebar from './AboutUsSidebar';
import AboutUsOverview from './AboutUsOverview';
import OurHeritage from './OurHeritage';
import OurVision from './OurVision';
import HyjainToday from './HyjainToday';
import CorporateSocialResponsibility from './CorporateSocialResponsibility';
import WhyHyjain from './WhyHyjain';
import Milestones from './Milestones';
import './AboutUs.css';

function AboutUsPage() {
    const [activeSection, setActiveSection] = useState('about');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleSectionChange = (newSection) => {
        if (newSection === activeSection) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveSection(newSection);
            setIsTransitioning(false);
            // Scroll to top of content card on section change
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'heritage': return <OurHeritage />;
            case 'vision': return <OurVision />;
            case 'today': return <HyjainToday />;
            case 'csr': return <CorporateSocialResponsibility />;
            case 'why': return <WhyHyjain />;
            case 'milestones': return <Milestones />;
            case 'about':
            default: return <AboutUsOverview onSectionChange={handleSectionChange} />;
        }
    };

    return (
        <div className="py-5">
            <Container>
                <Row className="g-5">
                    <Col lg={3} className="animate-slide-in-left">
                        <AboutUsSidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
                    </Col>
                    <Col lg={9} className="animate-slide-in-right">
                        <div className="content-card">
                            <div className={isTransitioning ? 'content-fade-out' : 'content-fade-in'}>
                                {renderContent()}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AboutUsPage;