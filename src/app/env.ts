export const SIGNING_KEY = checkEnvVar("SIGNING_KEY");

function checkEnvVar(envVar: string): string {
  if (!envVar) {
    console.warn(`Missing environment variable: ${envVar}`);
  }

  return process.env[envVar] ?? "";
}
