import { DefaultTheme, defineConfig, HeadConfig } from 'vitepress';
import { version } from '../package.json';
import { imageGroupPlugin, imagePlugin } from './plugins';
import process from "process";

const isProd = process.env.NODE_ENV === 'production';

const url = isProd ? 'https://kayak.netlify.app' : 'http://localhost:3005';
const title = 'Kayak';
const description = 'A tool for cooking e2e tests for web3';
const image = `${url}/banner.png`;
const github = 'https://github.com/xyz27900/kayak';

const head: HeadConfig[] = [
  ['meta', {
    name: 'author',
    content: 'Evgeniy Kozlov'
  }],
  ['meta', {
    name: 'keywords',
    content: 'cypress, playwright, web3, dapp, metamask, testing, e2e'
  }],

  ['link', {
    rel: 'icon',
    type: 'image/svg+xml',
    href: '/logo.svg'
  }],

  ['meta', {
    name: 'HandheldFriendly',
    content: 'True'
  }],
  ['meta', {
    name: 'MobileOptimized',
    content: '320'
  }],
  ['meta', {
    name: 'theme-color',
    content: '#FF7340'
  }],

  ['meta', {
    property: 'og:type',
    content: 'website'
  }],
  ['meta', {
    property: 'og:locale',
    content: 'en_US'
  }],
  ['meta', {
    property: 'og:site',
    content: url
  }],
  ['meta', {
    property: 'og:site_name',
    content: title
  }],
  ['meta', {
    property: 'og:image',
    content: image
  }],
  ['meta', {
    property: 'og:description',
    content: description
  }]
];

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Guide',
    link: '/guide/',
    activeMatch: '^/guide/'
  },
  {
    text: 'API',
    link: '/api/cypress/configuration',
    activeMatch: '^/api/'
  },
  {
    text: `v${version}`,
    link: `${github}/releases/tag/v${version}`
  }
];

const sidebar: DefaultTheme.Sidebar = {
  '/guide': [
    {
      text: 'Introduction',
      items: [
        {
          text: 'What is Kayak?',
          link: '/guide/'
        }
      ]
    },
    {
      text: 'Common Flow',
      collapsible: true,
      items: [
        {
          text: 'Common Flow Overview',
          link: '/guide/common/overview'
        },
        {
          text: 'Configuration File',
          link: '/guide/common/configuration-file'
        },
        {
          text: 'Dockerfile',
          link: '/guide/common/dockerfile'
        },
        {
          text: 'Docker Compose',
          link: '/guide/common/docker-compose'
        }
      ]
    },
    {
      text: 'Plugin Flow',
      collapsible: true,
      items: [
        {
          text: 'Plugin Flow Overview',
          link: '/guide/plugin/overview'
        },
        {
          text: 'Cypress Plugin',
          link: '/guide/plugin/cypress'
        },
        {
          text: 'Playwright Plugin',
          link: '/guide/plugin/playwright'
        }
      ]
    },
    {
      text: 'Projects Examples',
      collapsible: true,
      items: [
        {
          text: 'Cypress Examples',
          link: '/guide/examples/cypress'
        },
        {
          text: 'Playwright Examples',
          link: '/guide/examples/playwright'
        }
      ]
    }
  ],
  '/api': [
    {
      text: 'Cypress',
      collapsible: true,
      items: [
        {
          text: 'Cypress Configuration',
          link: '/api/cypress/configuration'
        },
        {
          text: 'Cypress Commands',
          link: '/api/cypress/commands'
        }
      ]
    },
    {
      text: 'Playwright',
      collapsible: true,
      items: [
        {
          text: 'Playwright Configuration',
          link: '/api/playwright/configuration'
        },
        {
          text: 'Metamask Interactions',
          link: '/api/playwright/metamask'
        }
      ]
    }
  ]
};

export default defineConfig({
  title,
  description,
  head,
  markdown: {
    theme: 'github-dark',
    config: (md) => {
      md
        .use(imagePlugin)
        .use(imageGroupPlugin);
    }
  },
  themeConfig: {
    nav,
    sidebar,

    logo: '/logo.svg',

    footer: {
      message: 'Released under the MIT License.'
    },

    editLink: {
      pattern: `${github}/edit/main/docs/:path`,
      text: 'Help us to improve this page'
    },

    socialLinks: [
      {
        icon: 'github',
        link: github
      }
    ]

    // algolia: {
    //   appId: 'app-id',
    //   apiKey: 'api-key',
    //   indexName: 'index-name',
    //   searchParameters: {
    //     facetFilters: ['tags:en'],
    //   },
    // },
  },
  vite: {
    server: {
      port: 3005
    },
    base: process.env.CI ? '/kayak/' : '/'
  }
});
