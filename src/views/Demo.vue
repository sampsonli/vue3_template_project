<template>
  <div class="demo-page">
    demo page13333-{{ model.num }}
    <div
      class="btn"
      @click="model.addNum"
    >
      add
    </div>
  </div>
</template>

<script setup>
import {useModel} from "mtor-vue";
import DemoModel from "~/models/DemoModel";
import "vue";
const model = useModel(DemoModel);
</script>

<style lang="less" scoped>
.demo-page {
  //background: red;
  .btn {
    width: 2rem;
    line-height: .5rem;
    background: indianred;
    color: white;
    text-align: center;
    border-radius: .2rem;
    font-size: .3rem;
    cursor: pointer;
    user-select: none;
  }

}

</style>