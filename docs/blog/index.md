<script setup>
import { data as posts } from '../posts.data.js'
import { withBase } from 'vitepress'
</script>

# Blog

这里记录我的技术学习和实践过程。

<div class="post-list">
<article v-for="post in posts" :key="post.url">
<h2>
<a :href="withBase(post.url)">{{ post.title }}</a>
</h2>
<time v-if="post.date" :datetime="post.date">{{ post.date }}</time>
<p v-if="post.description">{{ post.description }}</p>
</article>
</div>