import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Car, Smartphone, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-primary-hover rounded-2xl mb-4 shadow-[var(--shadow-button)]">
            <Car className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">RideEasy</h1>
          <p className="text-muted-foreground">Your reliable ride partner</p>
        </div>

        {/* Auth Card */}
        <Card className="card-taxi animate-slide-up">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-semibold">
                {isLogin ? "Welcome Back" : "Get Started"}
              </h2>
              <p className="text-muted-foreground">
                {isLogin ? "Sign in to continue" : "Create your account"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input 
                    placeholder="Enter your full name" 
                    className="h-12 rounded-xl border-2 focus:border-primary"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input 
                  type="tel" 
                  placeholder="+91 98765 43210" 
                  className="h-12 rounded-xl border-2 focus:border-primary"
                />
              </div>

              <Button 
                type="submit" 
                className="btn-taxi w-full h-12 text-lg"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-medium hover:underline transition-[var(--transition-smooth)]"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </div>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 animate-fade-in">
          <div className="text-center">
            <div className="w-12 h-12 bg-taxi-yellow-light rounded-xl flex items-center justify-center mx-auto mb-2">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Easy Booking</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-taxi-yellow-light rounded-xl flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Safe & Secure</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-taxi-yellow-light rounded-xl flex items-center justify-center mx-auto mb-2">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">24/7 Service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;