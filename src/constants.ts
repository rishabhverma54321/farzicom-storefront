export const apiUrl = process.env.NEXT_PUBLIC_API_URI || process.env.API_URI || "";
export const restApiUrl = process.env.NEXT_PUBLIC_REST_API_URL || process.env.REST_API_URL;
export const apiUrlSSR =
  process.env.NEXT_PUBLIC_API_INTERNAL_HOST || process.env.NEXT_PUBLIC_API_URI;
export const sentryDsn = process.env.SENTRY_DSN;
// const sampleRate = parseFloat(process.env.SENTRY_APM);
// export const sentrySampleRate = isNaN(sampleRate) ? 0 : sampleRate;
// export const serviceWorkerTimeout =
//   parseInt(process.env.SERVICE_WORKER_TIMEOUT, 10) || 60 * 1000;
export const demoMode = process.env.DEMO_MODE === "true";
export const gtmId = process.env.GTM_ID;
export const clevertapID = process.env.CLEVERTAP_ID;
