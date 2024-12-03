<template>
  <div class="home-page">

    <div class="val">
      <div class="btn" @click="model.fullscreen()">全屏</div>
      <div class="count" @click="model.add()">{{model.count}}</div>
    </div>
  </div>

</template>

<script setup>
import {useInitModel} from 'mtor-vue';
import HomeModel from '~/models/HomeModel';
const model = useInitModel(HomeModel);







console.log('hello');
</script>

<style scoped lang="less" src="./style.less"></style>
