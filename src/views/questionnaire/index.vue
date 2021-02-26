<template>
  <div class="questionnaire-container">
    <div class="questionnaire-card">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>问卷调查：吊装安全性评价</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
          >操作按钮</el-button>
        </div>
        <div class="text item">
          <div class="questionnaire-form">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="300px"
              class="demo-ruleForm"
            >
              <el-form-item
                label="信息"
                prop="name"
              >
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item
                label="您的职位"
                prop="career"
              >
                <el-select
                  v-model="ruleForm.career"
                  placeholder="您的职位"
                >
                  <el-option
                    label="吊装工程师"
                    value="Hoisting engineer"
                  ></el-option>
                  <el-option
                    label="安全工程师"
                    value="Safety engineer"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="相关作业人员是否持证上岗"
                prop="resource"
              >
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="好"></el-radio>
                  <el-radio label="较好"></el-radio>
                  <el-radio label="一般"></el-radio>
                  <el-radio label="较低"></el-radio>
                  <el-radio label="低"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="相关作业人员是否持证上岗"
                prop="resource"
              >
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="好"></el-radio>
                  <el-radio label="较好"></el-radio>
                  <el-radio label="一般"></el-radio>
                  <el-radio label="较低"></el-radio>
                  <el-radio label="低"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="相关作业人员是否持证上岗"
                prop="resource"
              >
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="好"></el-radio>
                  <el-radio label="较好"></el-radio>
                  <el-radio label="一般"></el-radio>
                  <el-radio label="较低"></el-radio>
                  <el-radio label="低"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                >提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      //   imgSrc: require('@/assets/images/green-tree.webp'),
      ruleForm: {
        name: '',
        career: '',
        resource: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        career: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.questionnaire-container {
  display: flex;
  /*row设置主轴方向为水平方向*/
  flex-direction: row;
  /*定义了在当前行上,弹性项目沿主轴如何排布*/
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 1000px;
  background-image: url("../../assets/images/green-tree.webp");
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}

.box-card {
  /* text-align: center; */
  width: 900px;
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
</style>
