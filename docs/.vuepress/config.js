module.exports = ctx => ({
  base: '/vuepress-theme-feed.github.io/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'vuepress-theme-feed',
      description: 'Just playing around'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'vuepress-theme-feed',
      description: 'Just playing around'
    }
  },
  evergreen: () => !ctx.isProd,
  theme: require.resolve('../../'),
  themeConfig: {
    repo: 'xieyx/vuepress-theme-feed.github.io',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    smoothScroll: true,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
          { text: 'Guide', link: '/guide/' },
          { text: 'Config', link: '/config/' },
          { text: 'Tags', link: '/tags/' },
        ],
        readMore: 'Read More...',
        pageTags: 'Tags',
        formatDateLabel: {
          yearAgo: ' year ago',
          monthAgo: ' month ago',
          weekAgo: ' week ago',
          dayAgo: ' day ago',
          hourAgo: ' hour ago',
          minuteAgo: ' minute ago',
          secondAgo: ' second ago',
        }
      },
      '/zh/': {
        label: '中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '最近更新',
        nav: [
          { text: '指南', link: '/zh/guide/' },
          { text: '配置', link: '/zh/config/' },
          { text: '标签云', link: '/zh/tags/' },
        ],
        readMore: '继续阅读 »',
        pageTags: '标签',
        formatDateLabel: {
          yearAgo: '年前',
          monthAgo: '月前',
          weekAgo: '周前',
          dayAgo: '日前',
          hourAgo: '小时前',
          minuteAgo: '分钟前',
          secondAgo: '刚刚',
        }
      },
    },
    sidebar: 'auto',
    formatDate: true,
    tags: 'tags',
    footer: {
      copyright: {
        since: 2020,
        author: 'xieyx',
      },
      license: 'Based on <a href="//vuepress.vuejs.org" blank="_target">VuePress</a>',
    },
  },
})
