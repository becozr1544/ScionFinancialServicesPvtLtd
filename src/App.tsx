import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import PersonalLoanPage from "./pages/PersonalLoanPage";
import HomeLoanPage from "./pages/HomeLoanPage";
import AutoLoanPage from "./pages/AutoLoanPage";
import BusinessLoanPage from "./pages/BusinessLoanPage";
import EducationLoanPage from "./pages/EducationLoanPage";
import ProjectFundingPage from "./pages/ProjectFundingPage";
import NotFound from "./pages/NotFound";
import Blogs from "./pages/Blogs";
import AOS from "aos";
import "aos/dist/aos.css";
import ApplyLoan from "./pages/ApplyLoan";
import MobileLogin from "./pages/MobileLogin";
import SelfEmployedBusiness from './pages/SelfEmployeed';
import SelfEmployedProfessional from "./pages/SelfEmployedProfessionals";
import HomeLoanApply from './pages/HomeLoan';
import ITReturnsFiling from "./pages/ITReturnsFiling";
import GstRegistration from "./pages/GstRegistration";
import PanCardServices from "./pages/PanCardServices";
import PassportServices from "./pages/PassportServices";
import LoanFaqsPage from "./pages/Faqs";
import CalculatorsPage from "./pages/Calculators";
import GuidesPage from "./pages/Guides";
import Testimonials from "./pages/Testimonials";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import LoginPage from "./pages/admin/Login";
import { AuthProvider } from "./hooks/useAuth";



// Beautiful Loader Component
const Loader = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#e9f0fe] via-[#f7fafd] to-[#e6ecf2]">
    <div className="relative flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#436EEB] via-[#8B05FF] to-[#4eb8ff] animate-spin-slow shadow-2xl flex items-center justify-center">
        <svg className="w-12 h-12 text-white" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="#fff" strokeWidth="4" opacity="0.2"/>
          <path d="M24 8a16 16 0 1 1-16 16" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      </div>
      <span className="mt-6 text-xl font-bold text-[#436EEB] animate-pulse">Loading...</span>
    </div>
    <style>
      {`
        .animate-spin-slow {
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}
    </style>
  </div>
);

// ScrollToTop component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const queryClient = new QueryClient();

const PageWithLoader = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 900); // Loader duration
    return () => clearTimeout(timer);
  }, []);
  return loading ? <Loader /> : <>{children}</>;
};

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<PageWithLoader><Index /></PageWithLoader>} />
              <Route path="/about" element={<PageWithLoader><AboutPage /></PageWithLoader>} />
              <Route path="/services" element={<PageWithLoader><ServicesPage /></PageWithLoader>} />
              <Route path="/contact" element={<PageWithLoader><ContactPage /></PageWithLoader>} />
              <Route path="/loans/personal-loan" element={<PageWithLoader><PersonalLoanPage /></PageWithLoader>} />
              <Route path="/loans/home-loan" element={<PageWithLoader><HomeLoanPage /></PageWithLoader>} />
              <Route path="/loans/auto-loan" element={<PageWithLoader><AutoLoanPage /></PageWithLoader>} />
              <Route path="/loans/business-loan" element={<PageWithLoader><BusinessLoanPage /></PageWithLoader>} />
              <Route path="/loans/education-loan" element={<PageWithLoader><EducationLoanPage /></PageWithLoader>} />
              <Route path="/loans/project-funding" element={<PageWithLoader><ProjectFundingPage /></PageWithLoader>} />
              <Route path="/apply-loan" element={<PageWithLoader><ApplyLoan /></PageWithLoader>} />
              <Route path="/mobile-login" element={<PageWithLoader><MobileLogin /></PageWithLoader>} />
              <Route path="/blogs" element={<PageWithLoader><Blogs /></PageWithLoader>} />
              <Route path="/self-employed-business-loan" element={<PageWithLoader><SelfEmployedBusiness /></PageWithLoader>} />
              <Route path="/self-employed-professional-loan" element={<PageWithLoader><SelfEmployedProfessional /></PageWithLoader>} />
              <Route path="/home-loan-application" element={<PageWithLoader><HomeLoanApply /></PageWithLoader>} />
              <Route path="/itr-filing" element={<PageWithLoader><ITReturnsFiling /></PageWithLoader>} />
              <Route path="/gst-registration" element={<PageWithLoader><GstRegistration /></PageWithLoader>} />
              <Route path="/passport-services" element={<PageWithLoader><PassportServices /></PageWithLoader>} />
              <Route path="/pan-card-services" element={<PageWithLoader><PanCardServices /></PageWithLoader>} />
              <Route path="/faqs" element={<PageWithLoader><LoanFaqsPage /></PageWithLoader>} />
              <Route path="/calculators" element={<PageWithLoader><CalculatorsPage /></PageWithLoader>} />
              <Route path="/guides" element={<PageWithLoader><GuidesPage /></PageWithLoader>} />
              <Route path="/testimonials" element={<PageWithLoader><Testimonials /></PageWithLoader>} />
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route path="dashboard" element={<PageWithLoader><Dashboard /></PageWithLoader>} />
              </Route>
              <Route path="/admin/login" element={<PageWithLoader><LoginPage /></PageWithLoader>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<PageWithLoader><NotFound /></PageWithLoader>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;