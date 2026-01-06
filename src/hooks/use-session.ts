import { SESSION_NAME } from '@/constants/auth';
import { sessionSchema, type Session } from '@/types/auth';
import { useCallback, useState } from 'react';

export function getSession() {
  const raw = localStorage.getItem(SESSION_NAME);
  if (!raw) return null;
  const parsed = sessionSchema.safeParse(JSON.parse(raw));
  return parsed.success ? parsed.data : null;
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(() => getSession());

  const setSessionData = useCallback((data: Session) => {
    localStorage.setItem(SESSION_NAME, JSON.stringify(data));
    setSession(data);
  }, []);

  const updateSession = useCallback((partial: Partial<Session>) => {
    setSession((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...partial };
      localStorage.setItem(SESSION_NAME, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(SESSION_NAME);
    setSession(null);
  }, []);

  return {
    session,
    isAuthenticated: !!session,
    setSession: setSessionData,
    updateSession,
    clearSession,
  };
}
