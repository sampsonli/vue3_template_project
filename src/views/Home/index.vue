<template>
  <div class="home-page">
    num={{model.num}}
    <br/>
    <div class="btn" @click="model.addNum">测试+1</div>

  </div>

</template>

<script setup>
import {useModel} from "mtor-vue";
import HomeModel from "~/views/Home/HomeModel";
const model = useModel(HomeModel);
</script>

<style scoped lang="less" src="./style.less"></style>