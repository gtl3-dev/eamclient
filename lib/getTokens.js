"use server";

import { cookies } from 'next/headers';
import ErrorModal from '@/app/components/ErrorModal';

export async function getAccessToken() {
  const cookieStore = await cookies();
  const accessT = cookieStore.get('accessToken');
  console.log("AcccessT: ", accessT);
  if (!accessT) {
    return (
      <ErrorModal 
        title={`Not Authenticated`}
        body={`Please Login to Intuit.  Your Access Token is expired or invalid`}
      />
    )
  }
  return accessT.value;
}
export async function getRefreshToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get('refreshToken')
  return token
}

export async function delCookie(cookiename) {
  (await cookies()).delete(cookiename);
}