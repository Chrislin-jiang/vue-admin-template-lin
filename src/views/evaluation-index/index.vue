<template>
  <div>
    <el-container>
      <!-- 主窗体 -->
      <el-main>
        <!-- 表单 -->
        <el-form :inline="true">
          <el-row>
            <el-col :span="12">
              <el-form-item label="请输入查询条件：">
                <el-input
                  v-model="inputStr"
                  placeholder="输入查询条件"
                  style="width: 420px;"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="12"
              style="text-align: right;padding-right:300px;"
            >
              <el-button-group>
                <el-button
                  type="success"
                  icon="el-icon-search"
                  @click="queryEvaluationIndex()"
                >查询
                </el-button>
                <el-button
                  type="success"
                  icon="el-icon-tickets"
                  @click="getAllEvaluationIndex()"
                >全部
                </el-button>

              </el-button-group>
            </el-col>

            <!-- <el-col :span="2">
              <el-button
                type="success"
                @click="exportToExcel()"
              >导出Excel</el-button>
            </el-col> -->
          </el-row>
        </el-form>
        <!-- 表格 -->
        <el-table
          :data="pageEvaluationIndex"
          border
          style="width: 100%"
          size="mini"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="60"
          >
          </el-table-column>
          <el-table-column
            prop="indicator"
            label="吊装安全性评价指标"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="description"
            label="详细描述"
            width="600"
          >
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <el-row style="margin-top: 20px;">
          <el-col
            :span="8"
            style="text-align: left"
          >
            <!-- <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteEvaluationIndex()"
            >
              批量删除</el-button> -->
          </el-col>
          <el-col
            :span="16"
            style="text-align: right"
          >
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentpage"
              :page-sizes="[50, 100]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </el-col>
        </el-row>

      </el-main>
    </el-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'EvaluationIndex',
  data() {
    //校验吊装安全性评价指标是否存在！
    const rulesStandardNnumber = (rule, value, callback) => {
      if (this.isEdit) {
        callback();
      }
      //使用Axios进行校验 
      axios.post(
        this.baseURL + 'indicator/check/',
        {
          indicator: value,
        }
      )
        .then((res) => {
          //请求成功
          if (res.data.code === 1) {
            if (res.data.exists) {
              callback(new Error("吊装安全性评价指标已存在！"));
            } else {
              callback();
            }
          } else {
            //请求失败
            callback(new Error("校验吊装安全性评价指标后端出现异常！"))
          }
        })
        .catch((err) => {
          //如果请求失败在控制台打印
          console.log(err);
        });
    }
    return {
      EvaluationIndex: [], //所有的标准信息
      pageEvaluationIndex: [], //分页后当前页的标准
      baseURL: " http://127.0.0.1:8000/",
      inputStr: '', //输入的查询条件
      selectEvaluationIndex: [], //选择复选框是把选择记录存在这个几个

      //====分页相关的变量====
      total: 0, //数据的总行数 
      currentpage: 1, //当前的所在的页
      pagesize: 50, //每页显示多少行数据

      rules: {
        indicator: [
          { required: true, message: '吊装安全性评价指标不能为空', trigger: 'blur' },
          { validator: rulesStandardNnumber, trigger: 'blur' }, //校验吊装安全性评价指标是否存在！
        ],
        description: [
          { required: true, message: '详细描述不能为空', trigger: 'blur' },
        ]
      }
    }
  },
  mounted() {
    //自动加载数据
    this.getEvaluationIndex();
  },
  methods: {
    //获取所有标准信息
    getEvaluationIndex: function () {
      //记录this的地址
      let that = this
      //使用Axios实现Ajax请求 
      axios
        .get(that.baseURL + "evaluation_index/")
        .then(function (res) {
          //请求成功后执行的函数
          if (res.data.code === 1) {
            //把数据给standards
            that.evaluation_index = res.data.data;
            //获取返回记录的总行数
            that.total = res.data.data.length;
            //获取当前页的数据
            that.getPageEvaluationIndex();
            //提示：
            that.$message({
              message: '数据加载成功！',
              type: 'success'
            });
          } else {
            //失败的提示！
            that.$message.error(res.data.msg);

          }
        })
        .catch(function (err) {
          //请求失败后执行的函数
          console.log(err);
        });
    },
    getAllEvaluationIndex() {
      //清空输入的inputStr
      this.inputStr = "";
      //获取所有的数据
      this.getEvaluationIndex();
    },
    //获取当前页的标准数据
    getPageEvaluationIndex() {
      //清空pageEvaluationIndex中的数据
      this.pageEvaluationIndex = [];
      //获得当前页的数据
      for (let i = (this.currentpage - 1) * this.pagesize; i < this.total; i++) {
        //遍历数据添加到pageStandard中
        this.pageEvaluationIndex.push(this.evaluation_index[i]);
        //判断是否达到一页的要求
        if (this.pageEvaluationIndex.length === this.pagesize) break;
      }
    },
    //实现标准信息查询
    queryEvaluationIndex() {
      //使用Ajax请求--POST-->传递InputStr
      let that = this
      //开始Ajax请求
      axios
        .post(
          that.baseURL + "evaluation_index/query/",
          {
            inputstr: that.inputStr,
          }
        )
        .then(function (res) {
          if (res.data.code === 1) {
            //把数据给 evaluation_index
            that.evaluation_index = res.data.data;
            //获取返回记录的总行数
            that.total = res.data.data.length;
            //获取当前页的数据
            that.getPageEvaluationIndex();
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
        .catch(function (err) {
          console.log(err);
          that.$message.error("获取后端查询结果出现异常！");
        });
    },
    // exportToExcel() {
    //   let that = this
    //   axios.get(that.baseURL + 'excel/export/')
    //     .then(res => {
    //       if (res.data.code === 1) {
    //         //拼接excel 的完整URL
    //         let url = that.baseURL + 'media/' + res.data.description;
    //         //下载
    //         window.open(url);
    //       } else {
    //         that.$message.error("导出Excel出现异常！");
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    //分页时修改每页的行数
    handleSizeChange(size) {
      //修改当前每页数据行数
      this.pagesize = size;
      //数据重新分页
      this.getPageEvaluationIndex();
    },
    //调整当前的页码
    handleCurrentChange(pageNumber) {
      //修改当前的页码
      this.currentpage = pageNumber;
      //数据重新分页
      this.getPageEvaluationIndex();
    },
    //选择复选框时触发的操作
    handleSelectionChange(data) {
      this.selectEvaluationIndex = data;
      console.log(data);
    },
  },
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
</style>