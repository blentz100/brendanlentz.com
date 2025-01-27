import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/README.md"],
}, ...compat.extends(
    "@jakejarvis/eslint-config",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        prettier,
    },

    languageOptions: {
        parser: tsParser,
    },

    rules: {
        "react/no-unescaped-entities": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-var-requires": "off",

        "prettier/prettier": ["error", {
            singleQuote: false,
            tabWidth: 2,
            printWidth: 120,
        }],
    },
}, ...compat.extends("plugin:mdx/recommended").map(config => ({
    ...config,
    files: ["**/*.md", "**/*.mdx"],
})), {
    files: ["**/*.md", "**/*.mdx"],

    rules: {
        "react/jsx-no-undef": "off",

        "prettier/prettier": ["error", {
            singleQuote: false,
            tabWidth: 2,
            printWidth: 120,
        }],
    },
}];