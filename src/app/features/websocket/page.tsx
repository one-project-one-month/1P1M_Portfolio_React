import { API_CONFIG } from '@/config/api';
import { useEffect, useMemo, useRef, useState } from 'react';

type ConnStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export default function WebSocketPage() {
  const wsRef = useRef<WebSocket | null>(null);

  const wsUrl = useMemo(() => {
    try {
      const apiUrl = new URL(API_CONFIG.API_URL);
      apiUrl.protocol = apiUrl.protocol === 'https:' ? 'wss:' : 'ws:';
      apiUrl.pathname = '/portfolio/ws/echo';
      apiUrl.search = '';
      return apiUrl.toString();
    } catch {
      const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
      return `${proto}://localhost:8080/portfolio/ws/echo`;
    }
  }, []);

  const [status, setStatus] = useState<ConnStatus>('connecting');
  const [errorText, setErrorText] = useState<string>('');
  const [outgoing, setOutgoing] = useState<string>('hello');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    setStatus('connecting');

    ws.onopen = () => {
      setStatus('connected');
    };

    ws.onmessage = (event) => {
      const text = String(event.data ?? '');
      setMessages((prev) => [...prev.slice(-49), text]);
    };

    ws.onerror = () => {
      setStatus('error');
      setErrorText('WebSocket error');
    };

    ws.onclose = () => {
      setStatus('disconnected');
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [wsUrl]);

  const send = () => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(outgoing);
    setOutgoing('');
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 text-white">
      <h1 className="text-2xl font-semibold">WebSocket Demo</h1>
      <p className="mt-2 text-white/70">
        Endpoint: <span className="font-mono text-sm">{wsUrl}</span>
      </p>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-white/70">Status</div>
            <div className="text-base font-medium">
              {status}
              {errorText ? ` - ${errorText}` : ''}
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 disabled:opacity-50"
            onClick={() => wsRef.current?.close()}
            disabled={!wsRef.current}
          >
            Disconnect
          </button>
        </div>

        <div className="mt-4 flex gap-3">
          <input
            className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm outline-none"
            value={outgoing}
            onChange={(e) => setOutgoing(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send();
            }}
          />
          <button
            type="button"
            className="rounded-lg bg-[#BD7AFD] px-3 py-2 text-sm font-medium text-black hover:bg-[#BD7AFD]/90 disabled:opacity-50"
            onClick={send}
            disabled={status !== 'connected'}
          >
            Send
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm text-white/70">Messages</div>
        <div className="mt-3 max-h-72 overflow-auto rounded-lg border border-white/10 bg-black/20 p-3">
          {messages.length === 0 ? (
            <div className="text-sm text-white/60">No messages yet.</div>
          ) : (
            <div className="space-y-2">
              {messages.map((m, idx) => (
                <div key={`${idx}-${m}`} className="break-words text-sm">
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

