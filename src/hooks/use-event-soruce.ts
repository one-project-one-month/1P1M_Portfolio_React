import { API_CONFIG } from '@/config/api';
import { useEffect, useRef, useState } from 'react';

export default function useEventSource<T = any>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const eventSourceRef = useRef<EventSource | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!url) return;

    const fullUrl = `${API_CONFIG.API_URL}${url}`;

    const connect = () => {
      const es = new EventSource(fullUrl);
      eventSourceRef.current = es;

      es.onopen = () => {
        setIsConnected(true);
        console.log('connected');
        setError(null);
      };

      es.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          setData(parsed);
        } catch {
          // fallback if server doesn't send JSON
          setData(event.data as any);
        }
      };

      es.onerror = () => {
        setIsConnected(false);
        setError('Connection lost. Retrying...');

        es.close();

        // retry after 3 seconds
        retryTimeoutRef.current = setTimeout(() => {
          connect();
        }, 3000);
      };
    };

    connect();

    return () => {
      eventSourceRef.current?.close();
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, [url]);

  return {
    data,
    error,
    isConnected,
  };
}
