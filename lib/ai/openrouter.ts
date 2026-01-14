/**
 * OpenRouter API client for AI coach integration
 */

import type { ChatMessage } from '@/lib/db/types';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export interface OpenRouterConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
}

export interface OpenRouterResponse {
  content: string;
  error?: string;
}

/**
 * Call OpenRouter API with messages
 */
export async function callOpenRouter(
  messages: ChatMessage[],
  config: OpenRouterConfig
): Promise<OpenRouterResponse> {
  const { apiKey, model = 'anthropic/claude-sonnet-4', maxTokens = 2000 } = config;

  if (!apiKey) {
    return { content: '', error: 'OpenRouter API key not configured.' };
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'AI Running Coach',
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `API error: ${response.status}`;
      return { content: '', error: errorMessage };
    }

    const data = await response.json();

    if (data.error) {
      return { content: '', error: data.error.message || 'Unknown error' };
    }

    if (!data.choices || data.choices.length === 0) {
      return { content: '', error: 'No response from model' };
    }

    return { content: data.choices[0].message.content };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { content: '', error: `Failed to call OpenRouter: ${message}` };
  }
}

/**
 * Create a streaming call to OpenRouter
 */
export async function* streamOpenRouter(
  messages: ChatMessage[],
  config: OpenRouterConfig
): AsyncGenerator<string, void, unknown> {
  const { apiKey, model = 'anthropic/claude-sonnet-4', maxTokens = 2000 } = config;

  if (!apiKey) {
    throw new Error('OpenRouter API key not configured.');
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'X-Title': 'AI Running Coach',
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages,
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No response body');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') return;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            yield content;
          }
        } catch {
          // Skip invalid JSON
        }
      }
    }
  }
}

/**
 * Get available models from OpenRouter
 */
export const AVAILABLE_MODELS = [
  { id: 'anthropic/claude-sonnet-4', name: 'Claude Sonnet 4' },
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
  { id: 'x-ai/grok-4', name: 'Grok 4 (Grocky)' },
  { id: 'openai/gpt-4o', name: 'GPT-4o' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini' },
  { id: 'google/gemini-pro', name: 'Gemini Pro' },
  { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B' },
];
