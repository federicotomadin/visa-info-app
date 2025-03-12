import { useEffect } from 'react';
import { Row, Col, Card, Accordion, ListGroup } from 'react-bootstrap';
import { updateMetaTags, generateStructuredData, addStructuredDataToPage } from '../utils/seoUtils';

export const FaqPage = () => {
    useEffect(() => {
        // Set page metadata
        updateMetaTags(
            'Frequently Asked Questions | US Visa Guide',
            'Find answers to common questions about U.S. visas, application processes, and requirements.',
            ['visa FAQ', 'visa questions', 'visa resources', 'visa help']
        );

        // Create FAQs for structured data
        const faqsData = {
            '@type': 'FAQPage',
            'mainEntity': generalFaqs.map(faq => ({
                '@type': 'Question',
                'name': faq.question,
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': faq.answer
                }
            }))
        };

        // Add structured data for SEO
        const structuredData = generateStructuredData('FAQPage', faqsData);
        addStructuredDataToPage(structuredData);
    }, []);

    // General FAQ data
    const generalFaqs = [
        {
            question: "What is the difference between an immigrant and nonimmigrant visa?",
            answer: "An immigrant visa is for people who intend to live permanently in the United States, while a nonimmigrant visa is for temporary visits for specific purposes such as tourism, business, temporary work, or study."
        },
        {
            question: "How long does the visa application process take?",
            answer: "Processing times vary significantly depending on the visa type, your country of application, and current processing backlogs. It can range from a few weeks to several months or even years for certain visa categories. Check the U.S. Department of State website for current processing times."
        },
        {
            question: "Can I expedite my visa application?",
            answer: "Some visa categories offer premium processing for an additional fee. For other categories, expedited processing may be available in emergency situations such as medical emergencies, humanitarian reasons, or U.S. government interests. Contact your nearest U.S. embassy or consulate for details."
        },
        {
            question: "What happens if my visa application is denied?",
            answer: "If your visa application is denied, you will receive a reason for the denial. Depending on the reason, you may be able to apply again with additional documentation or address the specific concern. In some cases, you may need to wait before reapplying or apply for a waiver."
        },
        {
            question: "Can I work in the U.S. on any visa?",
            answer: "No, you can only work in the U.S. if you have a specific work visa or another visa category that permits employment. Working without authorization can result in serious immigration consequences including removal from the U.S. and future ineligibility for visas."
        },
        {
            question: "How do I check my visa status?",
            answer: "You can check the status of your visa application on the CEAC (Consular Electronic Application Center) website if you applied for a nonimmigrant visa, or the NVC (National Visa Center) if you applied for an immigrant visa. You'll need your application number to check the status."
        },
        {
            question: "Can I change my visa status while in the U.S.?",
            answer: "In many cases, yes. If you're already in the U.S. on a valid visa, you may be eligible to change to a different nonimmigrant status by filing Form I-539 with USCIS. However, not all visa categories allow for changes of status, and you must maintain legal status while the change of status application is pending."
        },
        {
            question: "Do I need a visa if I'm just transiting through the U.S.?",
            answer: "In most cases, yes. Even if you're just passing through the U.S. to another destination, you typically need a transit visa (C visa) or a visitor visa (B visa), unless you qualify for the Visa Waiver Program or another exemption."
        }
    ];

    // Official resources data
    const officialResources = [
        {
            name: "U.S. Department of State - Bureau of Consular Affairs",
            description: "Official source for visa information, application forms, and procedures",
            link: "https://travel.state.gov/content/travel/en/us-visas.html"
        },
        {
            name: "U.S. Citizenship and Immigration Services (USCIS)",
            description: "Information on immigration benefits, forms, and status changes",
            link: "https://www.uscis.gov/"
        },
        {
            name: "U.S. Customs and Border Protection (CBP)",
            description: "Information about entering the United States and admission procedures",
            link: "https://www.cbp.gov/"
        },
        {
            name: "U.S. Department of Labor",
            description: "Information on labor certification for employment-based visas",
            link: "https://www.dol.gov/agencies/eta/foreign-labor"
        },
        {
            name: "Student and Exchange Visitor Program (SEVP)",
            description: "Information for international students and exchange visitors",
            link: "https://www.ice.gov/sevis"
        },
        {
            name: "CEAC - Consular Electronic Application Center",
            description: "Online visa application portal and status checking",
            link: "https://ceac.state.gov/ceacstattracker/status.aspx"
        }
    ];

    return (
        <>
            <h1 className="mb-4">Frequently Asked Questions & Resources</h1>

            <Row className="mb-5">
                <Col>
                    <Card>
                        <Card.Header as="h2">General Visa Questions</Card.Header>
                        <Card.Body>
                            <Accordion>
                                {generalFaqs.map((faq, index) => (
                                    <Accordion.Item eventKey={index.toString()} key={index}>
                                        <Accordion.Header>{faq.question}</Accordion.Header>
                                        <Accordion.Body>{faq.answer}</Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col md={6}>
                    <Card className="h-100">
                        <Card.Header as="h2">Official Resources</Card.Header>
                        <ListGroup variant="flush">
                            {officialResources.map((resource, index) => (
                                <ListGroup.Item key={index}>
                                    <h5>
                                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                            {resource.name}
                                        </a>
                                    </h5>
                                    <p className="mb-0 text-muted">{resource.description}</p>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="h-100">
                        <Card.Header as="h2">Important Notes</Card.Header>
                        <Card.Body>
                            <h5>Always Consult Official Sources</h5>
                            <p>
                                This website provides general information about U.S. visas. For the most accurate and up-to-date
                                information, always consult official U.S. government websites or contact the nearest U.S. embassy or consulate.
                            </p>

                            <h5>Legal Advice Disclaimer</h5>
                            <p>
                                The information on this website does not constitute legal advice. Immigration laws and policies can be complex
                                and change frequently. Consider consulting with a qualified immigration attorney for advice specific to your situation.
                            </p>

                            <h5>Application Requirements</h5>
                            <p>
                                Visa application requirements, processing times, and fees are subject to change. Always verify the
                                current requirements before submitting your application.
                            </p>

                            <h5>Fraud Warning</h5>
                            <p>
                                Be cautious of fraudulent websites or services claiming to provide U.S. visas or expedited processing.
                                Official visa applications can only be processed through U.S. embassies, consulates, or authorized
                                government agencies.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
