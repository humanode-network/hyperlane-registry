// The YAML lint configuration this repository used to import from
// `@hyperlane-xyz/utils/eslint-rules` (utils 20.1.0). Utils 30.0.0 no longer
// exports it (upstream's "feat: nuke eslint", hyperlane-monorepo #8468), so it
// lives here, ported from `typescript/utils/src/eslint-rules` at the commit
// before that change. The array sorting itself still comes from utils.

import eslintPluginYml from 'eslint-plugin-yml';
import yamlParser from 'yaml-eslint-parser';
import YAML from 'yaml';

import { sortNestedArrays, transformYaml } from '@humanode-hyperlane/utils';

const sortYamlArrays = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Sort YAML arrays based on specified keys',
      category: 'Stylistic Issues',
      recommended: true,
      url: null,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          arrays: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                path: { type: 'string' },
                sortKey: { type: 'string' },
              },
              required: ['path', 'sortKey'],
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const options = context.options[0] || {};
    const sortConfig = { arrays: options.arrays || [] };

    return {
      Program(node) {
        if (!context.filename.endsWith('.yaml') && !context.filename.endsWith('.yml')) {
          return;
        }

        try {
          const yamlText = sourceCode.getText();
          const yamlData = YAML.parse(yamlText);

          if (!yamlData) return;

          const sortedData = sortNestedArrays(yamlData, sortConfig);

          const sortedYaml = YAML.stringify(sortedData);
          const originalYaml = YAML.stringify(yamlData);

          if (sortedYaml !== originalYaml) {
            context.report({
              node,
              message: 'YAML arrays should be sorted by specified keys',
              fix(fixer) {
                const finalText = transformYaml(sourceCode.getText(), (data) =>
                  sortNestedArrays(data, sortConfig),
                );

                return fixer.replaceText(node, finalText.trimEnd());
              },
            });
          }
        } catch (error) {
          context.report({
            node,
            message: `Error processing YAML: ${
              error instanceof Error ? error.message : String(error)
            }`,
          });
        }
      },
    };
  },
};

export const sortYamlArraysPlugin = {
  name: '@hyperlane/sort-yaml-arrays',
  rules: {
    'sort-yaml-arrays': sortYamlArrays,
  },
};

export const yamlEslintConfig = [
  ...eslintPluginYml.configs['flat/standard'],
  {
    languageOptions: {
      parser: yamlParser,
    },
    plugins: {
      hyperlane: sortYamlArraysPlugin,
    },
    rules: {
      'yml/sort-keys': ['error'],
      'yml/flow-mapping-curly-spacing': ['error', 'always'],
      'yml/sort-sequence-values': [
        'error',
        {
          pathPattern: '.*',
          order: {
            type: 'asc',
            caseSensitive: true,
            natural: false,
          },
          minValues: 2,
        },
      ],
      'hyperlane/sort-yaml-arrays': [
        'error',
        {
          arrays: [
            { path: 'tokens', sortKey: 'chainName' },
            { path: 'tokens[].connections', sortKey: 'token' },
            { path: '*.interchainSecurityModule.modules', sortKey: 'type' },
            {
              path: '*.interchainSecurityModule.modules[].domains.*.modules',
              sortKey: 'type',
            },
          ],
        },
      ],
    },
  },
];
