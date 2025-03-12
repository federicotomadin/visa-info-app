import { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useVisaData } from '../hooks/useVisaData';
import { VisaCard } from '../components/VisaCard';
import { updateMetaTags, generateStructuredData, addStructuredDataToPage } from '../utils/seoUtils';
import { VisaInfo } from '../types/visaTypes';

export const HomePage = () => {
    const { visas, categories, loading, error } = useVisaData();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [featuredVisas, setFeaturedVisas] = useState<VisaInfo[]>([]);

    useEffect(() => {
        // Set page metadata
        updateMetaTags(
            'US Visa Guide - Comprehensive Information on U.S. Visas',
            'Find detailed information about U.S. visa types, requirements, application processes, and eligibility criteria.',
            ['visa information', 'U.S. visa guide', 'immigration help', 'visa requirements']
        );

        // Add structured data for SEO
        const structuredData = generateStructuredData('WebPage', {
            'description': 'Comprehensive guide to U.S. visa types, requirements, and application processes',
            'mainEntityOfPage': {
                '@type': 'WebPage',
                '@id': window.location.href
            }
        });

        addStructuredDataToPage(structuredData);

        // Select featured visas (most popular or diverse set)
        if (visas.length > 0) {
            // Get one visa from each category if possible
            const featuredByCategory = new Map<string, VisaInfo>();

            visas.forEach(visa => {
                if (!featuredByCategory.has(visa.category) || Math.random() > 0.7) {
                    featuredByCategory.set(visa.category, visa);
                }
            });

            // Convert map values to array and limit to 6 items
            setFeaturedVisas(Array.from(featuredByCategory.values()).slice(0, 6));
        }
    }, [visas]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    if (loading) {
        return <div className="text-center my-5">Loading visa information...</div>;
    }

    if (error) {
        return <div className="alert alert-danger my-5">{error}</div>;
    }

    return (
        <>
            {/* Hero Section */}
            <div className="hero-section text-center rounded">
                <h1>Find the Right U.S. Visa for Your Needs</h1>
                <p className="lead mb-4">
                    Comprehensive information on U.S. visa types, requirements, and application processes
                </p>

                <Form onSubmit={handleSearch} className="search-box mx-auto" style={{ maxWidth: '600px' }}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Search for visa types, requirements, or keywords..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            size="lg"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" size="lg">
                        Search Visas
                    </Button>
                </Form>
            </div>

            {/* Visa Categories Section */}
            <section className="my-5">
                <h2 className="mb-4">Visa Categories</h2>
                <Row>
                    {categories.map((category) => (
                        <Col key={category} md={4} className="mb-4">
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{category} Visas</Card.Title>
                                    <Card.Text>
                                        {category === 'Work' && 'For professionals, specialized workers, and those with job offers in the U.S.'}
                                        {category === 'Study' && 'For students pursuing academic or vocational education in the U.S.'}
                                        {category === 'Tourism/Business' && 'For temporary visitors for tourism, business, or medical treatment.'}
                                        {category === 'Investment' && 'For investors and entrepreneurs establishing businesses in the U.S.'}
                                        {category === 'Special' && 'For unique situations including fiancé(e)s, victims of crimes, and other special cases.'}
                                    </Card.Text>
                                    <div className="mt-auto">
                                        <Link to={`/category/${category}`} className="btn btn-outline-primary">
                                            Explore {category} Visas
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>

            {/* Featured Visas Section */}
            <section className="my-5">
                <h2 className="mb-4">Featured Visa Types</h2>
                <Row>
                    {featuredVisas.map((visa) => (
                        <Col key={visa.id} md={4} className="mb-4">
                            <VisaCard visa={visa} />
                        </Col>
                    ))}
                </Row>
                <div className="text-center mt-4">
                    <Link to="/search" className="btn btn-primary">View All Visa Types</Link>
                </div>
            </section>

            {/* Quick Resources Section */}
            <section className="my-5">
                <h2 className="mb-4">Quick Resources</h2>
                <Row>
                    <Col md={4} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Official Government Resources</Card.Title>
                                <Card.Text>
                                    Links to official U.S. government websites for visa applications, forms, and information.
                                </Card.Text>
                                <Link to="/faq" className="btn btn-outline-primary">View Resources</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Frequently Asked Questions</Card.Title>
                                <Card.Text>
                                    Answers to common questions about U.S. visas, application processes, and requirements.
                                </Card.Text>
                                <Link to="/faq" className="btn btn-outline-primary">Read FAQs</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Visa Comparison Tool</Card.Title>
                                <Card.Text>
                                    Compare different visa types side by side to find the best option for your situation.
                                </Card.Text>
                                <Link to="/search" className="btn btn-outline-primary">Compare Visas</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>
        </>
    );
};
