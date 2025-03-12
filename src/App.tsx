import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import VisaCategoryPage from './pages/VisaCategoryPage';
import { VisaDetailPage } from './pages/VisaDetailPage';
import { SearchPage } from './pages/SearchPage';
import { FaqPage } from './pages/FaqPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
    return (
        <Router basename="/us-visa-guide">
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <Container fluid className="flex-grow-1 my-4 px-md-4 px-lg-5">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/category/:category" element={<VisaCategoryPage />} />
                        <Route path="/visa/:id" element={<VisaDetailPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/faq" element={<FaqPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Container>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
