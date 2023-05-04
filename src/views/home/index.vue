<!--
 * 首页
-->
<template>
  <div id="box">
    <div class="v-chart">
      <div>
        <vcharts
          :edata="pieData"
          :options="pieOption"
        ></vcharts>
      </div>
      <div>
        <vcharts
          :edata="lineData"
          :options="lineOption"
        ></vcharts>
      </div>
    </div>
  </div>
</template>

<script>
import vcharts from '@/components/vcharts';
export default {
  components: {
    vcharts
  },
  data () {
    return {
      pieData: [
        { value: 335, label: '类别1' },
        { value: 310, label: '类别2' },
        { value: 234, label: '类别3' },
        { value: 135, label: '类别4' },
        { value: 1548, label: '类别5' }
      ],
      lineData: [[
        { value: 310, label: 'Mon' },
        { value: 310, label: 'Tue' },
        { value: 234, label: 'Wed' },
        { value: 135, label: 'Thu' },
        { value: 1548, label: 'Fri' },
        { value: 135, label: 'Sat' },
        { value: 1548, label: 'Sun' }
      ], [
        { value: 102, label: 'Mon' },
        { value: 301, label: 'Tue' },
        { value: 346, label: 'Wed' },
        { value: 35, label: 'Thu' },
        { value: 148, label: 'Fri' },
        { value: 1353, label: 'Sat' },
        { value: 158, label: 'Sun' }
      ]],
    };
  },
  computed: {
    //饼图
    pieOption () {
      return {
        title: {
          text: 'xxx类别占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.pieData.map(item => {
            return item.label;
          })
        },
        series: [
          {
            name: '01',
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: this.pieData.map(item => {
              item['name'] = item.label;
              return item;
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    },
    //折线图
    lineOption () {
      return {
        title: {
          text: 'xxx趋势',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}'
        },
        xAxis: {
          type: "category",
          data: this.lineData[0].map(item => item.label)
        },
        legend: {
          show: true,
          top: '10%'
        },
        yAxis: {},
        series: [
          {
            name: '01',
            type: 'line',
            data: this.lineData[0].map(item => item.value),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '02',
            type: 'line',
            data: this.lineData[1].map(item => item.value),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    },
  }
};
</script>

<style lang="scss" scoped>
#box {
  .v-chart {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    > div {
      height: 300px;
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
