import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Phone, 
  MessageSquare, 
  Star,
  Car,
  Navigation,
  Clock,
  MapPin,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RideDetails = () => {
  const [rideStatus, setRideStatus] = useState("searching");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setRideStatus("driver_assigned");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handlePayment = () => {
    navigate("/payment");
  };

  const statusMessages = {
    searching: "Finding the best driver for you...",
    driver_assigned: "Driver assigned and on the way!",
    arriving: "Driver is arriving at pickup location",
    trip_started: "Trip in progress"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border/50 px-4 py-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/book-ride")}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Your Ride</h1>
            <p className="text-sm text-primary">{statusMessages[rideStatus]}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Ride Status */}
        <Card className="card-taxi animate-fade-in">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center mx-auto">
              {rideStatus === "searching" ? (
                <Car className="w-10 h-10 text-primary-foreground animate-pulse" />
              ) : (
                <Navigation className="w-10 h-10 text-primary-foreground" />
              )}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {rideStatus === "searching" ? "Searching for driver..." : "Driver Found!"}
              </h3>
              <p className="text-muted-foreground">{statusMessages[rideStatus]}</p>
            </div>

            {rideStatus === "searching" && (
              <div className="flex justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {rideStatus !== "searching" && (
          <>
            {/* Driver Info */}
            <Card className="card-taxi animate-scale-in">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/api/placeholder/64/64" />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                      RK
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-lg">Rajesh Kumar</h3>
                      <Badge className="bg-primary text-primary-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        3 min
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-current text-primary" />
                        <span>4.9 (2,450 trips)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="w-4 h-4" />
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1 h-12 rounded-xl">
                    <Phone className="w-5 h-5 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" className="flex-1 h-12 rounded-xl">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </Card>

            {/* Vehicle Info */}
            <Card className="card-taxi animate-slide-up">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-taxi-yellow-light rounded-2xl flex items-center justify-center">
                  <Car className="w-8 h-8 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold">Maruti Swift Dzire</h3>
                  <p className="text-muted-foreground">White • DL 8C AB 1234</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Badge variant="secondary" className="bg-muted text-xs">
                      AC
                    </Badge>
                    <Badge variant="secondary" className="bg-muted text-xs">
                      GPS Tracked
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Trip Details */}
        <Card className="card-taxi animate-fade-in">
          <div className="space-y-4">
            <h3 className="font-semibold">Trip Details</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div>
                  <p className="font-medium">Main Street, Downtown</p>
                  <p className="text-sm text-muted-foreground">Pickup location</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-destructive" />
                <div>
                  <p className="font-medium">Airport Terminal 1</p>
                  <p className="text-sm text-muted-foreground">Drop location</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">₹220</p>
                <p className="text-sm text-muted-foreground">Estimated fare</p>
              </div>
              <div>
                <p className="text-2xl font-bold">12.5</p>
                <p className="text-sm text-muted-foreground">km</p>
              </div>
              <div>
                <p className="text-2xl font-bold">25</p>
                <p className="text-sm text-muted-foreground">min</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Button */}
        <div className="animate-scale-in">
          {rideStatus === "searching" ? (
            <Button 
              variant="outline"
              className="btn-taxi-outline w-full h-14 text-lg font-semibold"
              onClick={() => navigate("/book-ride")}
            >
              Cancel Search
            </Button>
          ) : (
            <Button 
              onClick={handlePayment}
              className="btn-taxi w-full h-14 text-lg font-semibold"
            >
              Confirm & Pay
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideDetails;