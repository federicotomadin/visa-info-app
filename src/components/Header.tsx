import { useState } from 'react';
import { Navbar, Nav, Container, Form, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <Navbar className="custom-navbar" expand="lg" sticky="top" variant="dark">
            <Container fluid className="px-md-4 px-lg-5">
                <Navbar.Brand as={Link} to="/">
                    <img
                        src='./us.png'
                        width="30"
                        height="30"
                        className="d-inline-block align-top me-2"
                        alt="US Visa Guide logo"
                    />
                    US Visa Guide
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <NavDropdown title="Visa Categories" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/category/Work">Work Visas</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/Study">Study Visas</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/Tourism/Business">Tourism & Business</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/Investment">Investment Visas</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/Special">Special Visas</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/faq">FAQs & Resources</Nav.Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search for visas..."
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-light" type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
