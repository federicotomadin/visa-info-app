import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer bg-dark text-white py-4">
            <Container>
                <Row>
                    <Col md={4} className="mb-3 mb-md-0">
                        <h5>US Visa Guide</h5>
                        <p className="text-muted">
                            A comprehensive resource for U.S. visa information. This website is for informational purposes only and is not legal advice.
                        </p>
                    </Col>
                    <Col md={3} className="mb-3 mb-md-0">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-decoration-none text-light">Home</Link></li>
                            <li><Link to="/category/Work" className="text-decoration-none text-light">Work Visas</Link></li>
                            <li><Link to="/category/Study" className="text-decoration-none text-light">Study Visas</Link></li>
                            <li><Link to="/category/Tourism/Business" className="text-decoration-none text-light">Tourism & Business</Link></li>
                            <li><Link to="/category/Investment" className="text-decoration-none text-light">Investment Visas</Link></li>
                            <li><Link to="/category/Special" className="text-decoration-none text-light">Special Visas</Link></li>
                        </ul>
                    </Col>
                    <Col md={3} className="mb-3 mb-md-0">
                        <h5>Official Resources</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="https://travel.state.gov/content/travel/en/us-visas.html" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-light">
                                    U.S. Department of State
                                </a>
                            </li>
                            <li>
                                <a href="https://www.uscis.gov/" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-light">
                                    U.S. Citizenship and Immigration Services
                                </a>
                            </li>
                            <li>
                                <a href="https://www.cbp.gov/" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-light">
                                    U.S. Customs and Border Protection
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={2}>
                        <h5>Legal</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/terms" className="text-decoration-none text-light">Terms of Use</Link></li>
                            <li><Link to="/privacy" className="text-decoration-none text-light">Privacy Policy</Link></li>
                            <li><Link to="/disclaimer" className="text-decoration-none text-light">Disclaimer</Link></li>
                        </ul>
                    </Col>
                </Row>
                <hr className="my-3 bg-secondary" />
                <Row>
                    <Col className="text-center text-muted">
                        <small>&copy; {currentYear} US Visa Guide. All rights reserved.</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
