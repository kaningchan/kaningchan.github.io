---
layout: home

hero:
  name: "KN's Blog"
  text: 学习、实践与记录
  actions:
    - theme: brand
      text: 阅读 Blog
      link: /blog/
---

<script setup>
import { data as posts } from './posts.data.js'
import { withBase } from 'vitepress'

const latestPosts = posts.slice(0, 5)
</script>

## 最新文章

<ul class="latest-posts">
  <li v-for="post in latestPosts" :key="post.url">
    <a :href="withBase(post.url)">
      {{ post.title }}
    </a>
    <small> · {{ post.date }}</small>
    <p v-if="post.description">
      {{ post.description }}
    </p>
  </li>
</ul>

<p v-if="latestPosts.length === 0">
  暂无文章。
</p>