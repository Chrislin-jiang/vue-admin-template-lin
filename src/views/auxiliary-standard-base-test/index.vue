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
              :span="8"
              style="text-align: right;padding-right:10px;"
            >
              <el-button-group>
                <el-button
                  type="success"
                  icon="el-icon-search"
                  @click="queryStandards()"
                >查询
                </el-button>
                <el-button
                  type="success"
                  icon="el-icon-tickets"
                  @click="getAllStandards()"
                >全部
                </el-button>
                <el-button
                  type="success"
                  icon="el-icon-circle-plus-outline"
                  @click="addStandard()"
                >添加</el-button>
              </el-button-group>
            </el-col>
            <el-col :span="2">
              <el-upload
                :show-file-list="false"
                :http-request="uploadExcelPost"
              >
                <el-button type="success">导入Excel</el-button>
              </el-upload>
            </el-col>
            <el-col :span="2">
              <el-button
                type="success"
                @click="exportToExcel()"
              >导出Excel</el-button>
            </el-col>
          </el-row>
        </el-form>
        <!-- 表格 -->
        <el-table
          :data="pageStandards"
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
            prop="standard_number"
            label="标准号"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="standard_title"
            label="标准名称"
            width="300"
          >
          </el-table-column>

          <el-table-column
            prop="release_date"
            label="发布日期"
            align="center"
            width="100"
          >
          </el-table-column>

          <el-table-column
            prop="implementation_date"
            label="实施日期"
            align="center"
            width="100"
          >
          </el-table-column>

          <el-table-column
            prop="category"
            label="类别"
            align="center"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="success"
                icon="el-icon-more"
                size="mini"
                circle
                @click="viewStandard(scope.row)"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                circle
                @click="updateStandard(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="deleteStandard(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row style="margin-top: 20px;">
          <el-col
            :span="8"
            style="text-align: left"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteStandards()"
            >
              批量删除</el-button>
          </el-col>
          <el-col
            :span="16"
            style="text-align: right"
          >
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentpage"
              :page-sizes="[5, 10, 50, 100]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </el-col>
        </el-row>
        <!-- 弹出框的标准明细表单 -->
        <el-dialog
          :title="dialogTitle"
          :visible.sync="dialogVisible"
          width="50%"
          @close="closeDialogForm('standardForm')"
        >
          <el-form
            :model="standardForm"
            :rules="rules"
            ref="standardForm"
            :inline="true"
            style="margin-left: 20px;"
            label-width="110px"
            label-position="right"
            size="mini"
          >
            <el-form-item
              label="标准号："
              prop="standard_number"
            >
              <el-input
                v-model="standardForm.standard_number"
                :disabled="isView"
                suffix-icon="el-icon-edit"
                style="width:93% "
              ></el-input>
            </el-form-item>
            <el-form-item
              label="标准名称："
              prop="standard_title"
            >
              <el-input
                v-model="standardForm.standard_title"
                :disabled="isView"
                suffix-icon="el-icon-edit"
                style="width:93% "
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="类别："
              prop="category"
            >
              <el-input
                v-model="standardForm.category"
                :disabled="isView"
                suffix-icon="el-icon-edit"
                style="width:93% "
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="状态："
              prop="status"
            >
              <el-input
                v-model="standardForm.status"
                :disabled="isView"
                suffix-icon="el-icon-edit"
                style="width:93% "
              ></el-input>
            </el-form-item>
            <el-form-item
              label="发布日期："
              prop="release_date"
            >
              <el-date-picker
                v-model="standardForm.release_date"
                value-format="yyyy-MM-dd"
                :disabled="isView"
                type="date"
                placeholder="选择日期"
                style="width:93% "
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="实施日期："
              prop="implementation_date"
            >
              <el-date-picker
                v-model="standardForm.implementation_date"
                value-format="yyyy-MM-dd"
                :disabled="isView"
                type="date"
                placeholder="选择日期"
                style="width:93% "
              >
              </el-date-picker>
            </el-form-item>

          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              type="primary"
              size="mini"
              v-show="!isView"
              @click="submitStandardForm('standardForm')"
            >确 定</el-button>

            <el-button
              type="info"
              size="mini"
              @click="closeDialogForm('standardForm')"
            >取 消
            </el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'AuxiliaryStandardBaseTest',
  data() {
    //校验标准号是否存在！
    const rulesStandardNnumber = (rule, value, callback) => {
      if (this.isEdit) {
        callback();
      }
      //使用Axios进行校验 
      axios.post(
        this.baseURL + 'standard_number/check/',
        {
          standard_number: value,
        }
      )
        .then((res) => {
          //请求成功
          if (res.data.code === 1) {
            if (res.data.exists) {
              callback(new Error("标准号已存在！"));
            } else {
              callback();
            }
          } else {
            //请求失败
            callback(new Error("校验标准号后端出现异常！"))
          }
        })
        .catch((err) => {
          //如果请求失败在控制台打印
          console.log(err);
        });
    }
    return {
      Standards: [], //所有的标准信息
      pageStandards: [], //分页后当前页的标准
      baseURL: " http://127.0.0.1:8000/",
      inputStr: '', //输入的查询条件
      selectStandards: [], //选择复选框是把选择记录存在这个几个

      //====分页相关的变量====
      total: 0, //数据的总行数 
      currentpage: 1, //当前的所在的页
      pagesize: 10, //每页显示多少行数据
      //====弹出框表单====
      dialogVisible: false, //控制弹出框表单是否展示
      dialogTitle: "", //弹出框的标题
      isView: false, //标识是否是查看
      isEdit: false, //标识是否是修改
      standardForm: {    //弹出框表单对相应绑定数据
        standard_number: '',
        standard_title: '',
        release_date: '',
        implementation_date: '',
        category: '',
        status: '',
      },
      rules: {
        standard_number: [
          { required: true, message: '标准号不能为空', trigger: 'blur' },
          { validator: rulesStandardNnumber, trigger: 'blur' }, //校验标准号是否存在！
        ],
        standard_title: [
          { required: true, message: '标准名称不能为空', trigger: 'blur' },
        ],
        release_date: [
          { required: true, message: '发布日期不能为空', trigger: 'change' },
        ],
        implementation_date: [
          { required: true, message: '实施日期不能为空', trigger: 'change' },
        ],
        category: [
          { required: true, message: '类别不能为空', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' },
        ]
      }
    }
  },
  mounted() {
    //自动加载数据
    this.getStandards();
  },
  methods: {
    //获取所有标准信息
    getStandards: function () {
      //记录this的地址
      let that = this
      //使用Axios实现Ajax请求 
      axios
        .get(that.baseURL + "standards/")
        .then(function (res) {
          //请求成功后执行的函数
          if (res.data.code === 1) {
            //把数据给standards
            that.standards = res.data.data;
            //获取返回记录的总行数
            that.total = res.data.data.length;
            //获取当前页的数据
            that.getPageStandards();
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
    getAllStandards() {
      //清空输入的inputStr
      this.inputStr = "";
      //获取所有的数据
      this.getStandards();
    },
    //获取当前页的标准数据
    getPageStandards() {
      //清空pageStandards中的数据
      this.pageStandards = [];
      //获得当前页的数据
      for (let i = (this.currentpage - 1) * this.pagesize; i < this.total; i++) {
        //遍历数据添加到pageStandard中
        this.pageStandards.push(this.standards[i]);
        //判断是否达到一页的要求
        if (this.pageStandards.length === this.pagesize) break;
      }
    },
    //实现标准信息查询
    queryStandards() {
      //使用Ajax请求--POST-->传递InputStr
      let that = this
      //开始Ajax请求
      axios
        .post(
          that.baseURL + "standards/query/",
          {
            inputstr: that.inputStr,
          }
        )
        .then(function (res) {
          if (res.data.code === 1) {
            //把数据给standards
            that.standards = res.data.data;
            //获取返回记录的总行数
            that.total = res.data.data.length;
            //获取当前页的数据
            that.getPageStandards();
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
    //添加标准时打开表单
    addStandard() {
      //修改标题
      this.dialogTitle = "添加标准明细";
      //弹出表单
      this.dialogVisible = true;
    },
    //查看标准的明细
    viewStandard(row) {
      //修改标题
      this.dialogTitle = "查看标准明细";
      //修改isView变量
      this.isView = true;
      //弹出表单
      this.dialogVisible = true;
      //深拷贝方法：
      this.standardForm = JSON.parse(JSON.stringify(row))
    },
    //修改标准的明细
    updateStandard(row) {
      //修改标题
      this.dialogTitle = "修改标准明细";
      //修改isEdit变量
      this.isEdit = true;
      //弹出表单
      this.dialogVisible = true;
      //深拷贝方法：
      this.standardForm = JSON.parse(JSON.stringify(row))
    },
    //提交标准的表单（添加、修改）
    submitStandardForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //校验成功后，执行添加或者修改？
          if (this.isEdit) {
            //修改
            this.submitUpdateStandard();
          } else {
            //添加
            this.submitAddStandard();
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //添加到数据库的函数
    submitAddStandard() {
      //定义that
      let that = this;
      //执行Axios请求
      axios
        .post(that.baseURL + 'standard/add/', that.standardForm)
        .then(res => {
          //执行成功
          if (res.data.code === 1) {
            //获取所有标准的信息
            that.standards = res.data.data;
            //获取记录条数
            that.total = res.data.data.length;
            //获取分页信息
            that.getPageStandards();
            //提示：
            that.$message({
              message: '数据添加成功！',
              type: 'success'
            });
            //关闭窗体
            this.closeDialogForm('standardForm');
          } else {
            //失败的提示！
            that.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          //执行失败
          console.log(err);
          that.$message.error("获取后端查询结果出现异常！");
        })
    },
    //修改更新到数据库
    submitUpdateStandard() {
      //定义that
      let that = this;
      //执行Axios请求
      axios
        .post(that.baseURL + 'standard/update/', that.standardForm)
        .then(res => {
          //执行成功
          if (res.data.code === 1) {
            //获取所有标准的信息
            that.standards = res.data.data;
            //获取记录条数
            that.total = res.data.data.length;
            //获取分页信息
            that.getPageStandards();
            //提示：
            that.$message({
              message: '数据修改成功！',
              type: 'success'
            });
            //关闭窗体
            this.closeDialogForm('standardForm');
          } else {
            //失败的提示！
            that.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          //执行失败
          console.log(err);
          that.$message.error("修改时获取后端查询结果出现异常！");
        })

    },
    //删除一条标准记录 
    deleteStandard(row) {
      //等待确认
      this.$confirm('是否确认删除标准信息【标准号：' + row.standard_number + '\t标准名称：' + row.standard_title + '】信息？',
        '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //确认删除响应事件
        let that = this
        //调用后端接口
        axios.post(that.baseURL + 'standard/delete/', { standard_number: row.standard_number })
          .then(res => {
            if (res.data.code === 1) {
              //获取所有标准信息
              that.standards = res.data.data;
              //获取记录数
              that.total = res.data.data.length;
              //分页 
              that.getPageStandards();
              //提示
              that.$message({
                message: '数据删除成功！',
                type: 'success'
              });
            } else {
              that.$message.error(res.data.msg);
            }
          })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteStandards() {
      //等待确认
      this.$confirm("是否确认批量删除" + this.selectStandards.length + "个标准信息吗？",
        '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //确认删除响应事件
        let that = this
        //调用后端接口
        axios.post(that.baseURL + 'standards/delete/', { standard: that.selectStandards })
          .then(res => {
            if (res.data.code === 1) {
              //获取所有标准信息
              that.standards = res.data.data;
              //获取记录数
              that.total = res.data.data.length;
              //分页 
              that.getPageStandards();
              //提示
              that.$message({
                message: '数据批量删除成功！',
                type: 'success'
              });
            } else {
              that.$message.error(res.data.msg);
            }
          })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //关闭弹出框的表单
    closeDialogForm(formName) {
      //重置表单的校验
      this.$refs[formName].resetFields();
      //清空
      this.standardForm.standard_number = "";
      this.standardForm.standard_title = "";
      this.standardForm.release_date = "";
      this.standardForm.implementation_date = "";
      this.standardForm.category = "";
      this.standardForm.status = "";
      //关闭
      this.dialogVisible = false;
      //初始化isView和isEdit值
      this.isEdit = false;
      this.isView = false;

    },

    uploadExcelPost(file) {
      let that = this
      //实例化一个formdata
      //定义一个FormData类
      let fileReq = new FormData();
      //把照片穿进去
      fileReq.append('excel', file.file);
      //使用Axios发起Ajax请求
      axios(
        {
          method: 'post',
          url: that.baseURL + 'excel/import/',
          data: fileReq
        }
      ).then(res => {
        // 根据code判断是否成功
        if (res.data.code === 1) {
          //把照片给image 
          that.standards = res.data.data;
          //计算总共多少条
          that.total = res.data.data.length;
          //分页
          that.getPageStandards();
          //弹出框体显示结果 
          this.$alert('本次导入完成! 成功：' + res.data.success + '失败：' + res.data.error
            , '导入结果展示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: "本次导入失败数量为：" + res.data.error + ",具体的标准号：" + res.data.errors,
              });
            }
          });
          //把失败明细打印
          console.log("本次导入失败数量为：" + res.data.error + ",具体的标准号：");
          console.log(res.data.errors);
        } else {
          //失败的提示！
          that.$message.error(res.data.msg);
        }

      }).catch(err => {
        console.log(err);
        that.$message.error("上传Excel出现异常！");
      })

    },
    exportToExcel() {
      let that = this
      axios.get(that.baseURL + 'excel/export/')
        .then(res => {
          if (res.data.code === 1) {
            //拼接excel 的完整URL
            let url = that.baseURL + 'media/' + res.data.standard_title;
            //下载
            window.open(url);
          } else {
            that.$message.error("导出Excel出现异常！");
          }
        })
        .catch(err => {
          console.log(err);
        });

    },
    //分页时修改每页的行数
    handleSizeChange(size) {
      //修改当前每页数据行数
      this.pagesize = size;
      //数据重新分页
      this.getPageStandards();
    },
    //调整当前的页码
    handleCurrentChange(pageNumber) {
      //修改当前的页码
      this.currentpage = pageNumber;
      //数据重新分页
      this.getPageStandards();
    },
    //选择复选框时触发的操作
    handleSelectionChange(data) {
      this.selectStandards = data;
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