import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { VisaInfo } from '../types/visaTypes';

interface VisaCardProps {
    visa: VisaInfo;
}

export const VisaCard = ({ visa }: VisaCardProps) => {
    return (
        <Card className="h-100 visa-card">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge className={`visa-category-${visa.category}`}>{visa.category}</Badge>
                    <span className="fw-bold text-primary">{visa.code}</span>
                </div>
                <Card.Title>{visa.name}</Card.Title>
                <Card.Text>{visa.summary}</Card.Text>
                <div className="d-flex flex-wrap mb-3">
                    {visa.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                    {visa.tags.length > 3 && <span className="tag">+{visa.tags.length - 3} more</span>}
                </div>
            </Card.Body>
            <Card.Footer className="bg-white border-top-0">
                <Link to={`/visa/${visa.id}`} className="btn btn-primary w-100">View Details</Link>
            </Card.Footer>
        </Card>
    );
};
