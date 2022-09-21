import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";

const fullConfig = resolveConfig(tailwindConfig);

export function useTailwindColors() {
  return fullConfig.theme?.colors;
}

export function useTailwindConfig() {
  return fullConfig;
}
