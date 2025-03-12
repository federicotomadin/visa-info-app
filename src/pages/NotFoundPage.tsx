import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { updateMetaTags } from '../utils/seoUtils';

export const NotFoundPage = () => {
    useEffect(() => {
        // Set page metadata
        updateMetaTags(
            'Page Not Found | US Visa Guide',
            'The page you are looking for does not exist or has been moved.',
            ['404', 'page not found', 'error']
        );
    }, []);

    return (
        <Container className="text-center py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h1 className="display-1 text-primary mb-4">404</h1>
                    <h2 className="mb-4">Page Not Found</h2>
                    <p className="lead mb-5">
                        The page you are looking for doesn't exist or has been moved. Please check the URL or navigate back to the homepage.
                    </p>
                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                        <Button as={Link as any} to="/" variant="primary" size="lg">
                            Go to Homepage
                        </Button>
                        <Button as={Link as any} to="/search" variant="outline-secondary" size="lg">
                            Search Visas
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
