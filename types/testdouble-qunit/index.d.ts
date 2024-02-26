// Remove when types are fixed upstream
// https://github.com/alexlafroscia/testdouble-qunit/issues/203

import * as QUnit from 'qunit';
import { VerificationConfig, verify } from 'testdouble';
interface VerifyContainer {
  verify: typeof verify;
}
declare global {
  interface Assert {
    /**
     * Verify a specific function call to a stubbed function.
     */
    verify(a: unknown, config?: VerificationConfig): void;
    verify(a: unknown, message?: string): void;
    verify(a: unknown, config: VerificationConfig, message: string): void;
  }
}
/**
 * Injects the `verify` assert into QUnit
 *
 * @param {Object} QUnit a reference to QUnit
 * @param {Object} td a reference to testdouble
 */
export default function addVerifyToQunit(
  QUnit: QUnit,
  td: VerifyContainer,
): void;
export {};
