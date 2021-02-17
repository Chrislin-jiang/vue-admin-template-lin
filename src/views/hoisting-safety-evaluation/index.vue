<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div>{{ text }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HoistingSafetyEvaluation',
  data: {
    text: '吊装安全评价系统'
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
