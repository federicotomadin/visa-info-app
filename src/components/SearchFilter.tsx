import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { VisaCategory } from '../types/visaTypes';

interface SearchFilterProps {
    onFilterChange: (filters: {
        categories: VisaCategory[];
        duration: string;
        canExtend: boolean | null;
        tags: string[];
        query: string;
    }) => void;
    allTags: string[];
}

export const SearchFilter = ({ onFilterChange, allTags }: SearchFilterProps) => {
    const [categories, setCategories] = useState<VisaCategory[]>([]);
    const [duration, setDuration] = useState('');
    const [canExtend, setCanExtend] = useState<boolean | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [query, setQuery] = useState('');

    const visaCategories: VisaCategory[] = [
        'Work',
        'Study',
        'Tourism/Business',
        'Investment',
        'Special'
    ];

    const handleCategoryChange = (category: VisaCategory) => {
        if (categories.includes(category)) {
            setCategories(categories.filter(c => c !== category));
        } else {
            setCategories([...categories, category]);
        }
    };

    const handleTagChange = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilterChange({
            categories,
            duration,
            canExtend,
            tags: selectedTags,
            query
        });
    };

    const handleReset = () => {
        setCategories([]);
        setDuration('');
        setCanExtend(null);
        setSelectedTags([]);
        setQuery('');
        onFilterChange({
            categories: [],
            duration: '',
            canExtend: null,
            tags: [],
            query: ''
        });
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Filter Visas</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Search by keywords</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter keywords..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Visa Categories</Form.Label>
                        <div>
                            {visaCategories.map((category) => (
                                <Form.Check
                                    key={category}
                                    type="checkbox"
                                    id={`category-${category}`}
                                    label={category}
                                    checked={categories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                    className="mb-2"
                                />
                            ))}
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Duration</Form.Label>
                        <Form.Select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}>
                            <option value="">Any duration</option>
                            <option value="short">Short-term (≤ 6 months)</option>
                            <option value="medium">Medium-term (≤ 2 years)</option>
                            <option value="long">Long-term ({'>'} 2 years)</option>
                            <option value="permanent">Path to permanent residency</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Extension Possibility</Form.Label>
                        <Form.Select
                            value={canExtend === null ? '' : canExtend.toString()}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '') {
                                    setCanExtend(null);
                                } else {
                                    setCanExtend(value === 'true');
                                }
                            }}
                        >
                            <option value="">Any</option>
                            <option value="true">Can be extended</option>
                            <option value="false">Cannot be extended</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tags (select up to 3)</Form.Label>
                        <div className="d-flex flex-wrap">
                            {allTags.slice(0, 15).map((tag) => (
                                <Button
                                    key={tag}
                                    variant={selectedTags.includes(tag) ? "primary" : "outline-primary"}
                                    size="sm"
                                    className="me-2 mb-2"
                                    onClick={() => handleTagChange(tag)}
                                    disabled={selectedTags.length >= 3 && !selectedTags.includes(tag)}
                                >
                                    {tag}
                                </Button>
                            ))}
                            {allTags.length > 15 && (
                                <Button variant="link" size="sm">More tags...</Button>
                            )}
                        </div>
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button variant="primary" type="submit">
                            Apply Filters
                        </Button>
                        <Button variant="outline-secondary" type="button" onClick={handleReset}>
                            Reset Filters
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};
