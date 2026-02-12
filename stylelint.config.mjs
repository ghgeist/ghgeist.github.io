export default {
  ignoreFiles: ["dist/**", "node_modules/**"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["source", "theme", "utility", "variant", "custom-variant", "apply", "layer"],
      },
    ],
  },
};
