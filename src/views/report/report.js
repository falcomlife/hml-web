import axios from 'axios'
import jutils from 'jutils-src'

export default {
  name: 'report',
  data() {
    return {
      ordermonth: '',
      ordermonthcustomer: '',
      inStoragemonth: '',
      orderStatistics: 0,
      inStorageStatistics: 0,
      orderByColor: [],
      authorities: [],
      reInStorageCount: 0,
      reInStorageRatio: 0
    }
  },
  created() {
    var data = new Date();
    data.setDate(1)
    data.setHours(0);
    data.setMinutes(0);
    data.setSeconds(0);
    data.setMilliseconds(0);
    let dataStr = jutils.formatDate(data, "YYYY-MM-DD HH:ii:ss")
    this.ordermonth = dataStr
    this.ordermonthcustomer = dataStr
    this.inStoragemonth = dataStr
    this.getOrderStatistics()
    this.getOrderStatisticsColor()
    this.getOrderStatisticsCustomer()
    this.$api.login.tokenVail().then(res => {
      if (res.data.s != 0) {
        this.$route.replace('/login')
      } else {
        this.authorities = res.data.rs.authorities
      }
    })
  },
  mounted() {

  },
  computed: {
    scrollerHeight: function() {
      return (window.innerHeight * 0.84) + 'px'; //自定义高度需求
    },
    heightRow1: function() {
      return (window.innerHeight * 0.05) + 'px'; //自定义高度需求
    },
    heightRow2: function() {
      return (window.innerHeight * 0.63) + 'px'; //自定义高度需求
    },
    heightRow3: function() {
      return (window.innerHeight * 0.05) + 'px'; //自定义高度需求
    },
    heightRow4: function() {
      return (window.innerHeight * 0.84) + 'px'; //自定义高度需求
    },
  },
  methods: {
    getOrderStatistics() {
      if (this.ordermonth == null) {
        this.orderStatistics = 0
        return
      }
      this.$api.report.getOrderStatistics({
        time: this.ordermonth,
      }).then(res => {
        if (res.data.s == 0) {
          this.orderStatistics = res.data.rs
        }
      })
    },
    getOrderStatisticsColor() {
      if (this.ordermonth == null) {
        this.orderByColor = []
        return
      }
      this.$api.report.getOrderStatisticsColor({
        time: this.ordermonth,
      }).then(res => {
        if (res.data.s == 0) {
          this.orderByColor = res.data.rs
          let data = [
            ['score', 'amount', 'product']
          ]
          res.data.rs.forEach((item, index) => {
            let one = [item.ratio, item.count, item.color]
            data.push(one)
          })
          var myChart = this.$echarts.init(document.getElementById('echartsColorSum'));
          console.log(data)
          var option = {
            dataset: {
              source: data
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              name: '组件数（个）'
            },
            yAxis: {
              type: 'category',
              name: '镀金颜色'
            },
            visualMap: {
              orient: 'horizontal',
              left: 'center',
              min: 0,
              max: 100,
              text: ['100%', '0%'],
              // Map the score column to color
              dimension: 0,
              inRange: {
                color: ['#65B581', '#FFCE34', '#FD665F']
              }
            },
            series: [{
              name: '数量',
              type: 'bar',
              encode: {
                x: 'amount',
                y: 'product'
              },
            }]
          };
          myChart.setOption(option);
        }
      })
    },
    getInStorageStatistics() {
      if (this.inStoragemonth == null) {
        this.inStorageStatistics = 0
        return
      }
      this.$api.report.getInStorageStatistics({
          time: this.inStoragemonth,
        }).then(res => {
          if (res.data.s == 0) {
            this.inStorageStatistics = res.data.rs
          } else {
            this.$message({
              showClose: true,
              message: res.data.rs,
              type: 'error'
            });
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getInStorageStatisticsRatio() {
      if (this.inStoragemonth == null) {
        this.inStorageStatistics = 0
        return
      }
      this.$api.report.getInStorageStatisticsRatio({
        time: this.inStoragemonth,
      }).then(res => {
        if (res.data.s == 0) {
          this.reInStorageRatio = res.data.rs.ratio
          this.reInStorageCount = res.data.rs.recount
        } else {
          this.$message({
            showClose: true,
            message: res.data.rs,
            type: 'error'
          });
        }
      })
    },
    getOrderStatisticsCustomer() {
      if (this.ordermonthcustomer == null) {
        this.ordermonthcustomer = 0
        return
      }
      this.$api.report.getOrderStatisticsCustomer({
        time: this.ordermonthcustomer,
      }).then(res => {
        let name = res.data.rs.name
        let count = res.data.rs.count
        var chartDom = document.getElementById('echartsCustomerSum');
        var myChart = this.$echarts.init(chartDom);
        var option;
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45
            },
            data: name,
            name: '科室'
          },
          yAxis: {
            type: 'value',
            name: '组件数（个）'
          },
          series: [{
            data: count,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }]
        };
        option && myChart.setOption(option);
      })
    },
    exportOrderStatisticsCustomerExcel() {
      if (this.ordermonthcustomer == null) {
        this.ordermonthcustomer = 0
        return
      }
      this.$api.report.getOrderStatisticsCustomerExcel({
        time: this.ordermonthcustomer,
      }).then(
        res => {
          var blob = new Blob([res.data], {
            type: `application/vnd.ms-excel`
          })
          const link = document.createElement('a')
          const name = `月科室金额明细.xlsx`
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.setAttribute('download', name)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          this.$message({
            title: '成功',
            message: '导出成功！',
            type: 'success',
            duration: 1000
          })
        })
    },
    orderChange(e) {
      this.getOrderStatistics()
      this.getOrderStatisticsColor()
    },
    orderChangeCustomer(e) {
      this.getOrderStatisticsCustomer()
    },
    inStorageChange(e) {
      this.getInStorageStatistics()
      this.getInStorageStatisticsRatio()
    },
  }
}
