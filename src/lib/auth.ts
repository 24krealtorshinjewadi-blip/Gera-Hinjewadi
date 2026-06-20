const encoder = new TextEncoder();

/**
 * Encodes a buffer/TypedArray into base64url format.
 */
function base64url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  const binary = String.fromCharCode(...bytes);
  return btoa(binary)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Decodes a base64url string back into standard string.
 */
function base64urlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

/**
 * Imports a raw string secret into a CryptoKey for HMAC signing and verifying.
 */
async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const keyData = encoder.encode(secret);
  return globalThis.crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export interface SessionPayload {
  role?: string;
  exp?: number;
  [key: string]: unknown;
}

/**
 * Signs a payload with HMAC-SHA256 and returns a stateless session token.
 * Uses Web Crypto API to work in both Node.js and Edge/middleware runtimes.
 */
export async function signToken(payload: SessionPayload, secret: string, expiryMs: number): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Date.now() + expiryMs;
  const fullPayload = { ...payload, exp };

  const encodedHeader = base64url(encoder.encode(JSON.stringify(header)));
  const encodedPayload = base64url(encoder.encode(JSON.stringify(fullPayload)));

  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const key = await getCryptoKey(secret);
  const signatureBuf = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(signatureInput)
  );
  
  const encodedSignature = base64url(signatureBuf);

  return `${signatureInput}.${encodedSignature}`;
}

/**
 * Verifies and decodes a signed session token. Returns null if invalid or expired.
 * Uses Web Crypto API to work in both Node.js and Edge/middleware runtimes.
 */
export async function verifyToken(token: string, secret: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    
    const key = await getCryptoKey(secret);
    
    // Decode signature bytes
    const signatureBytes = Uint8Array.from(base64urlDecode(encodedSignature), c => c.charCodeAt(0));
    
    // Verify using Web Crypto API
    const isValid = await globalThis.crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      encoder.encode(signatureInput)
    );

    if (!isValid) {
      return null;
    }

    const payload = JSON.parse(base64urlDecode(encodedPayload)) as SessionPayload;
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Token has expired
    }

    return payload;
  } catch {
    return null;
  }
}
