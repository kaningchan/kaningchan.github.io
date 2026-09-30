import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*.md', {
  transform(pages) {
    return pages
      .filter(({ frontmatter }) => {
        return (
          frontmatter.title &&
          frontmatter.date &&
          frontmatter.draft !== true
        )
      })

      .sort((a, b) => {
        return (
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
        )
      })

      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        description: frontmatter.description || '',
        date: new Date(frontmatter.date).toISOString().slice(0, 10),
        url
      }))
  }
})