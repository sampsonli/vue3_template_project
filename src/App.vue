<template>
  <el-config-provider :locale="zhCn">
    <RouterView/>
  </el-config-provider>

</template>

<script setup lang="ts">

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import {ElConfigProvider} from 'element-plus';
</script>

<style lang="less">

* {
  box-sizing: border-box;
}
</style>
