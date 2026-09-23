import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import {
  Article,
  Careers,
  Role,
  Community,
  Company,
  Contact,
  Developers,
  Ecosystem,
  Legal,
  News,
  ProductPage,
  Products,
  Technology,
  Tokenization,
} from "./pages/Pages.jsx";
import { PrivacyPolicy, TermsOfService } from "./pages/LegalDocs.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductPage />} />
        <Route path="tokenization" element={<Tokenization />} />
        <Route path="technology" element={<Technology />} />
        <Route path="ecosystem" element={<Ecosystem />} />
        <Route path="developers" element={<Developers />} />
        <Route path="community" element={<Community />} />
        <Route path="news" element={<News />} />
        <Route path="news/:slug" element={<Article />} />
        <Route path="careers" element={<Careers />} />
        <Route path="careers/:slug" element={<Role />} />
        <Route path="company" element={<Company />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="blog" element={<Navigate to="/news" replace />} />
        <Route path="blog/:slug" element={<Navigate to="/news" replace />} />
        <Route path="*" element={<Legal title="Page not found" body="That path is not on this site. Use the navigation to return to products, tokenization, or the homepage." />} />
      </Route>
    </Routes>
  );
}
