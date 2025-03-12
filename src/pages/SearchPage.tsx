import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Alert } from 'react-bootstrap';

import { useVisaData } from '../hooks/useVisaData';
import { SearchFilter } from '../components/SearchFilter';
import { VisaCard } from '../components/VisaCard';
import { updateMetaTags } from '../utils/seoUtils';
import { VisaInfo, VisaCategory } from '../types/visaTypes';

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get('query') || '';

    const { filterVisas, getAllTags, visas, loading, error } = useVisaData();
    const [filteredVisas, setFilteredVisas] = useState<VisaInfo[]>([]);
    const [activeFilters, setActiveFilters] = useState({
        categories: [] as VisaCategory[],
        duration: '',
        canExtend: null as boolean | null,
        tags: [] as string[],
        query: initialQuery
    });

    useEffect(() => {
        // Set page metadata
        updateMetaTags(
            'Search U.S. Visas | US Visa Guide',
            'Search and filter U.S. visa types based on your requirements and eligibility.',
            ['visa search', 'compare visas', 'visa filter', 'find visa']
        );

        // Apply initial filters
        if (!loading && !error) {
            const filtered = filterVisas(activeFilters);
            setFilteredVisas(filtered);
        }
    }, [loading, error, visas, filterVisas, activeFilters.query]); // Only re-filter when these dependencies change

    const handleFilterChange = (filters: any) => {
        setActiveFilters(filters);
        const filtered = filterVisas(filters);
        setFilteredVisas(filtered);
    };

    if (loading) {
        return <div className="text-center my-5">Loading visa information...</div>;
    }

    if (error) {
        return <div className="alert alert-danger my-5">{error}</div>;
    }

    return (
        <>
            <h1 className="mb-4">Search and Compare U.S. Visas</h1>

            <Row>
                <Col lg={3} className="mb-4">
                    <SearchFilter
                        onFilterChange={handleFilterChange}
                        allTags={getAllTags()}
                    />
                </Col>

                <Col lg={9}>
                    {activeFilters.query && (
                        <Alert variant="info" className="mb-4">
                            Showing results for: <strong>{activeFilters.query}</strong>
                            {(activeFilters.categories.length > 0 ||
                                    activeFilters.tags.length > 0 ||
                                    activeFilters.duration ||
                                    activeFilters.canExtend !== null) &&
                                ' with applied filters'}
                        </Alert>
                    )}

                    {filteredVisas.length > 0 ? (
                        <>
                            <p className="mb-4">Found {filteredVisas.length} visa types matching your criteria:</p>
                            <Row>
                                {filteredVisas.map((visa) => (
                                    <Col key={visa.id} md={6} lg={4} className="mb-4">
                                        <VisaCard visa={visa} />
                                    </Col>
                                ))}
                            </Row>
                        </>
                    ) : (
                        <Alert variant="warning">
                            <p className="mb-2">No visas match your search criteria.</p>
                            <p className="mb-0">Try adjusting your filters or search terms.</p>
                        </Alert>
                    )}
                </Col>
            </Row>
        </>
    );
};
