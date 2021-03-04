<template>
  <div>
    <el-form
      :model="projectForm"
      :rules="rules"
      ref="projectForm"
      style="margin-top:25px;"
      label-width="120px"
      label-position="right"
      size="medium"
    >
      <div class="form-container">
        <el-form-item
          label="工程名称："
          prop="project_name"
        >
          <el-input
            v-model="projectForm.project_name"
            :disabled="isView"
            suffix-icon="el-icon-edit"
            style="width:100% "
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
            style="width:100% "
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
            style="width:100% "
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
            style="width:100% "
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
            style="width:50% "
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
            style="width:50% "
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
            style="width:50% "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="评价结果："
          prop="evaluation_result"
        >
          <el-input
            v-model="projectForm.evaluation_result"
            :disabled="isView"
            suffix-icon="el-icon-edit"
            style="width:100% "
          >
          </el-input>
        </el-form-item>
      </div>
      <el-button-group>
        <!-- <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          @click="addProject()"
        >添加</el-button> -->
        <el-button
          type="primary"
          v-show="!isView"
          @click="submitProjectForm('projectForm')"
        >确 定</el-button>

        <!-- <el-button
          type="info"
          @click="closeDialogForm('projectForm')"
        >取 消
        </el-button> -->
      </el-button-group>
      <div class="content-container">
        <el-form-item prop="project_content">
          <Tinymce
            ref="editor"
            v-model="projectForm.project_content"
            style="width:100%"
            :height="400"
          />
        </el-form-item>
      </div>

    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'ProjectDetail',
  components: { Tinymce },
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
      // Projects: [], //所有的工程信息
      // pageProjects: [], //分页后当前页的工程
      baseURL: " http://127.0.0.1:8000/",
      // inputStr: '', //输入的查询条件
      // selectProjects: [], //选择复选框是把选择记录存在这个几个

      // //====分页相关的变量====
      // total: 0, //数据的总行数 
      // currentpage: 1, //当前的所在的页
      // pagesize: 20, //每页显示多少行数据
      // //====弹出框表单====
      // dialogVisible: false, //控制弹出框表单是否展示
      // dialogTitle: "", //弹出框的标题
      isView: false, //标识是否是查看
      // isEdit: false, //标识是否是修改
      projectForm: {    //弹出框表单对相应绑定数据
        project_name: '',
        equipment_capacity: '',
        investor: '',
        start_time: '',
        completion_time: '',
        project_category: '',
        project_status: '',
        project_content: '',
        evaluation_result: ''
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
        ],
        project_content: [
          { required: false, trigger: 'blur' },
        ],
        evaluation_result: [
          { required: false, trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    //添加工程时打开表单
    // addProject() {
    //   //修改标题
    //   this.dialogTitle = "添加工程明细";
    //   //弹出表单
    //   this.dialogVisible = true;
    // },
    //查看工程的明细
    // viewProject(row) {
    //   //修改标题
    //   this.dialogTitle = "查看工程明细";
    //   //修改isView变量
    //   this.isView = true;
    //   //弹出表单
    //   this.dialogVisible = true;
    //   //深拷贝方法：
    //   this.projectForm = JSON.parse(JSON.stringify(row))
    // },
    //修改工程的明细
    // updateProject(row) {
    //   //修改标题
    //   this.dialogTitle = "修改工程明细";
    //   //修改isEdit变量
    //   this.isEdit = true;
    //   //弹出表单
    //   this.dialogVisible = true;
    //   //深拷贝方法：
    //   this.projectForm = JSON.parse(JSON.stringify(row))
    // },
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
            // that.getPageProjects();
            //提示：
            that.$message({
              message: '数据添加成功！',
              type: 'success'
            });
            //关闭窗体
            // this.closeDialogForm('projectForm');
            // 清空表单
            this.emptyForm('projectForm')
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
            // that.getPageProjects();
            //提示：
            that.$message({
              message: '数据修改成功！',
              type: 'success'
            });
            //关闭窗体
            // this.closeDialogForm('projectForm');
            // 清空表单
            this.emptyForm('projectForm')
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
    //关闭弹出框的表单
    emptyForm(formName) {
      //重置表单的校验
      this.$refs[formName].resetFields();
      //清空
      this.projectForm.project_name = "";
      this.projectForm.equipment_capacity = "";
      this.projectForm.investor = "";
      this.projectForm.start_time = "";
      this.projectForm.completion_time = "";
      this.projectForm.project_category = "";
      this.projectForm.project_status = "";
      // 清空 tinymce中的内容
      // this.projectForm.project_content = ""; // 这种方式清空不了
      this.$refs.editor.setContent("");
      //关闭
      // this.dialogVisible = false;
      //初始化isView和isEdit值
      this.isEdit = false;
      this.isView = false;
    },


  },
}
</script>
<style scoped>
.el-form-item {
  margin: 20px 100px 20px 20px;
}
.el-button-group {
  margin-left: 145px;
}
</style>