<template>
    <el-container class="home-page">
      <el-main>
        <el-tabs v-model="model.tabIndex" @tab-click="model.changeTab($event.props.name)">
          <el-tab-pane label="流量" :name="0" :lazy="true">
            <div class="chart">
              <Echart :options="model.option"/>
            </div>
          </el-tab-pane>
          <el-tab-pane label="温度" :name="1" :lazy="true">
            <div class="chart">
              <Echart :options="model.option"/>
            </div>
          </el-tab-pane>
          <el-tab-pane label="压力" :name="2" :lazy="true">Role</el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
</template>

<script setup>

import {ElContainer, ElMain, ElTabs, ElTabPane} from 'element-plus';
import {useInitModel} from 'mtor-vue';
import HomeModel from '~/models/HomeModel';
import Echart from '~/components/Echart';
import {ref} from "vue";
const model = useInitModel(HomeModel, ({init}) => init());

const activeName = ref('first');



</script>

<style scoped lang="less" src="./style.less"></style>
