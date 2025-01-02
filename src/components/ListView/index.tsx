import React, { useEffect } from 'react';
import { useQuotes } from '@/context/QuotesContext';
import QuoteCard from './QuoteCard';
import styles from './listView.module.css';

function ListView() {
  const { quotes, loadQuotes, setSelectedQuote } = useQuotes();

  useEffect(() => {
    loadQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      setSelectedQuote(quotes[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotes]);

  const listMapped = quotes.map((quote) => (
    <QuoteCard quote={quote} key={quote.id} />
  ));

  return (
    <div className={styles.list}>
      {listMapped}
    </div>
  );
}

export default ListView;
