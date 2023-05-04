<!--
 * 天地图
-->
<template>
  <div
    id="tdtmap"
    class="tdtmap"
  >
  </div>
</template>

<script>
// openlayers地图
import "ol/ol.css";
import {
  Icon,
  Style,
  Fill,
  Text
} from "ol/style";
import 'ol/ol.css'
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Point } from "ol/geom";
import { Feature } from "ol";
import { defaults as defaultControls } from "ol/control";//默认缩放
import * as interaction from 'ol/interaction';//旋转

export default {
  props: {
    pointData: {
      type: Array,
      default: () => []
    },
    mapView: {
      type: Object,
      default: () => { }
    },
    mapType: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: 'assets/image/map/location.png'
    }
  },
  data () {
    return {
      map: null,
      point: [],//点位数据
      source: [],//点位数据图层
      baseLayer: {},//影像
      roadLayer: {},//标注
    }
  },
  watch: {
    pointData (n, o) {
      n.forEach(v => { this.addPoint(v) })
    }
  },
  methods: {
    initMap () {
      // 底图天地图注记  cta——道路+中文注记
      this.baseLayer = new TileLayer({
        title: "天地图",
        source: new XYZ({
          url: this.mapType
        }),
        zIndex: 2
      });
      //天地图路网
      this.roadLayer = new TileLayer({
        title: "天地图路网",
        source: new XYZ({
          url: "http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=55e03e7e6a583775442e303f3aa0e6f0"
        }),
        zIndex: 3
      });

      // 加载地图
      this.map = new Map({
        target: "tdtmap",
        controls: defaultControls({
          zoom: false,
          rotate: false,
          attribution: false
        }),
        layers: [this.baseLayer, this.roadLayer],
        view: new View(this.mapView)
      });
    },
    // 添加点位
    addPoint (v) {
      //定义图层
      const layer = new VectorLayer({
        source: new VectorSource(),
        zIndex: 15
      })
      // 添加图层
      this.map.addLayer(layer);
      // 创建 feature 坐标信息
      const feature = new Feature({
        type: 'icon',
        // 经纬度转换成坐标信息
        geometry: new Point(v.long),
        // 可以带别的参数，key 可以随便写，不冲突就行，这里将所有的参数都放进来，供后续使用
        ...v
      })
      feature.setStyle(
        new Style({
          // 标点的图片，如果要标不同类型的点，这个图片可以判断加
          image: new Icon({
            anchor: [0.5, 0.5],
            src: require(`@/${this.imgUrl}`),
            with: 28,
            height: 28,
          }),
          // 标点的文字
          text: new Text({
            // 文字
            text: v.title,
            // 文字样式
            fill: new Fill({
              color: '#ffffff'
            }),
            //背景
            backgroundFill: new Fill({
              color: '#0f7a2f'
            }),
            font: '12px Calibri',
            padding: [4, 2, 2, 4],
            // 偏移量
            offsetY: 28,
          })
        })
      )
      // 将 feature 坐标信息添加在地图上
      layer.getSource().addFeatures([feature])
      //将图层存放全局变量，方便其他地方移除图层
      this.source.push(layer);
    },
    // 要素点击
    getElement () {
      var selectClick = new interaction.Select();
      this.map.addInteraction(selectClick);
      selectClick.on('select', (e) => {
        var features = e.target.getFeatures().getArray();
        if (features.length > 0) {
          //获取坐标
          // var coor = features[0].getGeometry().getCoordinates();
          //获取属性信息
          var property = features[0].getProperties();
          let eleId = property["id"];
          //将id传至父组件
          if (eleId) this.$emit("pointDetail", eleId);
        }
      })
    },
  },
  mounted () {
    this.initMap();
    this.getElement();
  }
}
</script>
<style lang="scss" scoped>
#tdtmap {
  height: 100%;
  width: 100%;
  background-color: #082f65;
}
</style>