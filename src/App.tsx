import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Promotions from "./pages/Promotions";
import Offers from "./pages/Offers";
import Vendors from "./pages/Vendors";
import Provinces from "./pages/Provinces";
import Analytics from "./pages/Analytics";
import VendorStats from "./pages/VendorStats";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/provinces" element={<Provinces />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/vendor-stats" element={<VendorStats />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
