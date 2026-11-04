import crypto from 'crypto';

// TEMPORARY: production test of the /dc-thermes/paiement checkout at 1 MAD. Remove after the test.
// The test link carries ?test=<code>. The repository is public, so only the SHA-256 of the code is
// stored here: without the code itself, every booking pays the normal price.
// Only /dc-thermes/paiement/reservation forwards the code, and it stops working on its own after TEST_UNTIL.
const TEST_CODE_SHA256 = '2bcfd531cdf002c1e777266de3edeecf48f475cb12bac432f6ca8435e7a5b57e';
const TEST_UNTIL = Date.parse('2026-11-08T00:00:00+01:00');

// Whole amount charged for a test booking, whatever the cure, guests or deposit
export const DC_THERMES_TEST_AMOUNT = 1;

export function isDcThermesTest(code: unknown): code is string {
  if (typeof code !== 'string' || code.length < 20 || Date.now() >= TEST_UNTIL) return false;
  const hash = crypto.createHash('sha256').update(code).digest();
  return crypto.timingSafeEqual(hash, Buffer.from(TEST_CODE_SHA256, 'hex'));
}
