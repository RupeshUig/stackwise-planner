import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Check, Sparkles, ArrowRight, RefreshCw, Key } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { getAIRecommendations } from '@/services/openai';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProjectType = 'web' | 'mobile' | 'desktop' | 'backend' | 'fullstack';
type TeamSize = 'solo' | 'small' | 'medium' | 'large' | 'enterprise';
type Budget = 'low' | 'medium' | 'high' | 'enterprise';
type TimeFrame = 'urgent' | 'normal' | 'relaxed' | 'longterm';

interface RecommendationResult {
  category: string;
  primary: string;
  alternatives: string[];
  reasoning: string;
}

const API_KEY_STORAGE_KEY = 'openai_api_key';

const ProjectForm: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>('web');
  const [projectDescription, setProjectDescription] = useState('');
  const [teamSize, setTeamSize] = useState<TeamSize>('small');
  const [budget, setBudget] = useState<Budget>('medium');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('normal');
  const [scalabilityImportance, setScalabilityImportance] = useState([50]);
  const [learningCurve, setLearningCurve] = useState([50]);
  const [communitySupport, setCommunitySupport] = useState(true);
  const [enterpriseSupport, setEnterpriseSupport] = useState(false);
  const [openSource, setOpenSource] = useState(true);
  
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationResult[] | null>(null);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(API_KEY_STORAGE_KEY) || '');
  const [tempApiKey, setTempApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const mockRecommendations: RecommendationResult[] = [
    {
      category: "Frontend Framework",
      primary: "React",
      alternatives: ["Vue.js", "Svelte"],
      reasoning: "React is recommended as your primary frontend framework based on your project requirements. It has a large community, excellent scalability for your projected growth, and works well with smaller teams. Vue.js and Svelte are good alternatives if you prefer a gentler learning curve."
    },
    {
      category: "Backend Framework",
      primary: "Node.js/Express",
      alternatives: ["Django", "Ruby on Rails"],
      reasoning: "For your backend needs, Node.js with Express offers the best balance of development speed and scalability for your project. JavaScript across the stack will also reduce context switching for your small team."
    },
    {
      category: "Database",
      primary: "PostgreSQL",
      alternatives: ["MongoDB", "Supabase"],
      reasoning: "PostgreSQL provides the reliability and flexibility you'll need as your project scales, while still being manageable for your team size and budget constraints. It's open-source with strong community support."
    },
    {
      category: "State Management",
      primary: "Redux Toolkit",
      alternatives: ["Zustand", "Jotai"],
      reasoning: "Redux Toolkit will provide robust state management for your application with the potential for growth in complexity. Alternatives like Zustand offer a simpler API if your state needs remain modest."
    },
    {
      category: "Styling Solution",
      primary: "Tailwind CSS",
      alternatives: ["styled-components", "Chakra UI"],
      reasoning: "Tailwind CSS will allow your team to build a custom UI efficiently without fighting with CSS specificity issues. It works well with component-based architectures like React."
    },
    {
      category: "Deployment & Hosting",
      primary: "Vercel",
      alternatives: ["Netlify", "AWS Amplify"],
      reasoning: "Vercel provides the simplest deployment workflow for your React frontend with excellent performance. It fits well within your budget while allowing for future scaling."
    }
  ];

  const saveApiKey = () => {
    if (tempApiKey.trim()) {
      localStorage.setItem(API_KEY_STORAGE_KEY, tempApiKey.trim());
      setApiKey(tempApiKey.trim());
      setTempApiKey('');
      toast.success("API Key saved successfully");
      setShowApiKeyModal(false);
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    if (!apiKey) {
      setShowApiKeyModal(true);
      setIsLoading(false);
      return;
    }
    
    try {
      const requestParams = {
        projectName,
        projectType,
        projectDescription,
        teamSize,
        budget,
        timeFrame,
        scalabilityImportance: scalabilityImportance[0],
        learningCurve: learningCurve[0],
        communitySupport,
        enterpriseSupport,
        openSource
      };
      
      const aiRecommendations = await getAIRecommendations(requestParams, apiKey);
      setRecommendations(aiRecommendations);
      toast.success("AI recommendations generated successfully");
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setError(error instanceof Error ? error.message : 'Failed to get recommendations');
      toast.error("Failed to get recommendations. Using fallback data instead.");
      setRecommendations(mockRecommendations);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setProjectName('');
    setProjectType('web');
    setProjectDescription('');
    setTeamSize('small');
    setBudget('medium');
    setTimeFrame('normal');
    setScalabilityImportance([50]);
    setLearningCurve([50]);
    setCommunitySupport(true);
    setEnterpriseSupport(false);
    setOpenSource(true);
    setRecommendations(null);
    setError(null);
  };

  const projectTypes: { value: ProjectType; label: string; description: string }[] = [
    { value: 'web', label: 'Web Application', description: 'Browser-based apps with public or internal access' },
    { value: 'mobile', label: 'Mobile App', description: 'Native or cross-platform mobile applications' },
    { value: 'desktop', label: 'Desktop Application', description: 'Software running on Windows, macOS, or Linux' },
    { value: 'backend', label: 'Backend Service', description: 'APIs, microservices, data processing' },
    { value: 'fullstack', label: 'Full Stack', description: 'Integrated frontend and backend solutions' },
  ];
  
  const teamSizes: { value: TeamSize; label: string }[] = [
    { value: 'solo', label: 'Solo Developer' },
    { value: 'small', label: 'Small Team (2-5)' },
    { value: 'medium', label: 'Medium Team (6-15)' },
    { value: 'large', label: 'Large Team (16-50)' },
    { value: 'enterprise', label: 'Enterprise (50+)' },
  ];
  
  const budgetOptions: { value: Budget; label: string }[] = [
    { value: 'low', label: 'Bootstrap/Minimal' },
    { value: 'medium', label: 'Moderate' },
    { value: 'high', label: 'Substantial' },
    { value: 'enterprise', label: 'Enterprise Level' },
  ];
  
  const timeFrameOptions: { value: TimeFrame; label: string }[] = [
    { value: 'urgent', label: 'ASAP/Urgent' },
    { value: 'normal', label: 'Standard Timeline' },
    { value: 'relaxed', label: 'Flexible' },
    { value: 'longterm', label: 'Long-term Project' },
  ];

  return (
    <div className="container py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="space-y-4 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            AI-Powered Technology Recommendations
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
            Find Your Ideal Tech Stack
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Answer a few questions about your project, and our AI will recommend the optimal technologies based on your specific requirements.
          </p>
          
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowApiKeyModal(true)}
              className="flex items-center"
            >
              <Key className="mr-2 h-4 w-4" />
              {apiKey ? "Change API Key" : "Set OpenAI API Key"}
            </Button>
          </div>
        </div>
        
        {error && (
          <div className="rounded-md bg-destructive/15 p-4 text-destructive">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}
        
        {recommendations ? (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={handleReset} 
                variant="outline" 
                className="flex items-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Start Over
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((rec, index) => (
                <div 
                  key={index}
                  className="relative bg-card border border-border rounded-xl shadow-subtle overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gradient">{rec.category}</h3>
                      <div className="px-2 py-1 bg-primary/10 rounded-md text-xs font-medium text-primary">
                        Recommended
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Check className="h-6 w-6 text-primary" />
                      </div>
                      <div className="font-display text-2xl font-bold">{rec.primary}</div>
                    </div>
                    
                    {rec.alternatives && rec.alternatives.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-foreground/70">Alternatives:</div>
                        <div className="flex flex-wrap gap-2">
                          {rec.alternatives.map((alt, i) => (
                            <div key={i} className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
                              {alt}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-sm text-foreground/70">{rec.reasoning}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Project Information</h3>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="My Amazing App"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                
                <div>
                  <Label htmlFor="projectDescription">Project Description</Label>
                  <Textarea
                    id="projectDescription"
                    placeholder="Briefly describe what your project does and its main features..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="mt-1.5 min-h-[100px]"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Project Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {projectTypes.map((type) => (
                  <div
                    key={type.value}
                    className={cn(
                      "relative p-4 rounded-lg border border-border cursor-pointer transition-all",
                      projectType === type.value 
                        ? "bg-card ring-2 ring-primary shadow-subtle" 
                        : "bg-card/50 hover:bg-card hover:shadow-subtle"
                    )}
                    onClick={() => setProjectType(type.value)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-foreground/70 mt-1">{type.description}</div>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                        projectType === type.value 
                          ? "bg-primary border-primary" 
                          : "border-foreground/30"
                      )}>
                        {projectType === type.value && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Team Size</h3>
                <RadioGroup 
                  value={teamSize} 
                  onValueChange={(value) => setTeamSize(value as TeamSize)}
                  className="space-y-2"
                >
                  {teamSizes.map((size) => (
                    <div key={size.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={size.value} id={`team-${size.value}`} />
                      <Label htmlFor={`team-${size.value}`}>{size.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Budget & Resources</h3>
                <RadioGroup 
                  value={budget} 
                  onValueChange={(value) => setBudget(value as Budget)}
                  className="space-y-2"
                >
                  {budgetOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`budget-${option.value}`} />
                      <Label htmlFor={`budget-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Development Timeframe</h3>
                <RadioGroup 
                  value={timeFrame} 
                  onValueChange={(value) => setTimeFrame(value as TimeFrame)}
                  className="space-y-2"
                >
                  {timeFrameOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`time-${option.value}`} />
                      <Label htmlFor={`time-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Additional Preferences</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Scalability Importance</Label>
                      <span className="text-sm text-foreground/70">{scalabilityImportance[0]}%</span>
                    </div>
                    <Slider
                      value={scalabilityImportance}
                      onValueChange={setScalabilityImportance}
                      max={100}
                      step={1}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Learning Curve Preference</Label>
                      <span className="text-sm text-foreground/70">
                        {learningCurve[0] < 30 ? 'Easier to learn' : learningCurve[0] > 70 ? 'Advanced/Powerful' : 'Balanced'}
                      </span>
                    </div>
                    <Slider
                      value={learningCurve}
                      onValueChange={setLearningCurve}
                      max={100}
                      step={1}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="community-support">Strong Community Support</Label>
                      <Switch
                        id="community-support"
                        checked={communitySupport}
                        onCheckedChange={setCommunitySupport}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enterprise-support">Enterprise/Paid Support</Label>
                      <Switch
                        id="enterprise-support"
                        checked={enterpriseSupport}
                        onCheckedChange={setEnterpriseSupport}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="open-source">Prefer Open Source</Label>
                      <Switch
                        id="open-source"
                        checked={openSource}
                        onCheckedChange={setOpenSource}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <Button 
                type="submit" 
                size="lg"
                disabled={isLoading}
                className="group h-12 px-6 font-medium text-base flex items-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get AI Recommendations
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
      
      <Dialog open={showApiKeyModal} onOpenChange={setShowApiKeyModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>OpenAI API Key</DialogTitle>
            <DialogDescription>
              Enter your OpenAI API key to enable AI-powered recommendations.
              Your key is stored only in your browser's local storage.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              You can get your API key from the <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI Dashboard</a>.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApiKeyModal(false)}>Cancel</Button>
            <Button onClick={saveApiKey}>Save API Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectForm;
