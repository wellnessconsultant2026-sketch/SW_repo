import crypto from 'crypto';

const configuredPassword = process.env.ADMIN_PASSWORD;
const developmentPassword = process.env.NODE_ENV === 'production' ? null : 'mayank@peace2026';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH ||
  (configuredPassword || developmentPassword
    ? crypto.createHash('sha256').update(configuredPassword || developmentPassword).digest('hex')
    : null);

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_SECRET ||
  (process.env.NODE_ENV === 'production' ? null : 'dr_mayank_peace_secret_key_2026_sanctuary');
const JWT_ISSUER = 'dr-mayank-admin';
const JWT_TTL_SECONDS = 7 * 24 * 60 * 60;

function base64UrlEncode(value) {
  return Buffer.from(value).toString('base64url');
}

function base64UrlDecode(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function signJwt(input) {
  return crypto.createHmac('sha256', JWT_SECRET).update(input).digest('base64url');
}

export function verifyPassword(password) {
  if (!password || !ADMIN_PASSWORD_HASH) return false;
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(ADMIN_PASSWORD_HASH));
}

export function createJwt() {
  if (!JWT_SECRET) {
    throw new Error('ADMIN_JWT_SECRET must be configured in production');
  }
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64UrlEncode(JSON.stringify({
    sub: 'admin',
    role: 'admin',
    iss: JWT_ISSUER,
    iat: issuedAt,
    exp: issuedAt + JWT_TTL_SECONDS
  }));
  const signingInput = `${header}.${payload}`;
  return `${signingInput}.${signJwt(signingInput)}`;
}

export function verifyJwt(token) {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [encodedHeader, encodedPayload, signature] = parts;
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = signJwt(signingInput);

  try {
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return false;
    }

    const header = JSON.parse(base64UrlDecode(encodedHeader));
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);

    return header.alg === 'HS256' &&
      header.typ === 'JWT' &&
      payload.sub === 'admin' &&
      payload.role === 'admin' &&
      payload.iss === JWT_ISSUER &&
      Number.isInteger(payload.exp) &&
      payload.exp > now;
  } catch {
    return false;
  }
}

export function checkAuthFromRequest(request) {
  // Check Authorization header
  const authHeader = request.headers.get('authorization') || '';
  const bearerToken = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (bearerToken && verifyJwt(bearerToken)) {
    return true;
  }

  // Check cookie
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/admin_token=([^;]+)/);
  if (match && match[1] && verifyJwt(decodeURIComponent(match[1]))) {
    return true;
  }

  return false;
}
