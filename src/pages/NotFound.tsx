import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-card">
        <CardContent className="pt-6 text-center">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-foreground">404</h1>
            <h2 className="text-xl font-semibold text-muted-foreground mt-2">Page Not Found</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="bg-gradient-primary shadow-primary">
            <a href="/">Return to Dashboard</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
