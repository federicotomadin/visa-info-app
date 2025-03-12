import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Row, Col, Card, Badge, Breadcrumb, Table, Alert } from 'react-bootstrap';

import { useVisaData } from '../hooks/useVisaData';
import { FaqItem } from '../components/FaqItem';
import { updateMetaTags, generateStructuredData, addStructuredDataToPage } from '../utils/seoUtils';

export const VisaDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { getVisaById, loading, error } = useVisaData();

    const visa = id ? getVisaById(id) : undefined;

    useEffect(() => {
        if (visa) {
            // Set page metadata
            updateMetaTags(
                `${visa.name} (${visa.code}) | US Visa Guide`,
                `Information about the ${visa.name} visa, including eligibility requirements, application process, and frequently asked questions.`,
                [visa.code, visa.name, ...visa.tags, 'visa requirements', 'US immigration']
            );

            // Generate FAQs structured data
            const faqsData = {
                '@type': 'FAQPage',
                'mainEntity': visa.faqs.map(faq => ({
                    '@type': 'Question',
                    'name': faq.question,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': faq.answer
                    }
                }))
            };

            // Add structured data for SEO
            const structuredData = generateStructuredData('Article', {
                'headline': `${visa.name} (${visa.code})`,
                'description': visa.summary,
                'keywords': visa.tags.join(', '),
                'articleSection': visa.category,
                'mainEntityOfPage': {
                    '@type': 'WebPage',
                    '@id': window.location.href
                },
                'hasPart': faqsData
            });

            addStructuredDataToPage(structuredData);
        }
    }, [visa]);

    if (loading) {
        return <div className="text-center my-5">Loading visa information...</div>;
    }

    if (error) {
        return <div className="alert alert-danger my-5">{error}</div>;
    }

    if (!visa) {
        return <Navigate to="/404" />;
    }

    return (
        <>
            <Breadcrumb className="mb-4">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/category/${visa.category}` }}>
                    {visa.category} Visas
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{visa.code} - {visa.name}</Breadcrumb.Item>
            </Breadcrumb>

            <Row className="mb-5">
                <Col>
                    <h1>
                        {visa.name}
                        <span className="ms-2">
              <Badge bg="primary">{visa.code}</Badge>
            </span>
                    </h1>
                    <div className="mb-3">
                        <Badge className={`visa-category-${visa.category} me-2`}>{visa.category}</Badge>
                        {visa.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>
                    <p className="lead">{visa.summary}</p>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col md={8}>
                    <Card className="mb-4">
                        <Card.Header as="h2">Overview</Card.Header>
                        <Card.Body>
                            <p>{visa.description}</p>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Header as="h2">Eligibility</Card.Header>
                        <Card.Body>
                            <ul className="mb-0">
                                {visa.eligibility.map((item, index) => (
                                    <li key={index} className="mb-2">{item}</li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Header as="h2">Requirements</Card.Header>
                        <Card.Body>
                            <ul className="requirements-list">
                                {visa.requirements.map((req, index) => (
                                    <li key={index}>
                                        <h5>{req.title}</h5>
                                        <p className="mb-0">{req.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Header as="h2">Frequently Asked Questions</Card.Header>
                        <Card.Body>
                            {visa.faqs.map((faq, index) => (
                                <FaqItem key={index} faq={faq} index={index} />
                            ))}
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Header as="h3">Key Information</Card.Header>
                        <Card.Body>
                            <Table borderless size="sm">
                                <tbody>
                                <tr>
                                    <th>Duration:</th>
                                    <td>{visa.duration}</td>
                                </tr>
                                <tr>
                                    <th>Can Extend:</th>
                                    <td>{visa.canExtend ? 'Yes' : 'No'}</td>
                                </tr>
                                {visa.extendInfo && (
                                    <tr>
                                        <th>Extension Info:</th>
                                        <td>{visa.extendInfo}</td>
                                    </tr>
                                )}
                                <tr>
                                    <th>Processing Time:</th>
                                    <td>{visa.processingTime}</td>
                                </tr>
                                <tr>
                                    <th>Application Fee:</th>
                                    <td>{visa.applicationFee}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Header as="h3">Official Resources</Card.Header>
                        <Card.Body>
                            <a
                                href={visa.officialLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary d-block mb-3"
                            >
                                Official USCIS/State Dept. Page
                            </a>
                            <Alert variant="info">
                                <small>
                                    Always refer to official government sources for the most up-to-date information
                                    regarding application procedures and requirements.
                                </small>
                            </Alert>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header as="h3">Related Visas</Card.Header>
                        <Card.Body>
                            <Link to={`/category/${visa.category}`} className="btn btn-outline-primary d-block mb-2">
                                Other {visa.category} Visas
                            </Link>
                            <Link to="/search" className="btn btn-outline-secondary d-block">
                                Compare Visa Types
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
