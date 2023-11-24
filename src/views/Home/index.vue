<template>
  <div class="home-page">
    <div class="head">
      <input v-model="model.input" class="input" />
    <div class="btn" :class="{disable: !model.btnEnable}" @click="model.ask">{{ model.btnEnable ? '发送' : '请稍后' }}</div>
    </div>
   
    <VueShowdown
      :markdown="model.text"
      flavor="github"
      :options="{ emoji: true }"
    />

  </div>

</template>

<script setup>
import {useModel} from "mtor-vue";
import HomeModel from "~/views/Home/HomeModel";
const model = useModel(HomeModel);
</script>

<style scoped lang="less" src="./style.less"></style>
