import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, Users, Award, Leaf, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const StatsOverview = () => {
  const stats = [
    {
      title: "Total Market Cap",
      value: "$45.2M",
      change: "+12.5%",
      changeType: "positive" as "positive" | "negative" | "neutral",
      icon: DollarSign,
      gradient: "from-[hsl(43,96%,56%)] to-[hsl(43,96%,68%)]",
      featured: true,
    },
    {
      title: "Active Projects",
      value: "1,247",
      change: "+8.2%",
      changeType: "positive" as "positive" | "negative" | "neutral",
      icon: TrendingUp,
      gradient: "from-[hsl(209,76%,42%)] to-[hsl(199,89%,48%)]",
    },
    {
      title: "Canadian Innovators",
      value: "18,543",
      change: "+15.7%",
      changeType: "positive" as "positive" | "negative" | "neutral",
      icon: Users,
      gradient: "from-[hsl(199,89%,48%)] to-[hsl(193,92%,62%)]",
    },
    {
      title: "SRED Credits",
      value: "$23.1M",
      change: "+22.1%",
      changeType: "positive" as "positive" | "negative" | "neutral",
      icon: Award,
      gradient: "from-[hsl(43,96%,56%)] to-[hsl(43,96%,68%)]",
    },
    {
      title: "Gov. Funded",
      value: "342",
      change: "This month",
      changeType: "neutral" as "positive" | "negative" | "neutral",
      icon: Leaf,
      gradient: "from-[hsl(209,76%,42%)] to-[hsl(199,89%,48%)]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        const isPositive = stat.changeType === 'positive';
        const isNeutral = stat.changeType === 'neutral';
        
        return (
          <div
            key={index}
            className={`group relative ${stat.featured ? 'lg:col-span-1' : ''}`}
          >
            {/* Glow Effect for Featured Card */}
            {stat.featured && (
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(43,96%,56%)]/20 to-[hsl(43,96%,68%)]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            )}
            
            <Card className="relative glass-card border-border/50 hover:border-[hsl(43,96%,56%)]/30 transition-all duration-300 h-full card-hover">
              <CardContent className="p-5">
                {/* Top Section with Icon */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                      {stat.title}
                    </p>
                  </div>
                  <div className={`relative p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                    <IconComponent className="w-5 h-5 text-white" />
                    {stat.featured && (
                      <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse"></div>
                    )}
                  </div>
                </div>

                {/* Value Display */}
                <div className="space-y-1">
                  <p className="text-3xl font-bold tracking-tight number-display">
                    {stat.value}
                  </p>
                  
                  {/* Change Indicator */}
                  <div className="flex items-center space-x-1">
                    {isPositive && (
                      <>
                        <div className="flex items-center px-2 py-1 rounded-md bg-green-500/10">
                          <ArrowUpRight className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                          <span className="text-xs font-semibold text-green-600 dark:text-green-400 ml-1">
                            {stat.change}
                          </span>
                        </div>
                      </>
                    )}
                    {stat.changeType === 'negative' && (
                      <div className="flex items-center px-2 py-1 rounded-md bg-red-500/10">
                        <ArrowDownRight className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                        <span className="text-xs font-semibold text-red-600 dark:text-red-400 ml-1">
                          {stat.change}
                        </span>
                      </div>
                    )}
                    {isNeutral && (
                      <span className="text-xs font-medium text-muted-foreground px-2 py-1 rounded-md bg-muted/50">
                        {stat.change}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar for Featured Card */}
                {stat.featured && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Target</span>
                      <span className="font-semibold text-[hsl(43,96%,56%)]">$50M</span>
                    </div>
                    <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[hsl(43,96%,56%)] to-[hsl(43,96%,68%)] rounded-full transition-all duration-1000 shimmer"
                        style={{ width: '90%' }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};