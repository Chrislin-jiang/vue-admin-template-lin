<template>
  <div>
    <table
      border="1"
      class="pure-table"
    >
      <thead>
        <tr>
          <th>好</th>
          <th>较好</th>
          <th>一般</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,index) in formData"
          :key=index
        >
          <!-- <td><input
              type="number"
              v-model="item[0]"
            ></td> -->
          <td><input v-model="item[0]"></td>
          <td><input v-model="item[1]"></td>
          <td><input v-model="item[2]"></td>
        </tr>
      </tbody>
    </table>
    <textarea v-model="criteria_eigen"></textarea>
    <el-button
      type="success"
      style="margin-left:20px"
      @click='getData'
    >获取数据</el-button>
    <el-button
      @click="ahpData"
      type="success"
    >点击计算</el-button>
    <!-- <el-button
      @click="ahpGetData"
      type="success"
    >获取结果</el-button> -->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'EvaluationMethod3',
  data() {
    return {
      baseURL: " http://127.0.0.1:8000/",
      criteria_eigen: ''
    }
  },
  computed: {
    formData: function () {
      return Array.from(new Array(3).fill(), () => new Array(3).fill())
    }
  },
  mounted() {
  },
  methods: {
    getData() {
      let dataPre = []
      this.formData.forEach(item => {
        dataPre.push(item)
      })
      let data = {}
      data.key = 'key'
      data.value = dataPre
      console.log(data)
      console.log(typeof (data))
      let data2 = JSON.stringify(data)
      console.log(data2)
      console.log(typeof (data2))
      let data3 = JSON.parse(data2)
      console.log(data3)
      console.log(typeof (data3))
      return data2
      // alert(data)
    },
    ahpData(data) {
      //使用Ajax请求--POST-->传递InputStr
      let that = this
      let dataTemp = this.getData(data)
      axios.post(this.baseURL + 'ahp/data/', dataTemp)
        .then(function (res) {
          if (res.data.code === 1) {
            console.log(res.data.data)
            //把数据给 criteria_eigen
            that.criteria_eigen = res.data.data;
            //提示：
            that.$message({
              message: '查询数据加载成功！',
              type: 'success'
            });

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
.el-container {
  margin: 0px;
  padding: 0px;
  height: 100%;
}
.el-dialog .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-dialog .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-dialog .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.el-dialog .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
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
table {
  border-collapse: collapse;
  border-spacing: 0;
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
  color: #000;
  font: italic 85%/1 Avenir, Helvetica, Arial, sans-serif;
  padding: 1em 0;
  text-align: center;
}

.pure-table td,
.pure-table th {
  border-left: 1px solid #cbcbcb;
  border-width: 1px 0 0 1px;
  font-size: inherit;
  margin: 0;
  overflow: visible;
  padding: 0.5em 1em;
  width: 80px;
  height: 36.5px;
}

.pure-table thead {
  background-color: transparent;
  color: #000;
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
</style>