import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MultiStepProjectForm } from "@/components/MultiStepProjectForm";
import { toast } from "@/hooks/use-toast";
import { Plus, Search, Bell, User, TrendingUp, BarChart3, Wallet } from "lucide-react";

export const Navigation = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <nav className="glass-card sticky top-0 z-50 border-b border-border/50 bg-white/80 dark:bg-card/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section with Premium Styling */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              {/* Animated Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur-lg opacity-20 animate-pulse"></div>
              
              {/* Logo Container */}
              <div className="relative flex items-center justify-center w-12 h-12">
                <img
                  src="/logomark.png"
                  alt="SRED Exchange Logo"
                  className="w-12 h-12 object-contain filter drop-shadow-lg"
                />
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">
                <span className="gradient-text">SRED</span>
                <span className="text-[hsl(43,96%,56%)] ml-1">EXCHANGE</span>
              </h1>
              <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
                Invest in Canadian Innovation
              </p>
            </div>
          </div>

          {/* Premium Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-gold-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              <div className="relative flex items-center">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search projects..."
                  className="pl-12 pr-4 py-6 w-full bg-white/50 dark:bg-card/50 backdrop-blur-md border-border/50 rounded-xl focus:ring-2 focus:ring-[hsl(43,96%,56%)]/30 focus:border-[hsl(43,96%,56%)] transition-all duration-300 placeholder:text-muted-foreground/70 font-medium"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <kbd className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/50 border border-border/50 rounded-md">
                    <Search className="absolute text-muted-foreground w-6 h-6 ml-1" />
                  </kbd>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons with Premium Styling */}
          <div className="flex items-center space-x-3">
            {/* Market Stats */}
            <div className="hidden lg:flex items-center space-x-4 mr-4 px-4 py-2 glass-card rounded-xl">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">+12.5%</span>
              </div>
              <div className="w-px h-6 bg-border/50"></div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-[hsl(43,96%,56%)]" />
                <span className="text-sm font-semibold">$45.2M</span>
              </div>
            </div>

            {/* Launch Project Button */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-gold px-6 py-6 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="w-5 h-5 mr-2" />
                  Launch Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto glass-card border-border/50">
                <DialogHeader>
                </DialogHeader>
                <MultiStepProjectForm onClose={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>

            {/* Wallet Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="relative w-12 h-12 rounded-xl hover:bg-primary/10 transition-all duration-300"
            >
              <Wallet className="w-5 h-5 text-primary" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[hsl(43,96%,56%)] rounded-full animate-pulse"></span>
            </Button>

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon"
              className="relative w-12 h-12 rounded-xl hover:bg-primary/10 transition-all duration-300"
            >
              <Bell className="w-5 h-5 text-primary" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* User Profile */}
            <Button 
              variant="ghost" 
              size="icon"
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(209,76%,42%)] to-[hsl(199,89%,48%)] hover:from-[hsl(209,76%,38%)] hover:to-[hsl(199,89%,44%)] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <User className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};