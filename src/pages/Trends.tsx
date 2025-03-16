import React from 'react';
import Layout from '@/components/Layout';
import { BarChart, LineChart, AreaChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Mock data for trends
const popularityData = [
  { name: 'Jan', React: 4000, Vue: 2400, Angular: 2400, Svelte: 1200 },
  { name: 'Feb', React: 4200, Vue: 2500, Angular: 2300, Svelte: 1300 },
  { name: 'Mar', React: 4500, Vue: 2700, Angular: 2200, Svelte: 1400 },
  { name: 'Apr', React: 4700, Vue: 3000, Angular: 2100, Svelte: 1600 },
  { name: 'May', React: 5000, Vue: 3200, Angular: 2000, Svelte: 1800 },
  { name: 'Jun', React: 5200, Vue: 3500, Angular: 1900, Svelte: 2000 },
];

const downloadsData = [
  { name: 'Q1 2023', React: 18000, Vue: 12000, Angular: 10000, Svelte: 6000 },
  { name: 'Q2 2023', React: 19500, Vue: 13000, Angular: 9500, Svelte: 7000 },
  { name: 'Q3 2023', React: 21000, Vue: 14000, Angular: 9000, Svelte: 8000 },
  { name: 'Q4 2023', React: 22500, Vue: 15000, Angular: 8500, Svelte: 9000 },
  { name: 'Q1 2024', React: 24000, Vue: 16000, Angular: 8000, Svelte: 10000 },
  { name: 'Q2 2024', React: 25500, Vue: 17000, Angular: 7500, Svelte: 11000 },
];

const githubStarsData = [
  { name: '2019', React: 120000, Vue: 80000, Angular: 60000, Svelte: 30000 },
  { name: '2020', React: 140000, Vue: 90000, Angular: 65000, Svelte: 40000 },
  { name: '2021', React: 160000, Vue: 100000, Angular: 70000, Svelte: 55000 },
  { name: '2022', React: 180000, Vue: 110000, Angular: 75000, Svelte: 70000 },
  { name: '2023', React: 200000, Vue: 120000, Angular: 80000, Svelte: 90000 },
  { name: '2024', React: 220000, Vue: 130000, Angular: 85000, Svelte: 110000 },
];

// Backend frameworks data
const backendData = [
  { name: 'Jan', Node: 3000, Django: 2000, Rails: 1500, Laravel: 1800 },
  { name: 'Feb', Node: 3200, Django: 2100, Rails: 1400, Laravel: 1900 },
  { name: 'Mar', Node: 3400, Django: 2200, Rails: 1300, Laravel: 2000 },
  { name: 'Apr', Node: 3600, Django: 2300, Rails: 1200, Laravel: 2100 },
  { name: 'May', Node: 3800, Django: 2400, Rails: 1100, Laravel: 2200 },
  { name: 'Jun', Node: 4000, Django: 2500, Rails: 1000, Laravel: 2300 },
];

// Database data
const databaseData = [
  { name: 'Jan', PostgreSQL: 2500, MongoDB: 2200, MySQL: 2000, Redis: 1000 },
  { name: 'Feb', PostgreSQL: 2600, MongoDB: 2300, MySQL: 1900, Redis: 1100 },
  { name: 'Mar', PostgreSQL: 2700, MongoDB: 2400, MySQL: 1800, Redis: 1200 },
  { name: 'Apr', PostgreSQL: 2800, MongoDB: 2500, MySQL: 1700, Redis: 1300 },
  { name: 'May', PostgreSQL: 2900, MongoDB: 2600, MySQL: 1600, Redis: 1400 },
  { name: 'Jun', PostgreSQL: 3000, MongoDB: 2700, MySQL: 1500, Redis: 1500 },
];

const techCategories = [
  { label: "Frontend Frameworks", value: "frontend" },
  { label: "Backend Frameworks", value: "backend" },
  { label: "Databases", value: "database" },
  { label: "State Management", value: "state" },
  { label: "CSS Frameworks", value: "css" },
  { label: "Mobile Frameworks", value: "mobile" },
];

const Trends = () => {
  const [category, setCategory] = React.useState("frontend");
  
  // Select the appropriate data based on the category
  const getCategoryData = (type: string) => {
    switch (category) {
      case "frontend":
        return type === "popularity" ? popularityData : 
               type === "downloads" ? downloadsData : githubStarsData;
      case "backend":
        return backendData;
      case "database":
        return databaseData;
      default:
        return popularityData;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                Technology Trends
              </h1>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Stay informed about the latest trends in technology adoption and popularity.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl shadow-subtle overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <h2 className="text-2xl font-semibold">Technology Adoption Trends</h2>
                  <div className="w-full sm:w-auto max-w-xs">
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {techCategories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <Tabs defaultValue="popularity" className="w-full">
                  <TabsList className="mb-8">
                    <TabsTrigger value="popularity">Popularity</TabsTrigger>
                    <TabsTrigger value="downloads">Downloads</TabsTrigger>
                    <TabsTrigger value="github">GitHub Stars</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="popularity">
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={getCategoryData("popularity")}
                          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          {category === "frontend" && (
                            <>
                              <Line type="monotone" dataKey="React" stroke="#8884d8" strokeWidth={2} />
                              <Line type="monotone" dataKey="Vue" stroke="#82ca9d" strokeWidth={2} />
                              <Line type="monotone" dataKey="Angular" stroke="#ffc658" strokeWidth={2} />
                              <Line type="monotone" dataKey="Svelte" stroke="#ff7300" strokeWidth={2} />
                            </>
                          )}
                          {category === "backend" && (
                            <>
                              <Line type="monotone" dataKey="Node" stroke="#8884d8" strokeWidth={2} />
                              <Line type="monotone" dataKey="Django" stroke="#82ca9d" strokeWidth={2} />
                              <Line type="monotone" dataKey="Rails" stroke="#ffc658" strokeWidth={2} />
                              <Line type="monotone" dataKey="Laravel" stroke="#ff7300" strokeWidth={2} />
                            </>
                          )}
                          {category === "database" && (
                            <>
                              <Line type="monotone" dataKey="PostgreSQL" stroke="#8884d8" strokeWidth={2} />
                              <Line type="monotone" dataKey="MongoDB" stroke="#82ca9d" strokeWidth={2} />
                              <Line type="monotone" dataKey="MySQL" stroke="#ffc658" strokeWidth={2} />
                              <Line type="monotone" dataKey="Redis" stroke="#ff7300" strokeWidth={2} />
                            </>
                          )}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="downloads">
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={getCategoryData("downloads")}
                          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          {category === "frontend" && (
                            <>
                              <Bar dataKey="React" fill="#8884d8" />
                              <Bar dataKey="Vue" fill="#82ca9d" />
                              <Bar dataKey="Angular" fill="#ffc658" />
                              <Bar dataKey="Svelte" fill="#ff7300" />
                            </>
                          )}
                          {category === "backend" && (
                            <>
                              <Bar dataKey="Node" fill="#8884d8" />
                              <Bar dataKey="Django" fill="#82ca9d" />
                              <Bar dataKey="Rails" fill="#ffc658" />
                              <Bar dataKey="Laravel" fill="#ff7300" />
                            </>
                          )}
                          {category === "database" && (
                            <>
                              <Bar dataKey="PostgreSQL" fill="#8884d8" />
                              <Bar dataKey="MongoDB" fill="#82ca9d" />
                              <Bar dataKey="MySQL" fill="#ffc658" />
                              <Bar dataKey="Redis" fill="#ff7300" />
                            </>
                          )}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="github">
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={getCategoryData("github")}
                          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          {category === "frontend" && (
                            <>
                              <Area type="monotone" dataKey="React" stackId="1" fill="#8884d8" stroke="#8884d8" fillOpacity={0.6} />
                              <Area type="monotone" dataKey="Vue" stackId="2" fill="#82ca9d" stroke="#82ca9d" fillOpacity={0.6} />
                              <Area type="monotone" dataKey="Angular" stackId="3" fill="#ffc658" stroke="#ffc658" fillOpacity={0.6} />
                              <Area type="monotone" dataKey="Svelte" stackId="4" fill="#ff7300" stroke="#ff7300" fillOpacity={0.6} />
                            </>
                          )}
                          {category === "backend" && (
                            <>
                              <Area type="monotone" dataKey="Node" stackId="1" fill="#8884d8" stroke="#8884d8" fillOpacity={0.6} />
                              <Area type="monotone" dataKey="Django" stackId="2" fill="#82ca9d" stroke="#82ca9d" fillOpacity={0.6} />
                              <Area type="monotone" dataKey="Rails" stackId="3" fill="#ffc658" stroke="#ffc658" fillOpacity={0.6} />
                              <Area type="monotone" dataKey="Laravel" stackId="4" fill="#ff7300" stroke="#ff7300" fillOpacity={0.6} />
                            </>
                          )}
                          {category === "database" && (
                            <>
                              <Area type="monotone" dataKey="PostgreSQL" stackId="1" fill="#8884d8" stroke="#8884d8" fillOpacity={0.6} />
                              <Area type="monotone" dataKey="MongoDB" stackId="2" fill="#82ca9d" stroke="#82ca9d" fillOpacity={0.6} />
                              <Area type="monotone" dataKey="MySQL" stackId="3" fill="#ffc658" stroke="#ffc658" fillOpacity={0.6} />
                              <Area type="monotone" dataKey="Redis" stackId="4" fill="#ff7300" stroke="#ff7300" fillOpacity={0.6} />
                            </>
                          )}
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Most Popular Frameworks (2024)</CardTitle>
                  <CardDescription>Based on developer surveys and usage data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">React</span>
                        <span>92%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Vue.js</span>
                        <span>76%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Angular</span>
                        <span>65%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Svelte</span>
                        <span>48%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '48%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Solid.js</span>
                        <span>32%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Fastest Growing Technologies</CardTitle>
                  <CardDescription>Year-over-year growth rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Svelte</span>
                        <span>+85%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Solid.js</span>
                        <span>+72%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Next.js</span>
                        <span>+65%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Qwik</span>
                        <span>+58%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '58%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Astro</span>
                        <span>+52%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '52%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Trends;
