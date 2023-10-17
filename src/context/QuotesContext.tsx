'use client';

import { createContext, useState, useContext } from 'react';
import { CreateQuotes, UpdateQuotes } from '@/interfaces/quotes';
import { quotes as Model } from '@prisma/client';

export const QuotesContext = createContext<{
  quotes: Model[];
  loadQuotes: () => Promise<void>;
  createQuote: (quote: CreateQuotes) => Promise<void>;
  deleteQuote: (id: string) => Promise<void>;
  selectedQuote: Model | null;
  setSelectedQuote: (quote: Model | null) => void;
  updateQuote: (id: string, quote: UpdateQuotes) => Promise<void>;
  isPreview: boolean;
  setIsPreview: (isPreview: boolean) => void,
}>({
  quotes: [],
  loadQuotes: async () => {},
  createQuote: async (quote: CreateQuotes) => {},
  deleteQuote: async (id: string) => {},
  selectedQuote: null,
  setSelectedQuote: (quote: Model | null) => {},
  updateQuote: async (id: string, quote: UpdateQuotes) => {},
  isPreview: true,
  setIsPreview: (isPreview: boolean) => {},
});

export const useQuotes = () => {
  const context = useContext(QuotesContext);
  if (!context) {
    throw new Error("useQuotes must be used within a QuotesProvider");
  }
  return context;
};

export const QuotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [quotes, setQuotes] = useState<Model[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Model | null>(null);
  const [isPreview, setIsPreview] = useState(true);

  async function loadQuotes() {
    const res = await fetch("/api/quotes");
    const quotesRes = await res.json();
    setQuotes(quotesRes.data);
  }

  async function createQuote(quote: CreateQuotes) {
    const res = await fetch("/api/quotes", {
      method: "POST",
      body: JSON.stringify(quote),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newQuote = await res.json();
    setQuotes([...quotes, newQuote]);
  }

  async function deleteQuote(id: string) {
    const res = await fetch(`/api/quotes/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setQuotes(quotes.filter((quote) => quote.id !== id));
  }

  async function updateQuote(id: string, quote: UpdateQuotes) {
    const res = await fetch(`/api/quotes/${id}`, {
      method: "PUT",
      body: JSON.stringify(quote),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setQuotes(quotes.map((quote) => (quote.id === id ? data : quote)));
  }

  return (
    <QuotesContext.Provider
      value={{
        quotes,
        loadQuotes,
        createQuote,
        deleteQuote,
        selectedQuote,
        setSelectedQuote,
        updateQuote,
        setIsPreview,
        isPreview,
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
};