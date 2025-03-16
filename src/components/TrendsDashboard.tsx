
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Percent, BarChart2, PieChart as PieChartIcon, LineChart as LineIcon, ArrowUp, ArrowDown, Minus } from 'lucide-react';

// Mock data
const trendingData = [
  { name: 'React', value: 92, change: 5, trend: 'up' },
  { name: 'Next.js', value: 88, change: 12, trend: 'up' },
  { name: 'Vue', value: 75, change: -2, trend: 'down' },
  { name: 'Angular', value: 65, change: -5, trend: 'down' },
  { name: 'Svelte', value: 58, change: 15, trend: 'up' },
  { name: 'Ruby on Rails', value: 45, change: -8, trend: 'down' },
  { name: 'Laravel', value: 40, change: 0, trend: 'neutral' },
  { name: 'Django', value: 52, change: 3, trend: 'up' },
  { name: 'Express.js', value: 78, change: 2, trend: 'up' },
  { name: 'Flask', value: 44, change: -1, trend: 'down' },
];

const frontendMonthlyData = [
  { month: 'Jan', React: 82, Vue: 72, Angular: 67, Svelte: 38 },
  { month: 'Feb', React: 83, Vue: 73, Angular: 65, Svelte: 40 },
  { month: 'Mar', React: 86, Vue: 74, Angular: 63, Svelte: 42 },
  { month: 'Apr', React: 87, Vue: 73, Angular: 62, Svelte: 45 },
  { month: 'May', React: 88, Vue: 74, Angular: 63, Svelte: 47 },
  { month: 'Jun', React: 89, Vue: 73, Angular: 65, Svelte: 49 },
  { month: 'Jul', React: 90, Vue: 73, Angular: 64, Svelte: 51 },
  { month: 'Aug', React: 91, Vue: 74, Angular: 63, Svelte: 53 },
  { month: 'Sep', React: 92, Vue: 74, Angular: 62, Svelte: 55 },
  { month: 'Oct', React: 91, Vue: 75, Angular: 64, Svelte: 58 },
  { month: 'Nov', React: 92, Vue: 74, Angular: 65, Svelte: 57 },
  { month: 'Dec', React: 92, Vue: 75, Angular: 65, Svelte: 58 },
];

const backendMonthlyData = [
  { month: 'Jan', Node: 76, Django: 48, Rails: 52, Laravel: 38 },
  { month: 'Feb', Node: 77, Django: 48, Rails: 51, Laravel: 39 },
  { month: 'Mar', Node: 77, Django: 49, Rails: 49, Laravel: 39 },
  { month: 'Apr', Node: 76, Django: 50, Rails: 48, Laravel: 40 },
  { month: 'May', Node: 77, Django: 51, Rails: 47, Laravel: 41 },
  { month: 'Jun', Node: 77, Django: 52, Rails: 46, Laravel: 40 },
  { month: 'Jul', Node: 78, Django: 52, Rails: 45, Laravel: 40 },
  { month: 'Aug', Node: 77, Django: 51, Rails: 46, Laravel: 40 },
  { month: 'Sep', Node: 78, Django: 52, Rails: 45, Laravel: 40 },
  { month: 'Oct', Node: 77, Django: 52, Rails: 44, Laravel: 40 },
  { month: 'Nov', Node: 78, Django: 52, Rails: 45, Laravel: 40 },
  { month: 'Dec', Node: 79, Django: 52, Rails: 45, Laravel: 40 },
];

const databaseMonthlyData = [
  { month: 'Jan', PostgreSQL: 70, MongoDB: 65, MySQL: 62, Redis: 45 },
  { month: 'Feb', PostgreSQL: 71, MongoDB: 66, MySQL: 61, Redis: 46 },
  { month: 'Mar', PostgreSQL: 72, MongoDB: 65, MySQL: 60, Redis: 47 },
  { month: 'Apr', PostgreSQL: 74, MongoDB: 66, MySQL: 59, Redis: 48 },
  { month: 'May', PostgreSQL: 75, MongoDB: 67, MySQL: 58, Redis: 49 },
  { month: 'Jun', PostgreSQL: 76, MongoDB: 68, MySQL: 57, Redis: 50 },
  { month: 'Jul', PostgreSQL: 77, MongoDB: 68, MySQL: 57, Redis: 51 },
  { month: 'Aug', PostgreSQL: 78, MongoDB: 69, MySQL: 56, Redis: 52 },
  { month: 'Sep', PostgreSQL: 79, MongoDB: 70, MySQL: 56, Redis: 53 },
  { month: 'Oct', PostgreSQL: 80, MongoDB: 71, MySQL: 56, Redis: 55 },
  { month: 'Nov', PostgreSQL: 81, MongoDB: 72, MySQL: 55, Redis: 56 },
  { month: 'Dec', PostgreSQL: 82, MongoDB: 73, MySQL: 55, Redis: 57 },
];

const categoryData = [
  { name: 'Frontend', value: 35 },
  { name: 'Backend', value: 30 },
  { name: 'Database', value: 20 },
  { name: 'DevOps', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TrendsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('yearly');
  const [category, setCategory] = useState('frontend');
  
  const getCategoryData = () => {
    switch (category) {
      case 'frontend':
        return frontendMonthlyData;
      case 'backend':
        return backendMonthlyData;
      case 'database':
        return databaseMonthlyData;
      default:
        return frontendMonthlyData;
    }
  };
  
  const getCategoryColors = () => {
    switch (category) {
      case 'frontend':
        return { React: '#61dafb', Vue: '#42b883', Angular: '#dd0031', Svelte: '#ff3e00' };
      case 'backend':
        return { Node: '#68a063', Django: '#092e20', Rails: '#cc0000', Laravel: '#ff2d20' };
      case 'database':
        return { PostgreSQL: '#336791', MongoDB: '#4DB33D', MySQL: '#4479A1', Redis: '#DC382D' };
      default:
        return { React: '#61dafb', Vue: '#42b883', Angular: '#dd0031', Svelte: '#ff3e00' };
    }
  };
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getTrendClass = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="container py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-4 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Technology Trends
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
            Track What's Hot in Tech
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Stay informed about the latest trends in development technologies. See what's gaining popularity and what's falling out of favor.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoryData.map((item, index) => (
            <Card key={index} className={index === 3 ? "md:col-span-1" : "md:col-span-1"}>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-display">{item.name}</CardTitle>
                <CardDescription>Technology category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{item.value}%</div>
                <p className="text-sm text-foreground/70">of developer focus</p>
              </CardContent>
            </Card>
          ))}
          
          <Card className="md:col-span-3">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl font-display">Trending Technologies</CardTitle>
                  <CardDescription>Top technologies by developer usage and growth</CardDescription>
                </div>
                <div className="flex space-x-4">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Last 30 Days</SelectItem>
                      <SelectItem value="quarterly">Last Quarter</SelectItem>
                      <SelectItem value="yearly">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Ranking</h4>
                    <h4 className="font-medium">Trend</h4>
                  </div>
                  <div className="space-y-3">
                    {trendingData.slice(0, 5).map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between py-2 px-3 rounded-lg border border-border bg-card/50 transition-colors hover:bg-card"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className={`text-sm font-medium mr-1 ${getTrendClass(item.trend)}`}>
                            {item.change > 0 ? '+' : ''}{item.change}%
                          </span>
                          {getTrendIcon(item.trend)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trendingData.slice(0, 5)}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {trendingData.slice(0, 5).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl font-display">Popularity Over Time</CardTitle>
                <CardDescription>How technologies have trended over the past year</CardDescription>
              </div>
              <div className="flex space-x-4">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="line" className="space-y-4">
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="line" className="flex items-center gap-2">
                  <LineIcon className="h-4 w-4" />
                  Line Chart
                </TabsTrigger>
                <TabsTrigger value="bar" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  Bar Chart
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="line" className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={getCategoryData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none' }} />
                    <Legend />
                    {Object.keys(getCategoryData()[0])
                      .filter(key => key !== 'month')
                      .map((key, index) => (
                        <Line 
                          key={key}
                          type="monotone" 
                          dataKey={key} 
                          stroke={getCategoryColors()[key as keyof ReturnType<typeof getCategoryColors>]} 
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      ))}
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="bar" className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getCategoryData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none' }} />
                    <Legend />
                    {Object.keys(getCategoryData()[0])
                      .filter(key => key !== 'month')
                      .map((key, index) => (
                        <Bar 
                          key={key}
                          dataKey={key} 
                          fill={getCategoryColors()[key as keyof ReturnType<typeof getCategoryColors>]} 
                          barSize={20}
                        />
                      ))}
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Rising Stars</CardTitle>
              <CardDescription>Technologies with the biggest growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingData
                  .filter(item => item.trend === 'up')
                  .sort((a, b) => b.change - a.change)
                  .slice(0, 5)
                  .map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/50"
                    >
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <span className="font-medium">{item.name}</span>
                        <Badge variant="outline" className="bg-primary/5 text-primary">+{item.change}%</Badge>
                      </div>
                      <div className="text-sm">{item.value}% adoption</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Declining Technologies</CardTitle>
              <CardDescription>Technologies losing market share</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingData
                  .filter(item => item.trend === 'down')
                  .sort((a, b) => a.change - b.change)
                  .slice(0, 5)
                  .map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/50"
                    >
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="h-5 w-5 text-red-500" />
                        <span className="font-medium">{item.name}</span>
                        <Badge variant="outline" className="bg-red-500/5 text-red-500">{item.change}%</Badge>
                      </div>
                      <div className="text-sm">{item.value}% adoption</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrendsDashboard;
