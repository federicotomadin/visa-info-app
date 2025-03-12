import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useVisaData } from '../hooks/useVisaData';
import { VisaCard } from '../components/VisaCard';
import { updateMetaTags, generateStructuredData, addStructuredDataToPage } from '../utils/seoUtils';
import { VisaCategory } from '../types/visaTypes';

const VisaCategoryPage = () => {
    const { category } = useParams<{ category: string }>();
    const { getVisasByCategory, categories, loading, error } = useVisaData();

    // Validate the category parameter
    const validCategory = category && categories.includes(category as VisaCategory)
        ? (category as VisaCategory)
        : null;

    // Get visas for this category
    const visas = validCategory ? getVisasByCategory(validCategory) : [];

    // Helper function to get category description
    const getCategoryDescription = (cat: VisaCategory): string => {
        switch(cat) {
            case 'Work':
                return 'Work visas allow foreign nationals to work in the United States temporarily or permanently. These visas typically require sponsorship from a U.S. employer.';
            case 'Study':
                return 'Study visas enable international students to pursue academic or vocational education at U.S. institutions. These visas have specific requirements regarding enrollment and academic progress.';
            case 'Tourism/Business':
                return 'Tourism and business visas allow for temporary visits to the United States for leisure, tourism, medical treatment, or business activities like meetings and conferences.';
            case 'Investment':
                return 'Investment visas are designed for individuals who invest capital in U.S. businesses, potentially creating jobs for U.S. workers. These visas can lead to permanent residency in some cases.';
            case 'Special':
                return 'Special visa categories cover unique situations such as fiancé(e)s of U.S. citizens, victims of certain crimes, and other special circumstances not covered by standard visa categories.';
            default:
                return '';
        }
    };

    useEffect(() => {
        if (validCategory) {
            // Set page metadata
            updateMetaTags(
                `${validCategory} Visas | US Visa Guide`,
                `Information about ${validCategory} visas for the United States, including requirements, eligibility, and application process.`,
                [`${validCategory} visa`, 'US immigration', `${validCategory} permit`, 'visa requirements']
            );

            // Add structured data for SEO
            const structuredData = generateStructuredData('WebPage', {
                'description': `Comprehensive guide to U.S. ${validCategory} visa types, requirements, and application processes`,
                'mainEntityOfPage': {
                    '@type': 'WebPage',
                    '@id': window.location.href
                }
            });

            addStructuredDataToPage(structuredData);
        }
    }, [validCategory]);

    // Redirect if category is invalid
    if (!loading && !error && !validCategory) {
        return <Navigate to="/404" />;
    }

    if (loading) {
        return <div className="text-center my-5">Loading visa information...</div>;
    }

    if (error) {
        return <div className="alert alert-danger my-5">{error}</div>;
    }

    return (
        <>
            <Breadcrumb className="mb-4">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
                <Breadcrumb.Item active>{validCategory} Visas</Breadcrumb.Item>
            </Breadcrumb>

            <div className="mb-5">
                <h1>{validCategory} Visas</h1>
                <p className="lead">{validCategory && getCategoryDescription(validCategory)}</p>
            </div>

            {visas.length > 0 ? (
                <Row>
                    {visas.map((visa) => (
                        <Col key={visa.id} md={4} className="mb-4">
                            <VisaCard visa={visa} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="alert alert-info">
                    No visas found in this category. Please check back later.
                </div>
            )}
        </>
    );
};

export default VisaCategoryPage;
