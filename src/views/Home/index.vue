<template>
    <el-container class="home-page">
      <el-header @click="model.fullscreen()" :style="{background: model.color}">Header</el-header>
      <el-main>
        <Echart :options="model.option"/>
      </el-main>
      <el-footer :style="{background: model.color}" @click="model.ask()">Footer</el-footer>
    </el-container>
</template>

<script setup>

import {ElHeader, ElContainer, ElMain, ElFooter, ElColorPicker, ElButton} from 'element-plus';
import {useInitModel} from 'mtor-vue';
import HomeModel from '~/models/HomeModel';
import Echart from '~/components/Echart';
const model = useInitModel(HomeModel, ({init}) => init());


</script>

<style scoped lang="less" src="./style.less"></style>
