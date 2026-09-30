import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: "KN's Blog",
  description: '记录技术学习、开发实践和问题解决过程',

  base: '/',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Blog', link: '/blog/' }
    ],

    search: {
      provider: 'local'
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/kaningchan'
      }
    ]
  }
})