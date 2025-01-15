<template>
  <div class="webrtc-comp webrtc-player">
    <video
      ref="ele"
      controls
      disablePictureInPicture
      controlsList="nofullscreen"
    />
    <div class="webrtc-video-play-button" />
  </div>
</template>

<script setup>
import {loadjs} from '~/common/utils';
import {ref, watchEffect} from 'vue';
const ele = ref();
let player;
const props = defineProps({url: String});
watchEffect(() => {
  const url = props.url;
  loadjs('jswebrtc.min.js', 'JSWebrtc').then(JSWebrtc => {
    const options = {
      video: ele.value,
      autoplay: true,
      onPlay: () => {
        // onPlay();
      },
      onPause: () => {
        // onPause();
        ele.value.play();
      },
    };
    player = new JSWebrtc.Player(url, options);
  });
});


</script>

<style scoped lang="less">
.webrtc-comp {
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;
  video {
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: 0 0;
    &::-webkit-media-controls-enclosure {
       display: none;
     }
    object-fit: contain;
  }
}
</style>
