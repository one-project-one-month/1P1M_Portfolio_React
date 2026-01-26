import CryptoJS from 'crypto-js';
import type { PersistStorage, StorageValue } from 'zustand/middleware';

const SECRET = import.meta.env.VITE_STORAGE_SECRET;

function encrypt(value: unknown): string {
  return CryptoJS.AES.encrypt(JSON.stringify(value), SECRET).toString();
}

function decrypt<T>(value: string): T | null {
  try {
    const bytes = CryptoJS.AES.decrypt(value, SECRET);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return null;
  }
}

function encodeKey(key: string): string {
  return CryptoJS.SHA256(key + SECRET).toString();
}

export function createSecureStorage<T>(): PersistStorage<T> {
  return {
    getItem(name): StorageValue<T> | null {
      const encodedKey = encodeKey(name);
      const encrypted = localStorage.getItem(encodedKey);
      if (!encrypted) return null;

      return decrypt<StorageValue<T>>(encrypted);
    },

    setItem(name, value: StorageValue<T>) {
      const encodedKey = encodeKey(name);
      const encrypted = encrypt(value);
      localStorage.setItem(encodedKey, encrypted);
    },

    removeItem(name) {
      const encodedKey = encodeKey(name);
      localStorage.removeItem(encodedKey);
    },
  };
}
