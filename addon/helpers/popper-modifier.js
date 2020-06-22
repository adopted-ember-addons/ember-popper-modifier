import { helper } from "@ember/component/helper";

export function buildPopperModifier([name, positionalOptions], optionsHash) {
  const options = {
    ...positionalOptions,
    ...optionsHash,
  };

  return {
    name,
    ...options,
  };
}

export default helper(buildPopperModifier);
