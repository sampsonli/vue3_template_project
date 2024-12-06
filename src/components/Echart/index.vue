<template>

  <div ref="eleRef" class="echarts-comp">

  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref, watchEffect} from 'vue';

const eleRef = ref();
import {loadjs} from '~/common/utils';
 
const props = defineProps(['options']);
let resize;
onMounted(() => {
  loadjs('echarts.min.js', 'echarts').then(echarts => {
    const instance = echarts.init(eleRef.value);
    watchEffect(() => {

      if(props.options) {
        instance.setOption(props.options);
        console.log(props.options);
      }

    });
    resize = () => instance.resize();
    window.addEventListener('resize', resize);


  });
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
});

</script>

<style scoped>
.echarts-comp {
  width: 100%;
  height: 100%;

}

</style>