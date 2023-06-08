<template>
  <div class="home-page">
    num={{model.num}}
    <br/>
    <div class="btn" @click="model.addNum">测试</div>

  </div>

</template>

<script setup>
import {useInitModel} from "mtor-vue";
import HomeModel from "~/views/Home/HomeModel";
const model = useInitModel(HomeModel, ({init})=> init());
</script>

<style scoped lang="less" src="./style.less"></style>