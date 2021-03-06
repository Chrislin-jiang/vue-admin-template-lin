<template>
  <div class="accidentType-container">
    <div class="accidentType-detail">
      <!-- 1 -->
      <el-row :gutter="20">
        <!-- <el-col :span="12">
          挤压碰撞事故
        </el-col> -->
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-carousel
              :interval="5000"
              arrow="always"
            >
              <el-carousel-item>
                <img
                  src="../../assets/images/accident1-1.jpg"
                  alt="挤压碰撞事故1"
                >
              </el-carousel-item>
              <el-carousel-item>
                <img
                  src="../../assets/images/accident1-2.jpg"
                  alt="挤压碰撞事故2"
                >
              </el-carousel-item>
            </el-carousel>
          </div>
          <div>挤压碰撞事故</div>
        </el-col>
        <!-- </el-row> -->
        <!-- 2 -->
        <!-- <el-row :gutter="20"> -->
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-carousel
              :interval="5000"
              arrow="always"
            >
              <el-carousel-item>
                <img
                  src="../../assets/images/accident2-1.jpg"
                  alt="吊具/物坠落事故1"
                >
              </el-carousel-item>
              <el-carousel-item>
                <img
                  src="../../assets/images/accident2-2.jpg"
                  alt="吊具/物坠落事故2"
                >
              </el-carousel-item>
              <el-carousel-item>
                <img
                  src="../../assets/images/accident2-4.jpg"
                  alt="吊具/物坠落事故4"
                >
              </el-carousel-item>
            </el-carousel>
          </div>
          <div>吊具/物坠落事故</div>

        </el-col>
        <!-- <el-col :span="12">
          吊具/物坠落事故
        </el-col> -->
        <!-- </el-row> -->
        <!-- 3 -->
        <!-- <el-row :gutter="20"> -->
        <!-- <el-col :span="12">
          机体倾翻事故
        </el-col> -->
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-carousel
              :interval="5000"
              arrow="always"
            >
              <el-carousel-item>
                <img
                  src="../../assets/images/accident3-1.jpeg"
                  alt="机体倾翻事故1"
                >
              </el-carousel-item>
              <el-carousel-item>
                <img
                  src="../../assets/images/accident3-2.jpg"
                  alt="机体倾翻事故2"
                >
              </el-carousel-item>
              <el-carousel-item>
                <img
                  src="../../assets/images/accident3-3.jpg"
                  alt="机体倾翻事故3"
                >
              </el-carousel-item>
              <el-carousel-item>
                <img
                  src="../../assets/images/accident3-4.jpg"
                  alt="机体倾翻事故4"
                >
              </el-carousel-item>
            </el-carousel>
          </div>
          <div>机体倾翻事故</div>
        </el-col>
        <!-- </el-row> -->
        <!-- 4 -->
        <!-- <el-row :gutter="20"> -->
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-carousel
              :interval="5000"
              arrow="always"
            >
              <el-carousel-item
                v-for="item in 4"
                :key="item"
              >
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div>高处坠落</div>
        </el-col>
        <!-- <el-col :span="12">
          高处坠落
        </el-col> -->
        <!-- </el-row> -->
        <!-- 5 -->
        <!-- <el-row :gutter="20"> -->
        <!-- <el-col :span="12">
          触电事故
        </el-col> -->
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-carousel
              :interval="5000"
              arrow="always"
            >
              <el-carousel-item
                v-for="item in 4"
                :key="item"
              >
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div>触电事故</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.accidentType-container {
  font-family: "Times New Roman", Avenir, Helvetica, Arial, sans-serif;
  /* font-family: "Times New Roman", SimSun, Georgia, Serif; 
  SimSun 宋体，NSimSun 新宋体，KaiTi 楷体*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 15px;
  line-height: 25px;
  /* text-align: center; */
  color: #2c3e50;
  padding: 30px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }
.el-carousel-item .img {
  width: 100%;
  height: auto;
}
</style>