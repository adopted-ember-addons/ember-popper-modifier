import { helper } from "@ember/component/helper";
import { createModifier } from "../index";

export function buildPopperModifier([name, positionalOptions], optionsHash) {
  const options = {
    ...positionalOptions,
    ...optionsHash,
  };

  return createModifier({
    name,
    options,
  });
}

export default helper(buildPopperModifier);
