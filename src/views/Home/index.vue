<template>
    <div>
      <div class="btn" @click="jump">jump demo</div>
    </div>
</template>

<script setup>

import {useInitModel} from 'mtor-vue';
import HomeModel from '~/models/HomeModel';
import {useRouter} from 'vue-router';
const model = useInitModel(HomeModel, ({init}) => init());
const router = useRouter();
function jump() {
  router.push('/demo');
}

</script>

<style scoped lang="less" src="./style.less"></style>
