import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InternationalBusinessSidebar from './InternationalBusinessSidebar';
import GetInTouchForm from './GetInTouchForm';
import WhatsNew from './WhatsNew';
import InternationalBusiness from './InternationalBusiness';
import './InternationalPage.css'; 

function InternationalPage() {
    const [activeSection, setActiveSection] = useState('business');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleSectionChange = (newSection) => {
        if (newSection === activeSection) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveSection(newSection);
            setIsTransitioning(false);
        }, 300);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'get-in-touch':
                return <GetInTouchForm />;
            case 'whats-new':
                return <WhatsNew />;
            case 'business':
            default:
                // ✅ Pass the function down as a prop here
                return <InternationalBusiness onEnquireNow={handleSectionChange} />;
        }
    };

    return (
        <div className="bg-light py-5">
            <Container>
                <Row className="g-4">
                    <Col lg={3} className="animate-slide-in-left">
                        <InternationalBusinessSidebar 
                            activeSection={activeSection} 
                            onSectionChange={handleSectionChange} 
                        />
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

export default InternationalPage;