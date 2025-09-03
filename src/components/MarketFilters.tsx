import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Filter, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users,
  Sparkles,
  Zap,
  Target,
  BarChart3
} from "lucide-react";

interface MarketFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const MarketFilters = ({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: MarketFiltersProps) => {
  const categories = [
    { name: "All Categories", icon: Sparkles, count: 1247 },
    { name: "Biotechnology", icon: Zap, count: 234 },
    { name: "Clean Energy", icon: Target, count: 189 },
    { name: "AgTech", icon: BarChart3, count: 156 },
    { name: "Medical Devices", icon: Target, count: 298 },
    { name: "FinTech", icon: DollarSign, count: 370 },
  ];

  const sortOptions = [
    { value: "trending", label: "Trending", icon: TrendingUp },
    { value: "newest", label: "Newest", icon: Clock },
    { value: "price-high", label: "Price: High to Low", icon: DollarSign },
    { value: "price-low", label: "Price: Low to High", icon: DollarSign },
    { value: "most-backed", label: "Most Backed", icon: Users },
  ];

  return (
    <div className="mb-8 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-[hsl(209,76%,42%)] to-[hsl(199,89%,48%)] rounded-xl shadow-lg">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold gradient-text">Innovation Markets</h2>
            <p className="text-sm text-muted-foreground">
              {categories.find(c => c.name === selectedCategory)?.count || 0} projects available
            </p>
          </div>
        </div>

        {/* Sort Dropdown with Premium Styling */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[200px] glass-card border-border/50 hover:border-[hsl(43,96%,56%)]/30 transition-all duration-300 rounded-xl">
            <div className="flex items-center space-x-2">
              {sortOptions.find(opt => opt.value === sortBy)?.icon && (
                <div className="text-[hsl(43,96%,56%)]">
                  {(() => {
                    const Icon = sortOptions.find(opt => opt.value === sortBy)?.icon;
                    return Icon ? <Icon className="w-4 h-4" /> : null;
                  })()}
                </div>
              )}
              <SelectValue placeholder="Sort by" />
            </div>
          </SelectTrigger>
          <SelectContent className="glass-card border-border/50 rounded-xl">
            {sortOptions.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="hover:bg-[hsl(43,96%,56%)]/10 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  <option.icon className="w-4 h-4 text-[hsl(209,76%,42%)]" />
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Filter Pills with Premium Design */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;
          const Icon = category.icon;
          
          return (
            <Button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              variant={isSelected ? "default" : "outline"}
              className={`
                relative group px-5 py-6 rounded-xl font-medium transition-all duration-300
                ${isSelected 
                  ? 'bg-gradient-to-r from-[hsl(209,76%,42%)] to-[hsl(199,89%,48%)] text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105' 
                  : 'glass-card border-border/50 hover:border-[hsl(43,96%,56%)]/30 hover:bg-[hsl(43,96%,56%)]/5'
                }
              `}
            >
              {/* Glow Effect for Selected */}
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(209,76%,42%)] to-[hsl(199,89%,48%)] rounded-xl blur-lg opacity-30"></div>
              )}
              
              <div className="relative flex items-center space-x-2">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[hsl(43,96%,56%)]'}`} />
                <span>{category.name}</span>
                <Badge 
                  variant="secondary" 
                  className={`
                    ml-2 px-2 py-0.5 text-xs font-bold
                    ${isSelected 
                      ? 'bg-white/20 text-white border-white/30' 
                      : 'bg-[hsl(43,96%,56%)]/10 text-[hsl(43,96%,56%)] border-[hsl(43,96%,56%)]/20'
                    }
                  `}
                >
                  {category.count}
                </Badge>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Active Filters Bar */}
      {selectedCategory !== "All Categories" && (
        <div className="flex items-center justify-between p-4 rounded-xl glass-card border-border/50 bg-gradient-to-r from-[hsl(43,96%,56%)]/5 to-transparent">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
            <Badge className="px-3 py-1 bg-gradient-to-r from-[hsl(43,96%,56%)] to-[hsl(43,96%,68%)] text-white border-0 shadow-md">
              {selectedCategory}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange("All Categories")}
            className="text-muted-foreground hover:text-foreground hover:bg-transparent"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Market Insights Banner */}
      <div className="p-6 rounded-xl glass-card border-border/50 bg-gradient-to-br from-[hsl(209,76%,42%)]/5 via-transparent to-[hsl(43,96%,56%)]/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-[hsl(43,96%,56%)] to-[hsl(43,96%,68%)] rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Market Insights</h3>
              <p className="text-sm text-muted-foreground">
                <span className="text-[hsl(43,96%,56%)] font-semibold">3 projects</span> are approaching government funding threshold
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="border-[hsl(43,96%,56%)]/30 hover:bg-[hsl(43,96%,56%)]/10 hover:border-[hsl(43,96%,56%)]/50 rounded-xl font-semibold"
          >
            View Opportunities
          </Button>
        </div>
      </div>
    </div>
  );
};