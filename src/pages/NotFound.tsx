import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto section-padding">
        <div className="space-y-4">
          <h1 className="font-heading font-bold text-6xl text-primary">404</h1>
          <h2 className="font-heading font-semibold text-2xl text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/" 
            className="btn-primary inline-flex items-center justify-center px-6 py-3 text-center rounded-lg font-medium transition-all duration-200 hover:scale-105"
          >
            Return to Home
          </a>
          <a 
            href="/contact" 
            className="btn-secondary inline-flex items-center justify-center px-6 py-3 text-center rounded-lg font-medium"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
