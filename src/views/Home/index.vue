<template>
  <div class="home-page">

    <div class="val" @click="model.add">
      {{model.count}}
    </div>
  </div>

</template>

<script setup>
import {useInitModel} from 'mtor-vue';
import HomeModel from '~/models/HomeModel';
const model = useInitModel(HomeModel);
</script>

<style scoped lang="less" src="./style.less"></style>
