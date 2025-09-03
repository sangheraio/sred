import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { StatsOverview } from "@/components/StatsOverview";
import { MarketCard } from "@/components/MarketCard";
import { MarketFilters } from "@/components/MarketFilters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  TrendingUp, 
  Users, 
  Award, 
  ArrowRight, 
  Sparkles,
  Shield,
  Target,
  Rocket,
  ChevronRight
} from "lucide-react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("trending");

  // Mock data for innovation projects
  const projects = [
    {
      title: "AI-Powered Diabetes Monitoring System",
      description: "Revolutionary continuous glucose monitoring using machine learning to predict blood sugar spikes before they happen.",
      category: "Biotechnology",
      currentPrice: 24.75,
      priceChange: 8.2,
      liquidity: 87500,
      backers: 234,
      timeLeft: "45d",
      probability: 78,
      fundingGoal: 500000,
      raised: 387500,
    },
    {
      title: "Quantum-Enhanced Battery Technology",
      description: "Next-generation lithium-ion batteries with 300% longer life using quantum-engineered materials.",
      category: "Clean Energy",
      currentPrice: 156.80,
      priceChange: -2.4,
      liquidity: 45200,
      backers: 89,
      timeLeft: "23d",
      probability: 65,
      fundingGoal: 1000000,
      raised: 452000,
    },
    {
      title: "Autonomous Crop Monitoring Drones",
      description: "AI-powered drones that monitor crop health, predict yield, and optimize fertilizer application for Canadian farms.",
      category: "AgTech",
      currentPrice: 89.45,
      priceChange: 15.7,
      liquidity: 92300,
      backers: 167,
      timeLeft: "18d",
      probability: 82,
      fundingGoal: 750000,
      raised: 692250,
    },
    {
      title: "Neural Interface for Paralysis Recovery",
      description: "Brain-computer interface technology helping paralyzed patients regain motor function through thought-controlled devices.",
      category: "Medical Devices",
      currentPrice: 342.10,
      priceChange: 22.1,
      liquidity: 156800,
      backers: 445,
      timeLeft: "67d",
      probability: 71,
      fundingGoal: 2000000,
      raised: 1420000,
    },
    {
      title: "Carbon Capture Concrete",
      description: "Revolutionary building material that actively captures CO2 from the atmosphere while providing structural support.",
      category: "Clean Energy",
      currentPrice: 67.25,
      priceChange: 5.8,
      liquidity: 34600,
      backers: 78,
      timeLeft: "31d",
      probability: 59,
      fundingGoal: 400000,
      raised: 276000,
    },
    {
      title: "Blockchain-Based Supply Chain",
      description: "Decentralized platform ensuring transparent and ethical sourcing for Canadian manufacturers and retailers.",
      category: "FinTech",
      currentPrice: 45.90,
      priceChange: -1.2,
      liquidity: 28400,
      backers: 156,
      timeLeft: "12d",
      probability: 68,
      fundingGoal: 300000,
      raised: 204000,
    }
  ];

  const filteredProjects = projects.filter(project => 
    selectedCategory === "All Categories" || project.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 relative">
      {/* Additional Decoration - Now covers entire page */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(209,76%,42%)]/5 via-transparent to-[hsl(43,96%,56%)]/5 pointer-events-none"></div>
      
      <Navigation />
      
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Hero Section */}
        <div className="relative mb-16 overflow-hidden rounded-3xl">
          {/* Gradient Overlay - moved before banner for proper layering */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background rounded-3xl"></div>
          
          {/* Banner Background Image - now on top of gradient */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.25] rounded-3xl"
            style={{ backgroundImage: 'url(/banner.png)' }}
          ></div>
          
          <div className="relative text-center py-12 px-6">
            {/* Logo Animation */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(209,76%,42%)] to-[hsl(43,96%,56%)] rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-br from-[hsl(209,76%,42%)] to-[hsl(199,89%,48%)] rounded-2xl shadow-2xl">
                  <Leaf className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Main Title with Gradient */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Canadian Innovation</span>
              <br />
              <span className="text-[hsl(43,96%,56%)]">Accelerated</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Fund the future of Canadian innovation through SRED credits. Back breakthrough projects, 
              participate in prediction markets, and earn returns when government funding kicks in at 
              <span className="font-semibold text-[hsl(43,96%,56%)]"> $100k liquidity</span>.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge className="px-4 py-2 text-sm bg-gradient-to-r from-[hsl(43,96%,56%)] to-[hsl(43,96%,68%)] text-white border-0 shadow-lg">
                <Award className="w-4 h-4 mr-2" />
                20% Taxpayer Returns
              </Badge>
              <Badge className="px-4 py-2 text-sm glass-card border-[hsl(209,76%,42%)]/20 text-[hsl(209,76%,42%)]">
                <TrendingUp className="w-4 h-4 mr-2" />
                Government Bonding Curve
              </Badge>
              <Badge className="px-4 py-2 text-sm glass-card border-[hsl(199,89%,48%)]/20 text-[hsl(199,89%,48%)]">
                <Users className="w-4 h-4 mr-2" />
                Collective Curation
              </Badge>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="btn-primary-gradient px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl">
                <Rocket className="w-5 h-5 mr-2" />
                Start Investing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => window.open("https://github.com/sangheraio/sred", "_blank")}
                variant="outline"
                className="px-8 py-6 text-lg font-semibold rounded-xl border-2 border-[hsl(43,96%,56%)]/30 hover:bg-[hsl(43,96%,56%)]/10 hover:border-[hsl(43,96%,56%)]/50"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* How it Works - Premium Design */}
        <Card className="mb-12 glass-card border-border/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[hsl(209,76%,42%)]/5 to-[hsl(43,96%,56%)]/5 pb-8">
            <CardTitle className="text-center text-3xl font-bold">
              <span className="gradient-text">How the SRED Exchange Works</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 pb-8">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  icon: Rocket,
                  title: "Apply for Pre-Approval",
                  description: "Innovators launch new projects. The government reviews for basic pre-approval (citizenship, budget, milestones, etc), and once approved, a prediction market is created for the project.",
                  color: "from-[hsl(209,76%,42%)] to-[hsl(199,89%,48%)]"
                },
                {
                  step: "2",
                  icon: Target,
                  title: "$100k Threshold",
                  description: "the community enters voting phase, and if it reaches a YES vote of 20% of its funding goals, the government steps in with SRED funding through automated bonding curve.",
                  color: "from-[hsl(43,96%,56%)] to-[hsl(43,96%,68%)]"
                },
                {
                  step: "3",
                  icon: Shield,
                  title: "Shared Returns",
                  description: "Successful projects generate returns, community engagement, and shifts the burden of review to decentralized community intelligence. 20% is airdropped to Canadian taxpayers as dividend.",
                  color: "from-[hsl(199,89%,48%)] to-[hsl(193,92%,62%)]"
                }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  {/* Connection Line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent"></div>
                  )}
                  
                  <div className="text-center space-y-4">
                    {/* Step Number with Icon */}
                    <div className="relative mx-auto">
                      <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                        <item.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-card rounded-full flex items-center justify-center shadow-lg border-2 border-[hsl(43,96%,56%)]">
                        <span className="text-sm font-bold text-[hsl(43,96%,56%)]">{item.step}</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-[hsl(43,96%,56%)]/10 to-[hsl(43,96%,68%)]/10 border border-[hsl(43,96%,56%)]/20">
              <div className="flex items-center justify-center space-x-2 text-center">
                <Shield className="w-5 h-5 text-[hsl(43,96%,56%)]" />
                <p className="text-sm font-medium">
                  <span className="text-[hsl(43,96%,56%)] font-bold">100% Transparent</span>
                  <span className="text-muted-foreground mx-2">•</span>
                  <span className="text-foreground">Government Backed</span>
                  <span className="text-muted-foreground mx-2">•</span>
                  <span className="text-foreground">Community Driven</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Filters */}
        <MarketFilters 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project, index) => (
            <MarketCard key={index} {...project} />
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center">
          <Button 
            variant="outline" 
            className="px-8 py-6 text-lg font-semibold rounded-xl border-2 border-[hsl(209,76%,42%)]/30 hover:bg-[hsl(209,76%,42%)]/10 hover:border-[hsl(209,76%,42%)]/50 transition-all duration-300"
          >
            Load More Projects
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
