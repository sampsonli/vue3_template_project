<template>
  <div class="home-page">
    <div class="head">
      <input v-model="model.input" class="input" />
    <div class="btn" :class="{disable: !model.btnEnable}" @click="model.ask">{{ model.btnEnable ? '发送' : '请稍后' }}</div>
    </div>
   
   <el-date-picker
        v-model="model.date"
        type="date"
        placeholder="选择日期"
        format="YYYY-MM-DD"
        date-format="YYYY-MM-DD"

      />


      <div class="hello">hello</div>

  </div>

</template>

<script setup>
import {useModel} from "mtor-vue";
import HomeModel from "~/views/Home/HomeModel";
const model = useModel(HomeModel);
</script>

<style scoped lang="less" src="./style.less"></style>
