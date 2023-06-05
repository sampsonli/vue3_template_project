<template>
  <div class="home-page">
    num6={{model.num}}
    <br/>
    <div class="btn" @click="model.addNum">button</div>

  </div>

</template>

<script>
import {useModel} from "mtor-vue";
import HomeModel from "~/views/Home/HomeModel";

export default {
  name: "Home",
  setup() {
    const model = useModel(HomeModel);
    return {model};
  }
};
</script>

<style scoped lang="less" src="./style.less"></style>