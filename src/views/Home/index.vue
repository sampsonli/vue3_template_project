<template>
  <div class="home-page">
    <div class="head">
      <input v-model="model.input" class="input" />
    <div class="btn" :class="{disable: !model.btnEnable}" @click="model.ask">{{ model.btnEnable ? '发送' : '请稍后' }}</div>
    <el-button>hello</el-button>
    </div>
   
   <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"

      />

  </div>

</template>

<script setup>
import {ref} from 'vue';
import {useModel} from "mtor-vue";
import HomeModel from "~/views/Home/HomeModel";
const model = useModel(HomeModel);
const value1 = ref();
</script>

<style scoped lang="less" src="./style.less"></style>
