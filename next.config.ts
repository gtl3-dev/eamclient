import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    SERVERAPI_HOST: process.env.SERVERAPI_HOST,
    SERVERAPI_KEY_VALUE: process.env.SERVERAPI_KEY_VALUE,
    SERVERAPI_SECRET_VALUE: process.env.SERVERAPI_SECRET_VALUE,
    SESSION_SECRET: process.env.SESSION_SECRET,
  }
};

export default nextConfig;
