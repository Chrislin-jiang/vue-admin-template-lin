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
                  @click="queryProjects()"
                >查询
                </el-button>
                <el-button
                  type="success"
                  icon="el-icon-tickets"
                  @click="getAllProjects()"
                >全部
                </el-button>
                <!-- <el-button
                  type="success"
                  icon="el-icon-circle-plus-outline"
                  @click="addProject()"
                >添加</el-button> -->
                <router-link to="/project-information/create-project">
                  <el-button
                    type="success"
                    icon="el-icon-circle-plus-outline"
                  >添加</el-button>
                </router-link>
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
          :data="pageProjects"
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
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="工程名称"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="project_category"
            label="项目类型"
            align="center"
            width="120"
          >
          </el-table-column>

          <el-table-column
            prop="equipment_capacity"
            label="风机容量"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="investor"
            label="投资方"
            width="120"
          >
          </el-table-column>

          <el-table-column
            prop="start_time"
            label="发布日期"
            align="center"
            width="100"
          >
          </el-table-column>

          <el-table-column
            prop="completion_time"
            label="实施日期"
            align="center"
            width="100"
          >
          </el-table-column>

          <el-table-column
            prop="project_status"
            label="状态"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="220"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="success"
                size="mini"
                round
                @click="viewProject(scope.row)"
              >查看</el-button>
              <el-button
                type="primary"
                size="mini"
                round
                @click="updateProject(scope.row)"
              >编辑</el-button>
              <!-- <el-button
                type="danger"
                size="mini"
                round
                @click="deleteProject(scope.row)"
              >评价</el-button> -->
              <router-link to="/evaluation-method/index">
                <el-button
                  style="margin-left:8px"
                  type="danger"
                  size="mini"
                  round
                >评价</el-button>
              </router-link>
              <!-- <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="deleteProject(scope.row)"
              ></el-button> -->
            </template>
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
              @click="deleteProjects()"
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
              :page-sizes="[20, 50, 100]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </el-col>
        </el-row>
        <!-- 弹出框的工程明细表单 -->
        <el-dialog
          :title="dialogTitle"
          :visible.sync="dialogVisible"
          width="50%"
          @close="closeDialogForm('projectForm')"
        >
          <el-form
            :model="projectForm"
            :rules="rules"
            ref="projectForm"
            :inline="true"
            style="margin-left: -50px;"
            label-width="250px"
            label-position="right"
            size="mini"
          >
            <el-form-item
              label="工程名称："
              prop="project_name"
            >
              <el-input
                v-model="projectForm.project_name"
                :disabled="isView"
                suffix-icon="el-icon-edit"
                style="width:193% "
              ></el-input>
            </el-form-item>
            <el-form-item
              label="风机容量："
              prop="equipment_capacity"
            >
              <el-input
                v-model="projectForm.equipment_capacity"
                :disabled="isView"
                suffix-icon="el-icon-edit"
                style="width:193% "
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="投资方："
              prop="investor"
            >
              <el-input
                v-model="projectForm.investor"
                :disabled="isView"
                suffix-icon="el-icon-edit"
                style="width:193% "
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="项目类别："
              prop="project_category"
            >
              <el-input
                v-model="projectForm.project_category"
                :disabled="isView"
                suffix-icon="el-icon-edit"
                style="width:193% "
              >
              </el-input>
            </el-form-item>

            <el-form-item
              label="开工时间："
              prop="start_time"
            >
              <el-date-picker
                v-model="projectForm.start_time"
                value-format="yyyy-MM-dd"
                :disabled="isView"
                type="date"
                placeholder="选择日期"
                style="width:93% "
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="竣工时间："
              prop="completion_time"
            >
              <el-date-picker
                v-model="projectForm.completion_time"
                value-format="yyyy-MM-dd"
                :disabled="isView"
                type="date"
                placeholder="选择日期"
                style="width:93% "
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="状态："
              prop="project_status"
            >
              <el-input
                v-model="projectForm.project_status"
                :disabled="isView"
                suffix-icon="el-icon-edit"
                style="width:93% "
              ></el-input>
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
              @click="submitProjectForm('projectForm')"
            >确 定</el-button>

            <el-button
              type="info"
              size="mini"
              @click="closeDialogForm('projectForm')"
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
  name: 'AuxiliaryProjectBaseTest',
  data() {
    //校验工程号是否存在！
    const rulesProjectNnumber = (rule, value, callback) => {
      if (this.isEdit) {
        callback();
      }
      //使用Axios进行校验 
      axios.post(
        this.baseURL + 'project_name/check/',
        {
          project_name: value,
        }
      )
        .then((res) => {
          //请求成功
          if (res.data.code === 1) {
            if (res.data.exists) {
              callback(new Error("工程号已存在！"));
            } else {
              callback();
            }
          } else {
            //请求失败
            callback(new Error("校验工程号后端出现异常！"))
          }
        })
        .catch((err) => {
          //如果请求失败在控制台打印
          console.log(err);
        });
    }
    return {
      Projects: [], //所有的工程信息
      pageProjects: [], //分页后当前页的工程
      baseURL: " http://127.0.0.1:8000/",
      inputStr: '', //输入的查询条件
      selectProjects: [], //选择复选框是把选择记录存在这个几个

      //====分页相关的变量====
      total: 0, //数据的总行数 
      currentpage: 1, //当前的所在的页
      pagesize: 20, //每页显示多少行数据
      //====弹出框表单====
      dialogVisible: false, //控制弹出框表单是否展示
      dialogTitle: "", //弹出框的标题
      isView: false, //标识是否是查看
      isEdit: false, //标识是否是修改
      projectForm: {    //弹出框表单对相应绑定数据
        project_name: '',
        equipment_capacity: '',
        investor: '',
        start_time: '',
        completion_time: '',
        project_category: '',
        project_status: '',
      },
      rules: {
        project_name: [
          { required: true, message: '工程名称不能为空', trigger: 'blur' },
          { validator: rulesProjectNnumber, trigger: 'blur' }, //校验工程号是否存在！
        ],
        equipment_capacity: [
          { required: true, message: '风机容量不能为空', trigger: 'blur' },
        ],
        investor: [
          { required: true, message: '投资方不能为空', trigger: 'blur' },
        ],
        start_time: [
          { required: false, message: '开工时间不能为空', trigger: 'change' },
        ],
        completion_time: [
          { required: true, message: '竣工时间不能为空', trigger: 'change' },
        ],
        project_category: [
          { required: true, message: '项目类别不能为空', trigger: 'blur' },
        ],
        project_status: [
          { required: true, message: '状态不能为空', trigger: 'blur' },
        ]
      }
    }
  },
  mounted() {
    //自动加载数据
    this.getProjects();
  },
  methods: {
    //获取所有工程信息
    getProjects: function () {
      //记录this的地址
      let that = this
      //使用Axios实现Ajax请求 
      axios
        .get(that.baseURL + "projects/")
        .then(function (res) {
          //请求成功后执行的函数
          if (res.data.code === 1) {
            //把数据给projects
            that.projects = res.data.data;
            //获取返回记录的总行数
            that.total = res.data.data.length;
            //获取当前页的数据
            that.getPageProjects();
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
    getAllProjects() {
      //清空输入的inputStr
      this.inputStr = "";
      //获取所有的数据
      this.getProjects();
    },
    //获取当前页的工程数据
    getPageProjects() {
      //清空pageProjects中的数据
      this.pageProjects = [];
      //获得当前页的数据
      for (let i = (this.currentpage - 1) * this.pagesize; i < this.total; i++) {
        //遍历数据添加到pageProject中
        this.pageProjects.push(this.projects[i]);
        //判断是否达到一页的要求
        if (this.pageProjects.length === this.pagesize) break;
      }
    },
    //实现工程信息查询
    queryProjects() {
      //使用Ajax请求--POST-->传递InputStr
      let that = this
      //开始Ajax请求
      axios
        .post(
          that.baseURL + "projects/query/",
          {
            inputstr: that.inputStr,
          }
        )
        .then(function (res) {
          if (res.data.code === 1) {
            //把数据给projects
            that.projects = res.data.data;
            //获取返回记录的总行数
            that.total = res.data.data.length;
            //获取当前页的数据
            that.getPageProjects();
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
    //添加工程时打开表单
    addProject() {
      //修改标题
      this.dialogTitle = "添加工程明细";
      //弹出表单
      this.dialogVisible = true;
    },
    //查看工程的明细
    viewProject(row) {
      //修改标题
      this.dialogTitle = "查看工程明细";
      //修改isView变量
      this.isView = true;
      //弹出表单
      this.dialogVisible = true;
      //深拷贝方法：
      this.projectForm = JSON.parse(JSON.stringify(row))
    },
    //修改工程的明细
    updateProject(row) {
      //修改标题
      this.dialogTitle = "修改工程明细";
      //修改isEdit变量
      this.isEdit = true;
      //弹出表单
      this.dialogVisible = true;
      //深拷贝方法：
      this.projectForm = JSON.parse(JSON.stringify(row))
    },
    //提交工程的表单（添加、修改）
    submitProjectForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //校验成功后，执行添加或者修改？
          if (this.isEdit) {
            //修改
            this.submitUpdateProject();
          } else {
            //添加
            this.submitAddProject();
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //添加到数据库的函数
    submitAddProject() {
      //定义that
      let that = this;
      //执行Axios请求
      axios
        .post(that.baseURL + 'project/add/', that.projectForm)
        .then(res => {
          //执行成功
          if (res.data.code === 1) {
            //获取所有工程的信息
            that.projects = res.data.data;
            //获取记录条数
            that.total = res.data.data.length;
            //获取分页信息
            that.getPageProjects();
            //提示：
            that.$message({
              message: '数据添加成功！',
              type: 'success'
            });
            //关闭窗体
            this.closeDialogForm('projectForm');
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
    submitUpdateProject() {
      //定义that
      let that = this;
      //执行Axios请求
      axios
        .post(that.baseURL + 'project/update/', that.projectForm)
        .then(res => {
          //执行成功
          if (res.data.code === 1) {
            //获取所有工程的信息
            that.projects = res.data.data;
            //获取记录条数
            that.total = res.data.data.length;
            //获取分页信息
            that.getPageProjects();
            //提示：
            that.$message({
              message: '数据修改成功！',
              type: 'success'
            });
            //关闭窗体
            this.closeDialogForm('projectForm');
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
    //删除一条工程记录 
    // deleteProject(row) {
    //   //等待确认
    //   this.$confirm('是否确认删除工程信息【工程名称：' + row.project_name + '】信息？',
    //     '提示', {
    //     confirmButtonText: '确定删除',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     //确认删除响应事件
    //     let that = this
    //     //调用后端接口
    //     axios.post(that.baseURL + 'project/delete/', { project_name: row.project_name })
    //       .then(res => {
    //         if (res.data.code === 1) {
    //           //获取所有工程信息
    //           that.projects = res.data.data;
    //           //获取记录数
    //           that.total = res.data.data.length;
    //           //分页 
    //           that.getPageProjects();
    //           //提示
    //           that.$message({
    //             message: '数据删除成功！',
    //             type: 'success'
    //           });
    //         } else {
    //           that.$message.error(res.data.msg);
    //         }
    //       })

    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     });
    //   });
    // },
    // deleteProjects() {
    //   //等待确认
    //   this.$confirm("是否确认批量删除" + this.selectProjects.length + "个工程信息吗？",
    //     '提示', {
    //     confirmButtonText: '确定删除',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     //确认删除响应事件
    //     let that = this
    //     //调用后端接口
    //     axios.post(that.baseURL + 'projects/delete/', { project: that.selectProjects })
    //       .then(res => {
    //         if (res.data.code === 1) {
    //           //获取所有工程信息
    //           that.projects = res.data.data;
    //           //获取记录数
    //           that.total = res.data.data.length;
    //           //分页 
    //           that.getPageProjects();
    //           //提示
    //           that.$message({
    //             message: '数据批量删除成功！',
    //             type: 'success'
    //           });
    //         } else {
    //           that.$message.error(res.data.msg);
    //         }
    //       })

    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     });
    //   });
    // },
    //关闭弹出框的表单
    closeDialogForm(formName) {
      //重置表单的校验
      this.$refs[formName].resetFields();
      //清空
      this.projectForm.project_name = "";
      this.projectForm.equipment_capacity = "";
      this.projectForm.investor = "";
      this.projectForm.start_time = "";
      this.projectForm.completion_time = "";
      this.projectForm.project_category = "";
      this.projectForm.project_project_status = "";
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
          url: that.baseURL + 'excel/import/project/',
          data: fileReq
        }
      ).then(res => {
        // 根据code判断是否成功
        if (res.data.code === 1) {
          //把照片给image 
          that.projects = res.data.data;
          //计算总共多少条
          that.total = res.data.data.length;
          //分页
          that.getPageProjects();
          //弹出框体显示结果 
          this.$alert('本次导入完成! 成功：' + res.data.success + '失败：' + res.data.error
            , '导入结果展示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: "本次导入失败数量为：" + res.data.error + ",具体的工程号：" + res.data.errors,
              });
            }
          });
          //把失败明细打印
          console.log("本次导入失败数量为：" + res.data.error + ",具体的工程号：");
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
      axios.get(that.baseURL + 'excel/export/project/')
        .then(res => {
          if (res.data.code === 1) {
            //拼接excel 的完整URL
            let url = that.baseURL + 'media/' + res.data.equipment_capacity;
            //下载
            window.open(url);
            alert("下载成功")
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
      this.getPageProjects();
    },
    //调整当前的页码
    handleCurrentChange(pageNumber) {
      //修改当前的页码
      this.currentpage = pageNumber;
      //数据重新分页
      this.getPageProjects();
    },
    //选择复选框时触发的操作
    handleSelectionChange(data) {
      this.selectProjects = data;
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