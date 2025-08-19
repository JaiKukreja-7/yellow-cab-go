import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Wallet,
  CheckCircle,
  QrCode,
  Banknote
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI Payment",
      description: "Pay using Google Pay, PhonePe, Paytm",
      icon: QrCode,
      discount: "2% off"
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, Rupay accepted",
      icon: CreditCard,
      discount: null
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      description: "Paytm, Amazon Pay, PhonePe Wallet",
      icon: Wallet,
      discount: "₹20 cashback"
    },
    {
      id: "cash",
      name: "Cash Payment",
      description: "Pay cash to the driver",
      icon: Banknote,
      discount: null
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/trip-history");
    }, 3000);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="card-taxi w-full max-w-md animate-scale-in">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-primary-foreground animate-pulse" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Processing Payment</h3>
              <p className="text-muted-foreground">Please wait while we process your payment...</p>
            </div>

            <div className="flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border/50 px-4 py-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/ride-details")}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Payment</h1>
            <p className="text-sm text-muted-foreground">Choose your payment method</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Fare Breakdown */}
        <Card className="card-taxi animate-fade-in">
          <div className="space-y-4">
            <h3 className="font-semibold">Fare Breakdown</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Base fare</span>
                <span>₹80</span>
              </div>
              <div className="flex justify-between">
                <span>Distance (12.5 km)</span>
                <span>₹125</span>
              </div>
              <div className="flex justify-between">
                <span>Time charge</span>
                <span>₹15</span>
              </div>
              <div className="flex justify-between text-primary">
                <span>UPI discount (2%)</span>
                <span>-₹4</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹216</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <div className="space-y-4 animate-slide-up">
          <h3 className="font-semibold text-lg">Payment Methods</h3>
          
          {paymentMethods.map((method, index) => (
            <Card 
              key={method.id}
              className={`card-taxi-interactive transition-all duration-300 ${
                selectedMethod === method.id 
                  ? 'border-primary border-2 shadow-[var(--shadow-elevated)]' 
                  : ''
              }`}
              onClick={() => setSelectedMethod(method.id)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  selectedMethod === method.id 
                    ? 'bg-gradient-to-r from-primary to-primary-hover' 
                    : 'bg-taxi-yellow-light'
                }`}>
                  <method.icon className={`w-7 h-7 ${
                    selectedMethod === method.id ? 'text-primary-foreground' : 'text-primary'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold">{method.name}</h4>
                    {method.discount && (
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        {method.discount}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Payment Summary */}
        <Card className="card-taxi bg-gradient-to-r from-primary/5 to-primary/10 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold text-primary">₹216</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-semibold">
                {paymentMethods.find(m => m.id === selectedMethod)?.name}
              </p>
            </div>
          </div>
        </Card>

        {/* Pay Button */}
        <div className="animate-scale-in pt-4">
          <Button 
            onClick={handlePayment}
            className="btn-taxi w-full h-14 text-lg font-semibold"
            disabled={!selectedMethod}
          >
            Pay ₹216 & Confirm Ride
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;