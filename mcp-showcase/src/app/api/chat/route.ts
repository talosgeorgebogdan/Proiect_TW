import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-1.5-pro-latest'),
    messages,
    tools: {
      getMcpInfo: tool({
        description: 'Get detailed information about a specific Model Context Protocol (MCP) server or skill.',
        inputSchema: z.object({
          serverName: z.string().describe('The name of the MCP server (e.g., github, vercel, brave)'),
        }),
        execute: async ({ serverName }: { serverName: string }) => {
          // Simulated database for your university presentation
          const mcpDatabase: Record<string, string> = {
            vercel: 'The Vercel MCP allows AI agents to manage deployments and environment variables.',
            github: 'The GitHub MCP enables AI to read repositories, create pull requests, and manage issues.',
            brave: 'The Brave Search MCP gives AI agents real-time access to the web for research.',
          };
          
          return {
            info: mcpDatabase[serverName.toLowerCase()] || 'MCP server not found in our registry.'
          };
        },
      }),
      getGithubProfile: tool({
        description: 'Get a GitHub user profile to demonstrate live external API fetching.',
        inputSchema: z.object({
          username: z.string().describe('The GitHub username to fetch.'),
        }),
        execute: async ({ username }: { username: string }) => {
          const res = await fetch(`https://api.github.com/users/${username}`);
          if (!res.ok) return { error: 'User not found' };
          
          const data = await res.json();
          return {
            login: data.login,
            name: data.name,
            bio: data.bio,
            followers: data.followers,
            avatar_url: data.avatar_url,
            html_url: data.html_url,
          };
        },
      }),
      getNpmPackage: tool({
        description: 'Fetch details about an NPM package from the public registry.',
        inputSchema: z.object({
          packageName: z.string().describe('The name of the npm package (e.g., react, tailwindcss)'),
        }),
        execute: async ({ packageName }: { packageName: string }) => {
          const res = await fetch(`https://registry.npmjs.org/${packageName}`);
          if (!res.ok) return { error: 'Package not found in NPM registry' };
          
          const data = await res.json();
          return {
            name: data.name,
            description: data.description,
            version: data['dist-tags']?.latest || 'unknown',
            license: data.license || 'N/A',
            homepage: data.homepage,
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
