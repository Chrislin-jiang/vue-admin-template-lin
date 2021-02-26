<template>
  <div>
    <div class="el-table-input">
      <el-table
        :data="tableData6"
        border=""
        :summary-method="getSummaries"
        show-summary
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column
          prop="id"
          label="ID"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="amount1"
          label="数值 1（元）"
        >
        </el-table-column>
        <el-table-column
          prop="amount2"
          label="数值 2（元）"
        >
        </el-table-column>
        <el-table-column
          prop="amount3"
          label="数值 3（元）"
        >
        </el-table-column>
        <el-table-column
          label="总分"
          width="100"
          prop="amount4"
        >
          <template v-slot="scope">
            <el-input
              v-model="scope.numberscore"
              size="small"
              placeholder="请打分"
              style="width: 80px;"
              @blur="aaa(scope.$index,scope.numberscore)"
            ></el-input>

          </template>
        </el-table-column>
        <el-table-column
          label="总分"
          width="100"
          prop="amount4"
        >
          <template v-slot="scope">
            <el-input
              v-model="scope.numberscore"
              size="small"
              placeholder="请打分"
              style="width: 80px;"
              @blur="aaa(scope.$index,scope.numberscore)"
            ></el-input>

          </template>
        </el-table-column>
        <el-table-column
          label="总分"
          width="100"
          prop="amount4"
        >
          <template v-slot="scope">
            <el-input
              v-model="scope.numberscore"
              size="small"
              placeholder="请打分"
              style="width: 80px;"
              @blur="aaa(scope.$index,scope.numberscore)"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData6: [{
        id: '12987122',
        name: '王小虎111',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎222',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎333',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎444',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王小虎555',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }]
    }
  },
  created() {
    this.tableData6.map((item) => {
      item.amount4 = ''
    })
    // console.log('created----this.tableData6', this.tableData6)
  },
  methods: {
    // 失去焦点
    aaa(index, number) {
      //   const temp = Object.assign({}, this.tableData6)
      this.tableData6[index].amount4 = number
      console.log('this.tableData6', this.tableData6)
      // if (index === (this.tableData6.length - 1)) {
      //   // console.log("++++++++")
      //   this.tableData6 = this.tableData6
      // }
    },
    getSummaries(param) {
      const {
        columns,
        data
      } = param
      // console.log('param', param)
      // console.log('data', data)
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => {
          return Number(item[column.property])
        })
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    }
  }
}
</script>
