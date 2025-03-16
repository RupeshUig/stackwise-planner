
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Plus, X, ChevronDown, ChevronUp, Search } from 'lucide-react';

// Mock data for technology categories and tools
const categories = [
  "Frontend Frameworks",
  "Backend Frameworks",
  "Databases",
  "State Management",
  "CSS Frameworks",
  "Authentication",
  "Deployment",
  "Testing",
];

// Sample tech data (simplified for demo)
const techData = {
  "Frontend Frameworks": [
    {
      name: "React",
      description: "A JavaScript library for building user interfaces",
      popularity: 95,
      learning: 75,
      community: 90,
      performance: 85,
      features: ["Component-based", "Virtual DOM", "JSX syntax", "React Native"],
      bestFor: ["Single page applications", "Large applications", "Mobile apps"],
    },
    {
      name: "Vue",
      description: "Progressive JavaScript framework for UIs",
      popularity: 80,
      learning: 90,
      community: 75,
      performance: 90,
      features: ["Component-based", "Virtual DOM", "Template syntax", "Light-weight"],
      bestFor: ["Progressive enhancement", "Small teams", "Rapid development"],
    },
    {
      name: "Angular",
      description: "Platform for building mobile & desktop web applications",
      popularity: 75,
      learning: 60,
      community: 80,
      performance: 80,
      features: ["Full framework", "TypeScript", "Dependency injection", "Testing"],
      bestFor: ["Enterprise applications", "Large teams", "CRUD applications"],
    },
  ],
  "Backend Frameworks": [
    {
      name: "Node.js/Express",
      description: "JavaScript runtime + web framework",
      popularity: 90,
      learning: 85,
      community: 95,
      performance: 80,
      features: ["Non-blocking I/O", "Same language as frontend", "NPM ecosystem"],
      bestFor: ["API development", "Real-time applications", "Microservices"],
    },
    {
      name: "Django",
      description: "High-level Python web framework",
      popularity: 80,
      learning: 80,
      community: 85,
      performance: 75,
      features: ["Batteries included", "ORM", "Admin interface", "Security"],
      bestFor: ["Rapid development", "Content sites", "Data science integration"],
    },
  ],
  "Databases": [
    {
      name: "PostgreSQL",
      description: "Open-source relational database",
      popularity: 90,
      learning: 70,
      community: 85,
      performance: 85,
      features: ["ACID compliance", "JSON support", "Extensibility", "Data integrity"],
      bestFor: ["Complex applications", "Data analytics", "Financial systems"],
    },
    {
      name: "MongoDB",
      description: "Document-oriented NoSQL database",
      popularity: 85,
      learning: 85,
      community: 80,
      performance: 90,
      features: ["Schema-less", "Horizontal scaling", "JSON documents", "Aggregation"],
      bestFor: ["Rapid prototyping", "Content management", "Real-time analytics"],
    },
  ],
};

// Feature comparison component
const FeatureComparison: React.FC<{ tools: any[] }> = ({ tools }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>("Features");
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Determine all possible metrics for comparison
  const metrics = ["popularity", "learning", "community", "performance"];
  const sections = ["Features", "Best For"];

  return (
    <div className="w-full bg-card rounded-lg border border-border shadow-subtle overflow-hidden animate-scale-in">
      {/* Header */}
      <div className="grid grid-cols-3 border-b border-border">
        <div className="p-4 font-medium text-sm text-foreground/70">Comparison</div>
        {tools.map((tool, index) => (
          <div key={index} className="p-4 font-semibold text-center border-l border-border">
            {tool.name}
          </div>
        ))}
      </div>
      
      {/* Description */}
      <div className="grid grid-cols-3 border-b border-border">
        <div className="p-4 font-medium text-sm text-foreground/70">Description</div>
        {tools.map((tool, index) => (
          <div key={index} className="p-4 text-sm text-center border-l border-border">
            {tool.description}
          </div>
        ))}
      </div>
      
      {/* Metrics */}
      {metrics.map((metric) => (
        <div key={metric} className="grid grid-cols-3 border-b border-border">
          <div className="p-4 font-medium text-sm text-foreground/70 capitalize">
            {metric} Score
          </div>
          {tools.map((tool, index) => (
            <div key={index} className="p-4 text-center border-l border-border">
              <div className="mx-auto w-full max-w-[120px] bg-secondary rounded-full h-2.5 mb-1">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${tool[metric]}%` }}
                />
              </div>
              <span className="text-sm font-medium">{tool[metric]}%</span>
            </div>
          ))}
        </div>
      ))}
      
      {/* Expandable sections */}
      {sections.map((section) => {
        const key = section === "Features" ? "features" : "bestFor";
        const isExpanded = expandedSection === section;
        
        return (
          <div key={section} className="border-b border-border">
            <button 
              onClick={() => toggleSection(section)}
              className="w-full grid grid-cols-3 text-left"
            >
              <div className="p-4 font-medium text-sm flex items-center justify-between text-foreground/70">
                {section}
                {isExpanded ? 
                  <ChevronUp className="h-4 w-4" /> : 
                  <ChevronDown className="h-4 w-4" />
                }
              </div>
              
              {tools.map((tool, index) => (
                <div key={index} className="p-4 text-center border-l border-border">
                  <span className="text-sm font-medium">{tool[key].length} items</span>
                </div>
              ))}
            </button>
            
            {isExpanded && (
              <div className="grid grid-cols-3 bg-accent/50">
                <div className="py-3 px-4"></div>
                {tools.map((tool, index) => (
                  <div key={index} className="py-3 px-4 border-l border-border">
                    <ul className="space-y-2">
                      {tool[key].map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center text-sm">
                          <Check className="h-3.5 w-3.5 text-primary mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const ToolComparison: React.FC = () => {
  const [category, setCategory] = useState("Frontend Frameworks");
  const [selectedTools, setSelectedTools] = useState<any[]>(techData["Frontend Frameworks"].slice(0, 2));
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setSelectedTools(techData[value as keyof typeof techData].slice(0, 2));
  };
  
  const addTool = (tool: any) => {
    if (selectedTools.length < 3 && !selectedTools.find(t => t.name === tool.name)) {
      setSelectedTools([...selectedTools, tool]);
    }
  };
  
  const removeTool = (toolName: string) => {
    setSelectedTools(selectedTools.filter(tool => tool.name !== toolName));
  };
  
  // Filter tools based on search query
  const availableTools = techData[category as keyof typeof techData].filter(
    tool => !selectedTools.find(t => t.name === tool.name) && 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="space-y-4 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Technology Comparison
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
            Compare Tools Side by Side
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Make informed decisions by comparing technologies across multiple dimensions including performance, community support, and learning curve.
          </p>
        </div>
      
        <div className="space-y-6">
          {/* Selection controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Technology Category
              </label>
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium">Selected Technologies ({selectedTools.length}/3)</label>
              <div className="flex flex-wrap gap-2">
                {selectedTools.map((tool) => (
                  <div 
                    key={tool.name}
                    className="group flex items-center rounded-full bg-primary/10 pl-3 pr-2 py-1"
                  >
                    <span className="text-sm font-medium">{tool.name}</span>
                    <button 
                      onClick={() => removeTool(tool.name)}
                      className="ml-1.5 p-0.5 rounded-full text-foreground/50 hover:text-foreground transition-colors"
                      aria-label={`Remove ${tool.name}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                
                {selectedTools.length < 3 && (
                  <div className="relative">
                    <div className="flex items-center rounded-full border border-border pl-3 pr-2 py-1">
                      <Search className="h-3.5 w-3.5 text-foreground/50 mr-1.5" />
                      <Input
                        type="text"
                        placeholder="Add technology..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-5 border-0 p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                    
                    {searchQuery && availableTools.length > 0 && (
                      <div className="absolute z-10 mt-1 w-48 bg-card rounded-md shadow-elevated border border-border overflow-hidden">
                        <ul className="py-1 max-h-48 overflow-auto">
                          {availableTools.map((tool) => (
                            <li key={tool.name}>
                              <button
                                onClick={() => {
                                  addTool(tool);
                                  setSearchQuery("");
                                }}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors"
                              >
                                {tool.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Comparison table */}
          {selectedTools.length > 0 ? (
            <FeatureComparison tools={selectedTools} />
          ) : (
            <div className="text-center py-12 border border-border rounded-lg bg-card">
              <p className="text-foreground/70">Select technologies to compare</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolComparison;
