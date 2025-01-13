This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

ensure your .eslintrc.json file looks like this

```bash
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "standard",
    "plugin:tailwindcss/recommended",
    "prettier"
  ],
  "plugins": ["import"],
  "rules": {
    "import/order": [
      "error",
      {
        "groups": [
          "builtin", // Built-in types are first
          "external", // External libraries
          "internal", // Internal modules
          ["parent", "sibling"], // Parent and sibling types can be mingled together
          "index", // Then the index file
          "object" // Object imports
        ],
        "newlines-between": "always",
        "pathGroups": [
          {
            "pattern": "@app/**",
            "group": "external",
            "position": "after"
          }
        ],
        "pathGroupsExcludedImportTypes": ["builtin"],
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  },
  "ignorePatterns": ["components/ui/**"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "no-undef": "off"
      }
    }
  ]
}

```

run the follong commands to install the Eslint & prettier plugin define in the .eslintrc.json file 

```bash
npm i eslint-plugin-standard
npm i eslint-config-prettier
npm i eslint-plugin-tailwindcss
npm i eslint-plugin-import --save-dev
```


create a .vscode/settings.json in the project root folder add the following Eslint & Prettier Setups 

```bash

{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
        "source.addMissingImports": "explicit"
    },
    "prettier.tabWidth": 2,
    "prettier.useTabs": false,
    "prettier.semi": true,
    "prettier.singleQuote": false,
    "prettier.jsxSingleQuote": false,
    "prettier.trailingComma": "es5",
    "prettier.arrowParens": "always",
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "typescript.tsdk": "node_modules/typescript/lib"
}

```

then on vscode editor press 'ctr+shift+p' and type 'Restart Eslint Server'

for the environment varable reach out, on whatsapp.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
