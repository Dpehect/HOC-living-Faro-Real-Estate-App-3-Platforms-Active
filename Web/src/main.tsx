import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ListPage from './pages/list-page.js';
import SinglePage from './pages/details-page.js';
import ContactPage from './pages/contact-page.js';
import JoinPage from './pages/join-page.js';
import FranchisePage from './pages/franchise-page.js';
import HomeValuePage from './pages/home-value-page.js';
import SellPage from './pages/sell-page.js';
import FaqPage from './pages/faq-page.js';
import TermsPage from './pages/terms-page.js';
import PrivacyPage from './pages/privacy-page.js';
import ExpertsPage from './pages/experts-page.js';
import BlogPage from './pages/blog-page.js';
import SitemapPage from './pages/sitemap-page.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{ path: '/', element: <App /> },
	{ path: '/listings', element: <ListPage /> },
	{ path: '/details/:id', element: <SinglePage /> },
	{ path: '/contact', element: <ContactPage /> },
	{ path: '/join', element: <JoinPage /> },
	{ path: '/franchise', element: <FranchisePage /> },
	{ path: '/home-value', element: <HomeValuePage /> },
	{ path: '/sell', element: <SellPage /> },
	{ path: '/faq', element: <FaqPage /> },
	{ path: '/terms', element: <TermsPage /> },
	{ path: '/privacy', element: <PrivacyPage /> },
	{ path: '/experts', element: <ExpertsPage /> },
	{ path: '/blog', element: <BlogPage /> },
	{ path: '/sitemap', element: <SitemapPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);
