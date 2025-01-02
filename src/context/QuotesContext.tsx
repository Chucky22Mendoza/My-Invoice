'use client';

import React, {
  createContext,
  useState,
  useContext,
  useMemo,
} from 'react';
import { quotes as Model } from '@prisma/client';
import { CreateQuotes, UpdateQuotes } from '@/interfaces/quotes';

type PropsContext = {
  quotes: Model[];
  loadQuotes: () => Promise<void>;
  createQuote: (quote: CreateQuotes) => Promise<void>;
  deleteQuote: (id: string) => Promise<void>;
  selectedQuote: Model | null;
  setSelectedQuote: (quote: Model | null) => void;
  updateQuote: (id: string, quote: UpdateQuotes) => Promise<void>;
  isPreview: boolean;
  setIsPreview: (isPreview: boolean) => void;
};

const initState: PropsContext = {
  quotes: [],
  loadQuotes: async () => {},
  createQuote: async () => {},
  deleteQuote: async () => {},
  selectedQuote: null,
  setSelectedQuote: () => {},
  updateQuote: async () => {},
  isPreview: true,
  setIsPreview: () => {},
};

export const QuotesContext = createContext<PropsContext>(initState);

export const useQuotes = () => {
  const context = useContext(QuotesContext);
  if (!context) {
    throw new Error('useQuotes must be used within a QuotesProvider');
  }
  return context;
};

export function QuotesProvider({ children }: { children: React.ReactNode }) {
  const [quotes, setQuotes] = useState<Model[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Model | null>(null);
  const [isPreview, setIsPreview] = useState(true);

  async function loadQuotes() {
    const res = await fetch('/api/quotes');
    const quotesRes = await res.json();
    setQuotes(quotesRes.data);
  }

  async function createQuote(quote: CreateQuotes) {
    const res = await fetch('/api/quotes', {
      method: 'POST',
      body: JSON.stringify(quote),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newQuote = await res.json();
    setQuotes([...quotes, newQuote]);
  }

  async function deleteQuote(id: string) {
    const res = await fetch(`/api/quotes/${id}`, {
      method: 'DELETE',
    });
    await res.json();
    setQuotes(quotes.filter((quote) => quote.id !== id));
  }

  async function updateQuote(id: string, quote: UpdateQuotes) {
    const res = await fetch(`/api/quotes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(quote),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setQuotes(quotes.map((q) => (q.id === id ? data : q)));
  }

  const valuesChanged = useMemo(() => ({
    quotes,
    loadQuotes,
    createQuote,
    deleteQuote,
    selectedQuote,
    setSelectedQuote,
    updateQuote,
    setIsPreview,
    isPreview,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [
    quotes,
    isPreview,
    selectedQuote,
  ]);

  return (
    <QuotesContext.Provider value={valuesChanged}>
      {children}
    </QuotesContext.Provider>
  );
}
