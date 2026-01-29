const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Converts a string password into a CryptoKey material
 * that can be used for key derivation.
 */
const getPasswordKey = (password: string): Promise<CryptoKey> =>
  window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

/**
 * Derives a strong 256-bit AES-GCM key from the password key and a salt.
 */
const deriveKey = (
  passwordKey: CryptoKey,
  salt: Uint8Array,
  keyUsage: KeyUsage[],
): Promise<CryptoKey> =>
  window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      // The fix: cast salt to BufferSource or use salt.buffer as ArrayBuffer
      salt: salt.buffer as ArrayBuffer,
      iterations: 100000,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    keyUsage,
  );

/**
 * Encrypts a string and returns a Base64 string containing [salt + iv + ciphertext]
 */
export async function encryptData(
  secret: string,
  data: string,
): Promise<string> {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const passwordKey = await getPasswordKey(secret);
  const aesKey = await deriveKey(passwordKey, salt, ['encrypt']);

  const encryptedContent = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    encoder.encode(data),
  );

  // Buffer assembly: [SALT (16) | IV (12) | CONTENT (...)]
  const encryptedArray = new Uint8Array(
    salt.byteLength + iv.byteLength + encryptedContent.byteLength,
  );
  encryptedArray.set(salt, 0);
  encryptedArray.set(iv, salt.byteLength);
  encryptedArray.set(
    new Uint8Array(encryptedContent),
    salt.byteLength + iv.byteLength,
  );

  // Convert to Base64 safely
  return btoa(String.fromCharCode(...encryptedArray));
}

/**
 * Decrypts a Base64 string back into the original plain text
 */
export async function decryptData(
  secret: string,
  encryptedBase64: string,
): Promise<string> {
  // Convert Base64 back to Uint8Array
  const binaryString = atob(encryptedBase64);
  const fullData = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    fullData[i] = binaryString.charCodeAt(i);
  }

  // Extract the components based on the fixed lengths used during encryption
  const salt = fullData.slice(0, 16);
  const iv = fullData.slice(16, 28);
  const data = fullData.slice(28);

  const passwordKey = await getPasswordKey(secret);
  const aesKey = await deriveKey(passwordKey, salt, ['decrypt']);

  const decryptedContent = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    data,
  );

  return decoder.decode(decryptedContent);
}
