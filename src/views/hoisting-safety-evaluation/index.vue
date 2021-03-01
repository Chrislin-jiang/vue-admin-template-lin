<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <h2>{{ text }}</h2>
    <div class="card-container">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>卡片名称</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
          >操作按钮</el-button>
        </div>
        <div
          v-for="o in 4"
          :key="o"
          class="text item"
        >
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HoistingSafetyEvaluation',
  data() {
    return {
      text: '吊装安全评价系统'
    }
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 400px;
}
</style>
