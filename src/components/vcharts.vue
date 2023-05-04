<!--
 * echarts图表按需引入
-->
<template>
  <v-chart
    class="chart"
    :option="option"
  />
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart, LineChart } from 'echarts/charts';
import { LegendComponent, TitleComponent, TooltipComponent, PolarComponent, GridComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

use([CanvasRenderer, PieChart, BarChart, LineChart, TitleComponent, TooltipComponent, LegendComponent, PolarComponent, GridComponent]);

export default {
  name: 'vcharts',
  props: {
    edata: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      data () {
        return {
        };
      }
    };
  },
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: 'white'
  },
  computed: {
    option () {
      return this.options;
    }
  }
};
</script>

<style scoped>
.chart {
  height: 100%;
}
</style>
