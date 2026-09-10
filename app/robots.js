import { SITE_URL } from './lib/business';

// Generates /robots.txt
export default function robots() {
  return {
    rules: [
      // Standard search crawlers
      { userAgent: '*', allow: '/' },

      // ---- AEO / GEO: explicitly welcome AI answer-engine crawlers ----
      // Many sites accidentally block these and vanish from AI answers.
      // Allowing them lets Quick Clean be cited by ChatGPT, Perplexity,
      // Google AI Overviews, Claude, etc.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    
  };
}
