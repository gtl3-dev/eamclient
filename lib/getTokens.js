"use server";

import { cookies } from 'next/headers';

export async function getAccessToken() {
  const cookieStore = await cookies();
  const accessT = cookieStore.get('accessToken');
  console.log("AcccessT: ", accessT);
  if (!accessT) {
    return (
      <ErrorModal 
        title={`Not Authenticated`}
        body={`Please Login to see the report`}
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