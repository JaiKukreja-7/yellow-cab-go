import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock,
  Star,
  Receipt,
  Car,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TripHistory = () => {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const trips = [
    {
      id: "TG001",
      from: "Main Street, Downtown",
      to: "Airport Terminal 1",
      date: "Today, 2:30 PM",
      fare: "₹216",
      status: "completed",
      driver: "Rajesh Kumar",
      rating: 5,
      vehicle: "Swift Dzire",
      duration: "25 min"
    },
    {
      id: "TG002",
      from: "Office Complex",
      to: "Shopping Mall",
      date: "Yesterday, 6:45 PM",
      fare: "₹180",
      status: "completed",
      driver: "Amit Singh",
      rating: 4,
      vehicle: "Honda City",
      duration: "18 min"
    },
    {
      id: "TG003",
      from: "Home",
      to: "Metro Station",
      date: "Dec 15, 8:20 AM",
      fare: "₹95",
      status: "completed",
      driver: "Suresh Yadav",
      rating: 5,
      vehicle: "Maruti Baleno",
      duration: "12 min"
    },
    {
      id: "TG004",
      from: "Restaurant District",
      to: "Hotel Paradise",
      date: "Dec 14, 11:30 PM",
      fare: "₹145",
      status: "cancelled",
      driver: null,
      rating: null,
      vehicle: null,
      duration: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredTrips = filter === "all" 
    ? trips 
    : trips.filter(trip => trip.status === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border/50 px-4 py-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/home")}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Trip History</h1>
            <p className="text-sm text-muted-foreground">{filteredTrips.length} trips found</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Filter Tabs */}
        <div className="flex space-x-2 animate-fade-in">
          {[
            { id: "all", label: "All Trips" },
            { id: "completed", label: "Completed" },
            { id: "cancelled", label: "Cancelled" }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={filter === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(tab.id)}
              className={`rounded-xl ${
                filter === tab.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'border-border hover:bg-muted'
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Trip Cards */}
        <div className="space-y-4">
          {filteredTrips.map((trip, index) => (
            <Card 
              key={trip.id} 
              className="card-taxi-interactive animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                {/* Trip Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-taxi-yellow-light rounded-xl flex items-center justify-center">
                      <Car className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Trip #{trip.id}</p>
                      <p className="text-sm text-muted-foreground">{trip.date}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-lg">{trip.fare}</p>
                    <Badge className={`text-xs border ${getStatusColor(trip.status)}`}>
                      {trip.status}
                    </Badge>
                  </div>
                </div>

                {/* Route */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm font-medium">{trip.from}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-medium">{trip.to}</span>
                  </div>
                </div>

                {/* Trip Details */}
                {trip.status === "completed" && (
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">Driver:</span>
                        <span className="font-medium">{trip.driver}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-current text-primary" />
                        <span className="font-medium">{trip.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Car className="w-4 h-4" />
                        <span>{trip.vehicle}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{trip.duration}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="border-t pt-3 flex space-x-3">
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                    <Receipt className="w-4 h-4 mr-2" />
                    View Receipt
                  </Button>
                  {trip.status === "completed" && (
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                      <Car className="w-4 h-4 mr-2" />
                      Book Again
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Book New Ride */}
        <div className="animate-scale-in pt-4">
          <Button 
            onClick={() => navigate("/home")}
            className="btn-taxi w-full h-14 text-lg font-semibold"
          >
            Book a New Ride
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripHistory;