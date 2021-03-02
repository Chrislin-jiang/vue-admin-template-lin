<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <h2>{{ text }}</h2>
    <div class="card-container">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>卡片名称</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
          >操作按钮</el-button>
        </div>
        <div
          v-for="o in 4"
          :key="o"
          class="text item"
        >
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </div>
    <h2>全国特种设备事故统计</h2>
    <div class="echarts-container">
      <div
        id='accident-statistics'
        style='margin：0; width: 100%; height:500px;'
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'

export default {
  name: 'HoistingSafetyEvaluation',
  data() {
    return {
      text: '吊装安全评价系统'
    }
  },

  computed: {
    ...mapGetters([
      'name'
    ])
  },

  mounted() {
    this.drawAccidentEchart()
  },
  methods: {
    drawAccidentEchart() {
      // 初始化实例
      let accidentEchart = echarts.init(document.getElementById('accident-statistics'))

      // 绘制图表，定义数据
      let option = {
        // 全局调色盘。
        color: ['#FF69B4', '#FFA500', '#9400D3', '#FF3300', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: true },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['特种设备事故起数', '起重机械事故起数', '特种设备死亡人数', '起重机械死亡人数']
        },
        xAxis: [
          {
            type: 'category',
            name: '年份',
            data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '数量',
            min: 0,
            max: 300,
            // interval: 50,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '特种设备事故起数',
            type: 'line',
            data: [228, 227, 283, 257, 233, 238, 219, 130]
          },
          {
            name: '起重机械事故起数',
            type: 'line',
            data: [76, 61, 62, 79, 94, 93, 100, 26]
          },
          {
            name: '特种设备死亡人数',
            type: 'line',
            // yAxisIndex: 1,
            data: [292, 289, 282, 278, 269, 251, 224, 119]
          },
          {
            name: '起重机械死亡人数',
            type: 'line',
            // yAxisIndex: 1,
            data: [129, 84, 98, 114, 139, 119, 116, 26]
          },
        ]
      }

      if (option && typeof option === 'object') {
        accidentEchart.setOption(option);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
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
  width: 400px;
}
</style>
