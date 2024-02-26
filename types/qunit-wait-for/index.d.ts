// Remove when types are fixed upstream
// https://github.com/alexlafroscia/qunit-wait-for/issues/300

/// <reference types="qunit" />
declare type AssertionCallback = () => Promise<void> | void;
declare type Options = {
  timeout: number;
};
export declare function installWaitFor(QUnit: QUnit): void;
declare global {
  interface Assert {
    waitFor(callback: AssertionCallback, options?: Options): Promise<void>;
  }
}
export {};
