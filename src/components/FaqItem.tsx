import { Accordion } from 'react-bootstrap';
import { FAQ } from '../types/visaTypes';

interface FaqItemProps {
    faq: FAQ;
    index: number;
}

export const FaqItem = ({ faq, index }: FaqItemProps) => {

    return (
        <Accordion className="mb-3">
            <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body>
                    {faq.answer}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};
