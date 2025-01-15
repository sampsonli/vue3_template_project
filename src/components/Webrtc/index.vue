<template>
  <div className="webrtc-comp" ref="wrapperRef"></div>
</template>

<script setup>
import {loadjs} from '~/common/utils';
import {onBeforeUnmount, ref, watchEffect, onMounted} from "vue";
// import { he } from 'element-plus/es/locale';
const wrapperRef = ref();
const props = defineProps({url: String});


onMounted(() => {
  loadjs('jswebrtc.min.js', 'JSWebrtc').then(JSWebrtc => {
    let video;
    let player;
    const initVideo = () => {
      console.log('初始化视频');
      if(player) player.destroy();
      video = document.createElement('video');
      player = new JSWebrtc.Player(props.url, {
        video,
        autoplay: true,
        onPause: () => {
          video.play();
        },
      });
    };
    watchEffect(initVideo);
    let before = 0;
    let timeout = 0;
    let finish = true;
    const interval = setInterval(() => {
      let currentTime = Math.floor(video.currentTime * 1000) || 0;
      if(currentTime !== before) { // 正常播放
        finish = true;
        clearTimeout(timeout);
        before = currentTime;
      } else {
        if(finish) {
          finish = false;
          timeout = setTimeout(() => {
            finish = true;
            initVideo();
          }, 1000 * 60);
        }
      }
    }, 5000);

    const wrapper = wrapperRef.value;
    const canvas = document.createElement('canvas');
    const canvasOffline = document.createElement('canvas'); // 离屏渲染
    wrapper.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const ctxOffline = canvasOffline.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctxOffline.imageSmoothingQuality = 'high';

    function config() {
      const is4k = innerWidth > 3000;
      const wWidth = wrapper.offsetWidth;
      const wHeight = wrapper.offsetHeight;
      let width, height;
      if (wWidth / wHeight >= 16 / 9) {
        width = 16 / 9 * wHeight;
        height = wHeight;
      } else {
        width = wWidth;
        height = 9 / 16 * wWidth;
      }
      canvas.width = width * 2;
      canvas.height = height * 2;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      // canvasOffline.width = is4k && (width * 2) || (width * 4);
      // canvasOffline.height = is4k && (height * 2) || (height * 4);
      canvasOffline.width = is4k && (width) || (width * 4);
      canvasOffline.height = is4k && (height) || (height * 4);
    }
    let playing = true;
    window.addEventListener('resize', config);
    onBeforeUnmount(() => {
      window.removeEventListener('resize', config);
      playing = false;
      clearInterval(interval);
    });
    config();

    let flag = true; // 保持30fps
    const isLast = props.url.indexOf('157') > -1;
    let time = 0;
    function render() {
      if(isLast) {

      // console.time('hello');
      // time = Date.now();
      }
      playing && window.requestAnimationFrame(render);
      if(!video) return;
      if (flag) {
        flag = false;
        return;
      } else {
        flag = true;
      }
      const offWidth = canvasOffline.width;
      const offHeight = canvasOffline.height;
      const vWidth =  video.videoWidth || 3840;
      const vHeight =  video.videoHeight || 2160;

      ctxOffline.clearRect(0, 0, offWidth, offHeight);
      ctxOffline.drawImage(video, 0, 0, vWidth, vHeight, 0, 0, offWidth, offHeight);


      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(canvasOffline, 0, 0, offWidth, offHeight, 0, 0, width, height);  //绘制视频
      if(isLast) {

      // console.log(Date.now() - time);
      }
    }
    render();
  });
});

</script>

<style scoped lang="less">
.webrtc-comp {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
