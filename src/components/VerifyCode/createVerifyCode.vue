<!--
 * 验证码
-->
<template>
  <div class="verifyCodeCanvas">
    <canvas
      id="s-canvas"
      style="height: 38px; width: 100px; border-radius: 3px;"
    ></canvas>
  </div>
</template>
<script>
export default {
  name: 'SIdentify',
  props: {
    identifyCode: {
      type: String,
      default: '1234'
    },
    fontSizeMin: {
      type: Number,
      default: 28
    },
    fontSizeMax: {
      type: Number,
      default: 38
    },
    backgroundColorMin: {
      type: Number,
      default: 180
    },
    backgroundColorMax: {
      type: Number,
      default: 240
    },
    colorMin: {
      type: Number,
      default: 50
    },
    colorMax: {
      type: Number,
      default: 160
    },
    lineColorMin: {
      type: Number,
      default: 40
    },
    lineColorMax: {
      type: Number,
      default: 180
    },
    dotColorMin: {
      type: Number,
      default: 0
    },
    dotColorMax: {
      type: Number,
      default: 255
    }
  },
  data () {
    return {
      canvasW: 0,
      canvasH: 0
    };
  },
  methods: {
    // 生成一个随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 生成一个随机的颜色
    randomColor (min, max) {
      let r = this.randomNum(min, max);
      let g = this.randomNum(min, max);
      let b = this.randomNum(min, max);
      return `rgb(${r},${g},${b})`;
      // return 'rgb(255,255,255)'
    },
    drawPic () {
      let canvas = document.getElementById('s-canvas');
      let ctx = canvas.getContext('2d');
      ctx.textBaseline = 'bottom';
      // 绘制背景
      // ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(0, 0, this.canvasW, this.canvasH);
      // 绘制文字
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i);
      }
      this.drawLine(ctx);
      this.drawDot(ctx);
    },
    drawText (ctx, txt, i) {
      ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax);
      ctx.font = `${this.randomNum(this.fontSizeMin, this.fontSizeMax)}px SimHei`;
      let x = (i + 1) * (this.canvasW / (this.identifyCode.length + 1));
      let y = this.randomNum(this.fontSizeMax, this.canvasH - 5);
      let deg = this.randomNum(-25, 18);
      // 修改坐标原点和旋转角度
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(txt, 0, 0);
      // 恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    },
    drawLine (ctx) {
      // 绘制干扰线
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax);
        ctx.beginPath();
        ctx.moveTo(this.randomNum(0, this.canvasW), this.randomNum(0, this.canvasH));
        ctx.lineTo(this.randomNum(0, this.canvasW), this.randomNum(0, this.canvasH));
        ctx.stroke();
      }
    },
    drawDot (ctx) {
      // 绘制干扰点
      for (let i = 0; i < 19; i++) {
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(this.randomNum(0, this.canvasW), this.randomNum(0, this.canvasH), 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  },
  watch: {
    identifyCode () {
      this.drawPic();
    }
  },
  mounted () {
    let canvas = document.getElementById('s-canvas');
    this.$nextTick(() => {
      setTimeout(() => {
        this.canvasW = canvas.offsetWidth;
        this.canvasH = canvas.offsetHeight;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        this.drawPic();
      }, 500);
    });
  }
};
</script>
