import { API_CONFIG } from '@/config/api';
import { useEffect, useRef, useState } from 'react';

type Listener = {
  event: string;
  handler: (e: MessageEvent) => void;
};

export default function useEventSource(url: string | null) {
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const eventSourceRef = useRef<EventSource | null>(null);
  const listenersRef = useRef<Listener[]>([]);

  useEffect(() => {
    if (!url) return;

    const fullUrl = `${API_CONFIG.API_URL}${url}`;
    const es = new EventSource(fullUrl);
    eventSourceRef.current = es;

    es.onopen = () => {
      setIsConnected(true);
      setError(null);

      listenersRef.current.forEach(({ event, handler }) => {
        es.addEventListener(event, handler);
      });
    };

    es.onerror = () => {
      setIsConnected(false);
      setError('Connection lost');
    };

    return () => {
      es.close();
      eventSourceRef.current = null;
    };
  }, []);

  const addListener = (event: string, handler: (e: MessageEvent) => void) => {
    listenersRef.current.push({ event, handler });

    eventSourceRef.current?.addEventListener(event, handler);
  };

  const removeListener = (
    event: string,
    handler: (e: MessageEvent) => void,
  ) => {
    listenersRef.current = listenersRef.current.filter(
      (l) => l.event !== event || l.handler !== handler,
    );

    eventSourceRef.current?.removeEventListener(event, handler);
  };

  return {
    error,
    isConnected,
    addListener,
    removeListener,
  };
}
