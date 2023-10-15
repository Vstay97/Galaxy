// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Galaxy",
  tagline: "Coding and Thinking",
  url: "https://wiki.vstay.dev",
  baseUrl: "/",
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'vstay', // Usually your GitHub org/user name.
  // projectName: 'wiki', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          breadcrumbs: false,
        },
        blog: {
          blogTitle: "Blog",
          blogDescription: "Vstay 的个人生活和工作记录",
          blogSidebarCount: "ALL",
          blogSidebarTitle: "近期文章",
          showReadingTime: true,
          feedOptions: {
            title: "Vstay's Blog",
            description: "Vstay 的个人生活和工作记录",
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Vstay, Inc.`,
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          filename: 'sitemap.xml',
        },
        googleAnalytics: {
          trackingID: "G-MHMEL0F832",
          anonymizeIP: true,
        },
        gtag: {
          trackingID: 'G-MHMEL0F832',
          anonymizeIP: true,
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "getting-started",
        path: "wiki/getting-started",
        routeBasePath: "getting-started",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "programming-language",
        path: "wiki/programming-language",
        routeBasePath: "programming-language",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "structures-algorithms",
        path: "wiki/structures-algorithms",
        routeBasePath: "structures-algorithms",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "computer-composition",
        path: "wiki/computer-composition",
        routeBasePath: "computer-composition",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "computer-network",
        path: "wiki/computer-network",
        routeBasePath: "computer-network",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "operating-system",
        path: "wiki/operating-system",
        routeBasePath: "operating-system",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "database-system",
        path: "wiki/database-system",
        routeBasePath: "database-system",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "computer-security",
        path: "wiki/computer-security",
        routeBasePath: "computer-security",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "software-engineering",
        path: "wiki/software-engineering",
        routeBasePath: "software-engineering",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "compilation-principle",
        path: "wiki/compilation-principle",
        routeBasePath: "compilation-principle",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "practice",
        path: "engineering/practice",
        routeBasePath: "practice",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
        [
      "@docusaurus/plugin-content-docs",
      {
        id: "theories",
        path: "engineering/theories",
        routeBasePath: "theories",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "architecture",
        path: "engineering/architecture",
        routeBasePath: "architecture",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "project-development",
        path: "engineering/project-development",
        routeBasePath: "project-development",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "roadmap",
        path: "work/roadmap",
        routeBasePath: "roadmap",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
        [
      "@docusaurus/plugin-content-docs",
      {
        id: "backend-engineer",
        path: "work/backend-engineer",
        routeBasePath: "backend-engineer",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "data-engineer",
        path: "work/data-engineer",
        routeBasePath: "data-engineer",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    // [
    //   "@docusaurus/plugin-content-docs",
    //   {
    //     id: "sre-engineer",
    //     path: "work/sre-engineer",
    //     routeBasePath: "sre-engineer",
    //     sidebarPath: require.resolve("./sidebars.js"),
    //     showLastUpdateAuthor: true,
    //     showLastUpdateTime: true,
    //     breadcrumbs: false,
    //   },
    // ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "life",
        path: "life",
        routeBasePath: "life",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "journal",
        path: "journal",
        routeBasePath: "journal",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
    // TODO: 这里搜索功能和统计功能需要换成自己的
    // "docusaurus-plugin-umami",
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 6,
    },
      metadata: [
        {
          name: "keywords",
          content: "vstay, wiki, blog, python, linux",
        },
      ],
      navbar: {
        title: "📚 Galaxy",
        hideOnScroll: true,
        items: [
          { to: "/blog", label: "👨🏻‍🌾 博客", position: "right" },
          {
            position: "right",
            label: "👨🏻‍🎓 维基",
            items: [
              {
                label: "基础入门",
                to: "/getting-started",
              },
              {
                label: "程序设计语言",
                to: "/programming-language",
              },
              {
                label: "数据结构与算法",
                to: "/structures-algorithms",
              },
              {
                label: "计算机组成",
                to: "/computer-composition",
              },
              {
                label: "计算机网络",
                to: "/computer-network",
              },
              {
                label: "计算机安全",
                to: "/computer-security",
              },
              {
                label: "操作系统",
                to: "/operating-system",
              },
              {
                label: "数据库系统",
                to: "/database-system",
              },
              {
                label: "软件工程",
                to: "/software-engineering",
              },
              {
                label: "编译原理",
                to: "/compilation-principle",
              },
            ],
          },
          {
            position: "right",
            label: "👨‍💻 职业",
            items: [
              {
                label: "求职之路",
                to: "/roadmap",
              },
              {
                label: "后端开发工程师",
                to: "/backend-engineer",
              },
              {
                label: "数据开发工程师",
                to: "/data-engineer",
              },
            ]
          },
          {
            position: "right",
            label: "💼 工程",
            items: [
              {
                label: "实践记录",
                to: "/practice",
              },
              {
                label: "开发理论",
                to: "/theories",
              },
              {
                label: "架构设计",
                to: "/architecture",
              },
              {
                label: "项目开发",
                to: "/project-development",
              },
            ]
          },
          { to: "/life", label: "🚴🏻‍♀️ 生活", position: "right" },
          { to: "/journal", label: "📽️ 日志", position: "right" },
        ],
      },
      /* 
      TODO: 这里搜索功能和统计功能需要换成自己的

      algolia: {
        apiKey: "5d5a02bdf02df700355c8ccd84b78d13",
        appId: "8W3YJXJGF2",
        indexName: "wiki",
      },
      umami: {
        websiteid: "7efcd733-c232-43db-9f17-10a00c53b152",
        src: "https://umami.7wate.org/script.js",
      },
      
      */
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Vstay, Inc. Built with <a href="https://www.docusaurus.cn/" target="_blank" rel="noopener noreferrer">Docusaurus</a>.<br>Powered by <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">Cloudflare</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: "markdown",
        additionalLanguages: ["java", "git", "nginx", "http"],
      },
      mermaid: {
        theme: { light: 'neutral', dark: 'forest' },
      },
    }),
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

module.exports = config;
