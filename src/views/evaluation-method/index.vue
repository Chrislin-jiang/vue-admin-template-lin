<template>
  <div class="evaluation-method-container">
    <h3>介绍</h3>
    <div class="steps-container">
      <el-steps
        :active="active"
        align-center
        finish-status="success"
      >
        <el-step
          title="步骤1"
          description="这是一段很长很长很长的描述性文字"
        ></el-step>
        <el-step
          title="步骤2"
          description="这是一段很长很长很长的描述性文字"
        ></el-step>
        <el-step
          title="步骤3"
          description="这是一段很长很长很长的描述性文字"
        ></el-step>
        <el-step
          title="步骤4"
          description="这是一段很长很长很长的描述性文字"
        ></el-step>
      </el-steps>
      <el-button
        style="margin-top: 12px;"
        @click="next"
      >下一步</el-button>
    </div>
    <el-divider content-position="right"><i class="el-icon-mobile-phone"></i>--分割线</el-divider>
    <div class="steps-tabs-detail">
      <el-tabs
        v-model="activeName"
        @tab-click="handclick"
        style="height: 200px"
      >
        <el-tab-pane
          label="步骤1"
          name="first"
        >步骤1</el-tab-pane>
        <el-tab-pane
          label="步骤2"
          name="second"
        >步骤2</el-tab-pane>
        <el-tab-pane
          label="步骤3"
          name="third"
        >步骤3</el-tab-pane>
        <el-tab-pane
          label="步骤4"
          name="fourth"
        >步骤4</el-tab-pane>
      </el-tabs>
    </div>
    <div class="evaluation-table">
      <el-table
        :data="tableData"
        height="550"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="序号"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="index"
          label="吊装安全性评价指标"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="detail"
          label="详细描述"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="importance"
          label="权重"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="evaluation-very-good"
          label="好"
          width="80"
        >
          <template v-slot="scope">
            <el-input
              v-model="scope.numberscore"
              size="small"
              placeholder=""
              style="width: 50px;"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="evaluation-good"
          label="较好"
          width="80"
        >
          <template v-slot="scope">
            <el-input
              v-model="scope.numberscore"
              size="small"
              placeholder=""
              style="width: 50px;"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="evaluation-primary"
          label="一般"
          width="80"
        >
          <template v-slot="scope">
            <el-input
              v-model="scope.numberscore"
              size="small"
              placeholder=""
              style="width: 50px;"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="evaluation-little-low"
          label="较低"
          width="80"
        >
          <template v-slot="scope">
            <el-input
              v-model="scope.numberscore"
              size="small"
              placeholder=""
              style="width: 50px;"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="evaluation-low"
          label="低"
          width="80"
        >
          <template v-slot="scope">
            <el-input
              v-model="scope.numberscore"
              size="small"
              placeholder=""
              style="width: 50px;"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button type="success">点击计算</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      tableData: [{
        id: '1',
        index: '持证上岗',
        detail: '相关作业人员全部持证上岗',
        improtance: '0.5'
      },
      {
        id: '1',
        index: '持证上岗',
        detail: '相关作业人员全部持证上岗',
        improtance: '0.5'
      },
      {
        id: '1',
        index: '持证上岗',
        detail: '相关作业人员全部持证上岗',
        improtance: '0.5'
      }
      ]
    };
  },

  methods: {
    next() {
      if (this.active++ > 3) this.active = 0;
    }
  }
}
</script>
<style>
.el-table th,
.el-table td {
  text-align: center !important;
}
</style>
<style lang="scss" scoped>
.evaluation-method-container {
  font-family: "Times New Roman", Avenir, Helvetica, Arial, sans-serif;
  /* font-family: "Times New Roman", SimSun, Georgia, Serif; 
  SimSun 宋体，NSimSun 新宋体，KaiTi 楷体*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 15px;
  line-height: 25px;
  text-align: center;
  color: #2c3e50;
  padding: 0 30px 30px 30px;
}
</style>