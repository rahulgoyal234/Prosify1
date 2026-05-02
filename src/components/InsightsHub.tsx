import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Search, Sparkles, MoveRight, ExternalLink, Loader2 } from "lucide-react";
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from "motion/react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export const InsightsHub: React.FC = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e?: React.FormEvent, customQuery?: string) => {
    e?.preventDefault();
    const activeQuery = customQuery || query;
    if (!activeQuery.trim()) return;

    setIsLoading(true);
    setResult(null);
    setSources([]);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: activeQuery,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      setResult(response.text || "No insights found.");
      
      const chunks = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[]) || [];
      setSources(chunks.filter(c => c.web?.uri));
    } catch (error) {
      console.error("Search error:", error);
      setResult("I encountered an error fetching the latest insights. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQueries = [
    "Content marketing trends for 2024",
    "B2B content strategy best practices",
    "How is AI changing the technical writing industry?",
    "Best practices for brand storytelling in 2024"
  ];

  return (
    <section id="insights" className="bg-[#faf9f6] text-ink border-y border-gold/15 relative z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-[1200px] w-full mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-[0.5em] uppercase text-gold mb-4 font-black">
            Intelligent Strategy
          </p>
          <h2 className="font-serif text-[clamp(40px,6vw,58px)] font-normal leading-tight text-ink mb-6">
            Insights <span className="italic text-gold">Engine</span>
          </h2>
          <p className="text-[17px] leading-[1.8] text-ink/80 max-w-2xl mx-auto font-light">
            Stay ahead of the curve with real-time industry analysis and content trends, powered by Google Search grounding.
          </p>
        </div>

        <div className="max-w-[800px] mx-auto">
          <form onSubmit={handleSearch} className="relative mb-8 group">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What content strategy trends should we know about?"
              className="w-full bg-white/50 backdrop-blur-sm border border-gold/20 rounded-full py-5 px-8 pr-16 text-lg focus:outline-none focus:border-gold/50 transition-all shadow-lg shadow-gold/5 outline-none"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Search size={22} />}
            </button>
          </form>

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {suggestedQueries.map((q, i) => (
              <button 
                key={i}
                onClick={() => {
                  setQuery(q);
                  handleSearch(undefined, q);
                }}
                className="text-[12px] px-4 py-2 rounded-full border border-gold/10 hover:border-gold/30 hover:bg-gold/5 transition-all text-ink/60 hover:text-gold flex items-center gap-2"
              >
                <Sparkles size={12} />
                {q}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <div className="inline-block p-4 rounded-2xl bg-gold/5 border border-gold/10">
                  <div className="flex items-center gap-3 text-gold">
                    <Loader2 className="animate-spin" size={24} />
                    <span className="font-serif italic text-xl">Consulting the web...</span>
                  </div>
                </div>
              </motion.div>
            )}

            {result && !isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl border border-gold/15 p-8 md:p-12 shadow-2xl"
              >
                <div className="prose prose-gold max-w-none prose-p:text-ink/80 prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-ink">
                  <Markdown>{result}</Markdown>
                </div>

                {sources.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gold/10">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gold font-bold mb-4">Sources Consulted</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sources.map((source, idx) => (
                        <a 
                          key={idx}
                          href={source.web?.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-xl bg-gold/5 border border-gold/10 hover:border-gold/30 transition-all group"
                        >
                          <span className="text-xs text-ink/70 truncate max-w-[200px]">{source.web?.title || 'External Source'}</span>
                          <ExternalLink size={14} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
