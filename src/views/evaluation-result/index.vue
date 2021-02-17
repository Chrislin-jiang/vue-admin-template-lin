<template>
  <div class="components-container">
    <aside>
      编辑
    </aside>
    <div>
      <tinymce
        v-model="content"
        :height="300"
      />
    </div>
    <div
      class="editor-content"
      v-html="content"
    />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'EvaluationResult',
  components: { Tinymce },
  data() {
    return {
      content:
        `<h1 style="text-align: center;">吊装安全评价结果</h1>`
    }
  }
}
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>

