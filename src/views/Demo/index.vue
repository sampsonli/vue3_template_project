<template>

  <div class="container">
    hello demo-{{model.num}}<br/>
    spend:{{model.spend || '--'}}ms
    <div class="btn" @click="model.simple_async()">测试wasm异步1s</div>
    <div class="btn" @click="model.test_wasm_performance()">测试wasm性能</div>
    <div class="btn" @click="model.test_local_performance()">测试local性能</div>
  </div>


</template>

<script setup>

import {useInitModel} from 'mtor-vue';
import DemoModel from '~/models/DemoModel';

const model = useInitModel(DemoModel, ({init}) => init(), true);



</script>

<style scoped lang="less" src="./style.less"></style>
