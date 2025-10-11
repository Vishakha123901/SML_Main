import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import WhiteLabelling from "./pages/WhiteLabelling";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail"; // Import BlogDetail component
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login"; // Import Login component
import AdminPanel, { BlogsAdmin, ProductsAdmin, AnalyticsAdmin } from "./pages/AdminPanel"; // Import AdminPanel and nested components
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/white-labelling" element={<WhiteLabelling />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetail />} /> {/* New Blog Detail Route */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} /> {/* Login Route */}
              {/* Protected Admin Routes */}
              <Route 
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminPanel />
                  </PrivateRoute>
                }
              >
                <Route path="blogs" element={<BlogsAdmin />} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="analytics" element={<AnalyticsAdmin />} />
                <Route index element={<BlogsAdmin />} /> {/* Default admin route */}
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
