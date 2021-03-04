<template>
  <!-- <article-detail-project :is-edit="false" /> -->
  <project-detail :is-edit="false" />
</template>

<script>
// import ArticleDetailProject from './components/ArticleDetailProject'
import ProjectDetail from './components/ProjectDetail'

export default {
  // name: 'CreateArticleProject',
  // components: { ArticleDetailProject }
  name: 'CreateArticleProject',
  components: { ProjectDetail }
}
</script>

