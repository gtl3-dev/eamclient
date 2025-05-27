import 'server-only'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}
 
export async function createSession(realmId) {
  const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)  // 1 day
  const session = await encrypt({ realmId, expiresAt })
  const cookieStore = await cookies();
  // cookieStore.set('eamSession', session);
  cookieStore.set('eamSession', session, {
    httpOnly: true,
    // secure: true,
    path: '/',
    sameSite: 'lax',
    expires: expiresAt,
  });
  console.log("END createSession: ", session);
}

export async function setAuthCookies(accessToken, refreshToken) {
  const cookieStore = await cookies()
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax'
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax'
  });
    console.log("END setAuthCookies! ");
}

export async function setAuthCookies_Session(accessToken, refreshToken, realmId) {
  const cookieStore = await cookies()
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'strict'
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'strict'
  });

  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)  // 1 day
  const session = await encrypt({ realmId, expiresAt });
  cookieStore.set('eamSession', session);
  // cookieStore.set('eamSession', session, {
  //   httpOnly: true,
  //   // secure: true,
  //   path: '/',
  //   sameSite: 'strict',
  //   expires: expiresAt,
  // });
  console.log("END createSession: ", session);
}