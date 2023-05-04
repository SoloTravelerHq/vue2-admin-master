<!--
 * 地图示例
-->

<template>
  <div id="box">
    <tiandi-tu
      :pointData="point"
      :mapView="mapView"
      :mapType="mapType"
      @pointDetail="pointDetail"
    ></tiandi-tu>
  </div>
</template>

<script>
import TiandiTu from "@/components/Map/index";
import * as api from "@/api/demo"
export default {
  components: {
    TiandiTu
  },
  data () {
    return {
      point: [],
      imgUrl: '',
      //街道底图 http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55e03e7e6a583775442e303f3aa0e6f0
      //影像底图 http://t2.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=55e03e7e6a583775442e303f3aa0e6f0
      //地形底图 http://t2.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=55e03e7e6a583775442e303f3aa0e6f0
      mapType: "http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55e03e7e6a583775442e303f3aa0e6f0",
      mapView: {
        projection: "EPSG:4326",//映射规则
        center: [116.5317, 39.8427],//地图中心
        zoom: 10,//当前缩放层级
        minZoom: 2,//缩放最小层级
        maxZoom: 17,//缩放最大层级
      }
    }
  },
  mounted () {
    this.getPoint()
  },
  methods: {
    //  获取点位数据
    getPoint () {
      api.mapPoint()
        .then(res => {
          // console.log(res);
          this.point = res
        })
        .catch(err => {
          this.$message.error('获取失败，请检查网络')
        })
    },
    // 地图要素点击获取id
    pointDetail (e) {
      console.log(e);
    }
  },
}
</script>

<style lang="scss" scoped>
#box {
  width: 100%;
  height: 100%;
}
</style>