<template>
  <div class="accidentType-container">
    <div class="accidentType-detail">
      <!-- 1 -->
      <el-row :gutter="20">
        <el-col :span="12">
          文字文字
        </el-col>
        <el-col :span="12">
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
        </el-col>
      </el-row>
      <!-- 2 -->
      <el-row :gutter="20">
        <el-col :span="12">
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
        </el-col>
        <el-col :span="12">
          文字文字
        </el-col>
      </el-row>
      <!-- 3 -->
      <el-row :gutter="20">
        <el-col :span="12">
          机体倾翻事故
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-carousel
              :interval="5000"
              arrow="always"
            >
              <el-carousel-item>
                <img
                  src="http://5b0988e595225.cdn.sohucs.com/images/20200423/8b3c1052eda34887b4960d9297e0481f.jpeg"
                  alt="机体倾翻事故1"
                >
              </el-carousel-item>
              <el-carousel-item>
                <img
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp3.ssl.cdn.btime.com%2Ft0130eab6cd8195765e.jpg%3Fsize%3D695x433&refer=http%3A%2F%2Fp3.ssl.cdn.btime.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616500041&t=8e09d01a4f5217bc06cde668d9d3188f"
                  alt="机体倾翻事故2"
                >
              </el-carousel-item>
              <el-carousel-item>
                <img
                  src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=691561542,4040503316&fm=15&gp=0.jpg"
                  alt="机体倾翻事故2"
                >
              </el-carousel-item>
              <el-carousel-item>
                <img
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20190503%2Fa33b5d5d7d244e3b9f5b7db7ad645aa0.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616500041&t=91dfd535db23d75779736574ecc33391"
                  alt="机体倾翻事故2"
                >
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
      <!-- 4 -->
      <el-row :gutter="20">
        <el-col :span="12">
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
        </el-col>
        <el-col :span="12">
          文字文字
        </el-col>
      </el-row>
      <!-- 5 -->
      <el-row :gutter="20">
        <el-col :span="12">
          文字文字
        </el-col>
        <el-col :span="12">
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

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>