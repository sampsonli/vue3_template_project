<template>
  <div class="home-page">
    num={{model.num}}
    <br/>
    <div class="btn" @click="model.addNum">button</div>

  </div>

</template>

<script>
import {useInitModel} from "mtor-vue";
import HomeModel from "~/views/Home/HomeModel";

export default {
  name: "Home",
  setup() {
    const model = useInitModel(HomeModel, ({init})=> init());
    return {model};
  }
};
</script>

<style scoped lang="less" src="./style.less"></style>