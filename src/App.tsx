import { useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AirlineDetail from "./pages/AirlineDetail";
import NotFound from "./pages/NotFound";
import InvestmentPage from "./pages/investment"; // Include this if you have it

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/airline");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className={`min-h-screen font-sans ${isDetailPage ? "zoom-in-detail" : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/investment" element={<InvestmentPage />} />
            <Route path="/airline/:code" element={<AirlineDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
