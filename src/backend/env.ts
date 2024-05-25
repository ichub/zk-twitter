export const SIGNING_KEY = checkEnvVar("SIGNING_KEY");
export const APP_URL = checkEnvVar("NEXT_PUBLIC_APP_URL");
export const NODE_ENV = checkEnvVar("NODE_ENV");

function checkEnvVar(envVar: string): string {
  if (!envVar) {
    console.warn(`Missing environment variable: ${envVar}`);
  }

  return process.env[envVar] ?? "";
}
