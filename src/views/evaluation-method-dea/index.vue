<template>
  <div>
    <el-collapse
      v-model="activeNames"
      @change="handleChange"
    >
      <el-collapse-item
        title="一致性 Consistency"
        name="1"
      >
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item
        title="反馈 Feedback"
        name="2"
      >
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item
        title="效率 Efficiency"
        name="3"
      >
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item
        title="可控 Controllability"
        name="4"
      >
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
    <el-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="percentage"
      :color="colors"
      style="margin:0 70px 0 30px"
    ></el-progress>
    <el-row>
      <el-col :span="12">
        <table
          border="1"
          class="pure-table"
        >
          <thead>
            <tr>
              <th>安全费用投入</th>
              <th>安全人员投入</th>
              <th>安全时间投入</th>
              <th>产出-事故损失</th>
              <th>安全产出效益</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in deaData"
              :key=index
            >
              <td><input v-model="item[0]"></td>
              <td><input v-model="item[1]"></td>
              <td><input v-model="item[2]"></td>
              <td><input v-model="item[3]"></td>
              <td><input v-model="item[4]"></td>
            </tr>
          </tbody>
        </table>
        <table class="pure-table">
          <thead>
            <tr>
              <th>输入指标数量</th>
              <th>输出指标数量</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input v-model="inputLen"></td>
              <td><input v-model="outputLen"></td>
            </tr>
          </tbody>
        </table>
        <el-button
          type="success"
          style="margin-left:30px"
          @click='getData'
        >获取数据</el-button>
        <el-button
          @click="deaComputed"
          type="success"
        >点击计算</el-button>
      </el-col>
      <!-- <el-divider direction="vertical"><i class="el-icon-mobile-phone"></i></el-divider> -->
      <el-col :span="12">
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>输出结果显示</span>
            <!-- <el-button
              style="float: right; padding: 3px 0"
              type="text"
            >操作按钮</el-button> -->
          </div>
          <div>
            <textarea
              rows="30"
              cols="70"
              v-model="dea_result"
            ></textarea>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'EvaluationMethod4',
  data() {
    return {
      percentage: 10,
      colors: '#e6a23c',
      baseURL: " http://127.0.0.1:8000/",
      dea_result: '',
      inputLen: 2,
      outputLen: 1,
      activeNames: ['1']
    }
  },
  computed: {
    deaData: function () {
      return Array.from(new Array(5).fill(), () => new Array(3).fill())
    },
  },
  mounted() {
  },
  methods: {
    increase() {
      this.percentage = 100;
      this.colors = '#67c23a'
    },
    handleChange(val) {
      console.log(val);
    },
    getData() {
      let dataPre = []
      this.deaData.forEach(item => {
        dataPre.push(item)
      })
      let data = {}
      data.key = 'key'
      data.value = dataPre
      let data2 = JSON.stringify(data)
      console.log(data2)
      console.log(typeof (data2))
      return data2
      // alert(data)
    },
    deaComputed(data) {
      //使用Ajax请求--POST-->传递InputStr
      let that = this
      let dataTemp = this.getData(data)
      axios.post(this.baseURL + 'dea/computed/', dataTemp)
        .then(function (res) {
          if (res.data.code === 1) {
            console.log(res.data.data)
            //把数据给 criteria_eigen
            that.dea_result = res.data.data;
            //提示：
            that.$message({
              message: '计算成功！',
              type: 'success'
            });
            this.increase()
          } else {
            //失败的提示！
            that.$message.error(res.data.msg);
          }
        })
    }

  }
}
</script>
<style scoped>
.el-collapse {
  margin: 40px 80px 0 60px;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  margin: 30px;
}

td,
th {
  padding: 0;
}

.pure-table {
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #cbcbcb;
  border-radius: 3px;
}

.pure-table caption {
  color: rgb(191, 230, 166);
  font: italic 85%/1 Avenir, Helvetica, Arial, sans-serif;
  padding: 1em 0;
  text-align: center;
}

.pure-table td,
.pure-table th {
  border: 1px solid #cbcbcb;
  /* border-width: 1px 0 0 1px; */
  margin: 0;
  font-size: 15px;
  text-align: center;
  overflow: visible;
  padding: 0.5em 1em;
  width: 130px;
  height: 30px;
  line-height: 30px;
}

.pure-table thead {
  /* background-color: #2dc027;
  color: rgb(252, 248, 248); */
  background-color: #fff;
  color: #585858;
  text-align: center;
  vertical-align: bottom;
}

.pure-table td {
  background-color: transparent;
}
input {
  /* width: 30px; */
  width: 100%;
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
  width: 500px;
  margin: 30px 0;
}
</style>