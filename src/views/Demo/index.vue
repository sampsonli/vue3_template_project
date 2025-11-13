<template>

  <div class="container">
    hello demo-{{model.num}}
    <div class="btn" @click="model.add">测试wasm+webwork</div>
  </div>


</template>

<script setup>

import {useInitModel} from 'mtor-vue';
import DemoModel from '~/models/DemoModel';

const model = useInitModel(DemoModel, ({init}) => init(), true);



</script>

<style scoped lang="less" src="./style.less"></style>
