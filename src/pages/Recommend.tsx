
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProjectForm from '@/components/ProjectForm';
import { Button } from '@/components/ui/button';
import { Key } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const API_KEY_STORAGE_KEY = 'openai_api_key';

const Recommend = () => {
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(API_KEY_STORAGE_KEY) || '');
  const [tempApiKey, setTempApiKey] = useState('');

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

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempApiKey(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveApiKey();
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                AI-Powered Stack Recommendations
              </h1>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Our AI analyzes your project requirements and recommends the optimal technologies for your specific needs.
              </p>
              
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={() => setShowApiKeyModal(true)}
                  className="flex items-center gap-2"
                  size="lg"
                >
                  <Key className="h-5 w-5" />
                  {apiKey ? "Change OpenAI API Key" : "Set OpenAI API Key"}
                </Button>
              </div>
            </div>
            
            <ProjectForm apiKey={apiKey} />
          </div>
        </div>
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
                type="text"
                placeholder="sk-..."
                value={tempApiKey}
                onChange={handleKeyChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
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
    </Layout>
  );
};

export default Recommend;
