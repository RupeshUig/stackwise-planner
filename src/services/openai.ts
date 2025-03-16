
interface OpenAIRequestParams {
  projectName: string;
  projectType: string;
  projectDescription: string;
  teamSize: string;
  budget: string;
  timeFrame: string;
  scalabilityImportance: number;
  learningCurve: number;
  communitySupport: boolean;
  enterpriseSupport: boolean;
  openSource: boolean;
}

export async function getAIRecommendations(params: OpenAIRequestParams, apiKey: string) {
  if (!apiKey) {
    throw new Error("OpenAI API key is required");
  }

  try {
    const prompt = generatePrompt(params);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a technology stack advisor. You provide recommendations for technologies based on project requirements.
            Always provide recommendations in the following JSON format:
            [
              {
                "category": "Frontend Framework",
                "primary": "React",
                "alternatives": ["Vue.js", "Svelte"],
                "reasoning": "Explanation for recommendation based on inputs..."
              },
              ...more categories...
            ]
            Include recommendations for: Frontend Framework, Backend Framework, Database, State Management, Styling Solution, and Deployment & Hosting.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get recommendations');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No recommendations received');
    }

    // Extract JSON from the response
    try {
      // Find JSON in the response (it might be surrounded by markdown code blocks)
      const jsonMatch = content.match(/\[\s*{\s*"category"/s);
      const startIndex = jsonMatch ? content.indexOf(jsonMatch[0]) : 0;
      const jsonContent = content.substring(startIndex);
      
      return JSON.parse(jsonContent);
    } catch (e) {
      console.error('Failed to parse JSON from response:', e);
      console.log('Raw response:', content);
      throw new Error('Invalid recommendations format received');
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
}

function generatePrompt(params: OpenAIRequestParams): string {
  return `Please recommend technology stack options for a project with the following requirements:

Project Name: ${params.projectName || 'Untitled Project'}
Project Type: ${params.projectType}
Description: ${params.projectDescription || 'No description provided'}

Team Size: ${params.teamSize}
Budget: ${params.budget}
Time Frame: ${params.timeFrame}

Additional Preferences:
- Scalability Importance: ${params.scalabilityImportance}%
- Learning Curve Preference: ${params.learningCurve < 30 ? 'Easier to learn' : params.learningCurve > 70 ? 'Advanced/Powerful' : 'Balanced'}
- Community Support: ${params.communitySupport ? 'Important' : 'Not a priority'}
- Enterprise/Paid Support: ${params.enterpriseSupport ? 'Required' : 'Not required'}
- Open Source: ${params.openSource ? 'Preferred' : 'Not a requirement'}

Provide a comprehensive technology stack recommendation that includes frontend framework, backend framework, database, state management, styling solution, and deployment options. For each category, provide a primary recommendation and alternatives with reasoning that directly relates to the project requirements above.`;
}
