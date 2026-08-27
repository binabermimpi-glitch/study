import { defineConfig } from 'vitepress'
import sidebars from './sidebar.mjs'

export default defineConfig({
  lang: 'ko-KR',
  title: '개발 공부 LLM Wiki',
  description: '자바 백엔드 국비수업과 자격증 공부를 연결한 개인 위키',
  base: process.env.VITEPRESS_BASE || '/study/',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Wiki', link: '/wiki/' },
      { text: '자격증', link: '/wiki/04 자격증/' },
      { text: '문제 풀이', link: '/wiki/05 문제 풀이/' }
    ],

    sidebar: sidebars,

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: '이 페이지의 내용'
    },

    docFooter: {
      prev: '이전 페이지',
      next: '다음 페이지'
    },

    lastUpdated: {
      text: '마지막 수정'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/binabermimpi-glitch/study' }
    ]
  }
})

