<template>
    <el-container class="home-page">
      <el-header :style="{background: model.color}">Header</el-header>
      <el-main>
        <el-color-picker v-model="model.color" />
      </el-main>
      <el-footer :style="{background: model.color}">Footer</el-footer>
    </el-container>
</template>

<script setup>

import {ElHeader, ElContainer, ElMain, ElFooter, ElColorPicker} from 'element-plus';
import {useInitModel} from 'mtor-vue';
import HomeModel from '~/models/HomeModel';
const model = useInitModel(HomeModel);


</script>

<style scoped lang="less" src="./style.less"></style>
