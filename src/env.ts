import { z } from 'zod';

const serverSchema = z.object({
  GSCRIPT_URL: z.string().url(),
});

function getServerEnv() {
  const rawEnv = {
    GSCRIPT_URL: process.env.GSCRIPT_URL ?? process.env.NEXT_PUBLIC_GSCRIPT_URL,
  } as Record<string, string | undefined>;

  const parsed = serverSchema.safeParse(rawEnv);
  if (!parsed.success) {
    // Surface a small, safe error without leaking env
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new Error(`Invalid environment variables: ${issues}`);
  }

  return parsed.data;
}

export const env = getServerEnv();
