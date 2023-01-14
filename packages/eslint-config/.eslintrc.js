module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    'import'
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/indent': [
      'error',
      2
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        singleline: {
          delimiter: 'semi',
          requireLast: true
        }
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: [
          'camelCase',
          'UPPER_CASE'
        ],
        leadingUnderscore: 'allow',
        selector: [
          'variableLike'
        ]
      },
      {
        format: [
          'camelCase'
        ],
        leadingUnderscore: 'allowDouble',
        selector: [
          'typeProperty'
        ]
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/no-var-requires': 'off',
    'arrow-parens': [
      'error',
      'always'
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    curly: 'error',
    'eol-last': 'error',
    error: 'off',
    'function-call-argument-newline': [
      'error',
      'consistent'
    ],
    'function-paren-newline': [
      'error',
      'consistent'
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        pathGroups: [
          {
            pattern: '~**',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '~/**',
            group: 'internal',
            position: 'after'
          }
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1
      }
    ],
    'no-case-declarations': 'error',
    'no-console': [
      'warn'
    ],
    'no-debugger': 'warn',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1
      }
    ],
    'no-trailing-spaces': 'error',
    'no-unused-vars': 'off',
    'no-var': 'error',
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: {
          consistent: true
        },
        ObjectExpression: {
          consistent: true
        },
        ObjectPattern: {
          consistent: true
        }
      }
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'object-property-newline': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'quote-props': [
      'error',
      'as-needed'
    ],
    quotes: [
      'error',
      'single',
      'avoid-escape'
    ],
    semi: [
      'error',
      'always'
    ]
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [
        '*.ts',
        '*.js'
      ]
    }
  },
  overrides: [
    {
      files: [
        '*.ts',
        '*.js'
      ],
      rules: {
        'no-dupe-class-members': 'off'
      }
    },
    {
      files: [
        '*.js'
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    }
  ]
};
