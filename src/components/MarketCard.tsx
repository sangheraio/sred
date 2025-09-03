import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Clock, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target
} from "lucide-react";

interface MarketCardProps {
  title: string;
  description: string;
  category: string;
  currentPrice: number;
  priceChange: number;
  liquidity: number;
  backers: number;
  timeLeft: string;
  probability: number;
  fundingGoal: number;
  raised: number;
}

export const MarketCard = ({
  title,
  description,
  category,
  currentPrice,
  priceChange,
  liquidity,
  backers,
  timeLeft,
  probability,
  fundingGoal,
  raised,
}: MarketCardProps) => {
  const isPositive = priceChange >= 0;
  const progressPercentage = (raised / fundingGoal) * 100;
  const isNearGovernmentFunding = liquidity >= 80000; // Close to 100k threshold
  const isProbabilityHigh = probability >= 70;

  return (
    <Card className="group glass-card border-border/50 hover:border-[hsl(43,96%,56%)]/30 transition-all duration-500 card-hover overflow-hidden">
      {/* Premium Header Section */}
      <CardHeader className="pb-3 relative">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(209,76%,42%)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative">
          {/* Category and Status Badges */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge 
                variant="secondary" 
                className="text-xs font-semibold bg-gradient-to-r from-[hsl(209,76%,42%)]/10 to-[hsl(199,89%,48%)]/10 border-[hsl(209,76%,42%)]/20 text-[hsl(209,76%,42%)]"
              >
                {category}
              </Badge>
              {isNearGovernmentFunding && (
                <Badge className="text-xs font-semibold bg-gradient-to-r from-[hsl(43,96%,56%)]/20 to-[hsl(43,96%,68%)]/20 text-[hsl(43,96%,50%)] border-[hsl(43,96%,56%)]/30 animate-pulse">
                  <Zap className="w-3 h-3 mr-1" />
                  Near Gov Funding
                </Badge>
              )}
            </div>
            {isProbabilityHigh && (
              <div className="flex items-center">
                <Target className="w-4 h-4 text-[hsl(43,96%,56%)]" />
              </div>
            )}
          </div>

          {/* Title and Description */}
          <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-2 group-hover:text-[hsl(209,76%,42%)] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Price Display Section */}
        <div className="flex items-start justify-between p-4 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Price</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold number-display">
                ${currentPrice.toFixed(2)}
              </span>
              <div className={`flex items-center px-2 py-1 rounded-md ${
                isPositive ? 'bg-green-500/10' : 'bg-red-500/10'
              }`}>
                {isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                )}
                <span className={`text-xs font-bold ml-1 ${
                  isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          
          {/* Success Probability Indicator */}
          <div className="text-right">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Success Rate</p>
            <div className="flex items-center justify-end space-x-2">
              <Activity className="w-4 h-4 text-[hsl(43,96%,56%)]" />
              <span className={`text-xl font-bold ${
                isProbabilityHigh ? 'text-[hsl(43,96%,56%)]' : 'text-foreground'
              }`}>
                {probability}%
              </span>
            </div>
          </div>
        </div>

        {/* Funding Progress with Premium Styling */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Funding Progress
            </span>
            <span className="text-sm font-bold text-foreground">
              ${(raised / 1000).toFixed(1)}k / ${(fundingGoal / 1000).toFixed(0)}k
            </span>
          </div>
          <div className="relative">
            <Progress 
              value={progressPercentage} 
              className="h-2.5 bg-muted/30" 
            />
            {/* Animated Progress Bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[hsl(43,96%,56%)] to-[hsl(43,96%,68%)] rounded-full transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/30 rounded-full shimmer"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">
              {progressPercentage.toFixed(1)}% Complete
            </span>
            <span className="font-semibold text-[hsl(43,96%,56%)]">
              ${(fundingGoal - raised).toLocaleString()} to go
            </span>
          </div>
        </div>

        {/* Stats Grid with Glass Effect */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg glass-card border border-border/30">
            <DollarSign className="w-4 h-4 mx-auto mb-1 text-[hsl(209,76%,42%)]" />
            <div className="text-sm font-bold number-display">
              ${liquidity >= 1000 ? `${(liquidity/1000).toFixed(1)}k` : liquidity}
            </div>
            <div className="text-xs text-muted-foreground">Liquidity</div>
          </div>
          
          <div className="text-center p-3 rounded-lg glass-card border border-border/30">
            <Users className="w-4 h-4 mx-auto mb-1 text-[hsl(43,96%,56%)]" />
            <div className="text-sm font-bold number-display">{backers}</div>
            <div className="text-xs text-muted-foreground">Backers</div>
          </div>
          
          <div className="text-center p-3 rounded-lg glass-card border border-border/30">
            <Clock className="w-4 h-4 mx-auto mb-1 text-[hsl(199,89%,48%)]" />
            <div className="text-sm font-bold number-display">{timeLeft}</div>
            <div className="text-xs text-muted-foreground">Left</div>
          </div>
        </div>

        {/* Action Buttons with Premium Styling */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1 btn-primary-gradient text-white font-semibold shadow-lg hover:shadow-xl rounded-xl py-5">
            <TrendingUp className="w-4 h-4 mr-2" />
            Back Project
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-[hsl(43,96%,56%)]/30 hover:bg-[hsl(43,96%,56%)]/10 hover:border-[hsl(43,96%,56%)]/50 transition-all duration-300 rounded-xl py-5 font-semibold"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};