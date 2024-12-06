import {define, Model} from 'mtor-vue';
import {window} from '@tauri-apps/api';
import { ask } from '@tauri-apps/plugin-dialog';
import {processData} from '~/models/util';
import api from '~/models/api';
import dayjs from "dayjs";
@define(module)
class HomeModel extends Model {
    tabs = ['first', 'second', 'third'];
    color = 'red';
    count = 0;
    answer = '';
    option;

    tabIndex = 0;
    changeTab(tab) {
        console.log(tab);
    }
    async add() {
        this.count+=1;
    }
    async ask () {
        const answer = await ask('This action cannot be reverted. Are you sure?', {
            title: '李春',
            kind: 'warning',
        });
        this.answer = answer;
    }
    async fullscreen() {
        const win = window.getCurrentWindow();
        const isFull = await win.isFullscreen();
        await win.setFullscreen(!isFull);
    }

    async init() {
        await this.doGetData();
    }

    async doGetData() {
        const date = dayjs().format('YYYY-MM-DD');
        const starttime = date + ' ' + '00:00';
        const endtime = date + ' '  + '23:59';
        this.option = null;

        try {
            const { data } = await api.getMainData({ tableid: 1, fieldid: 2, page: 1, pagesize: 10000000, starttime, endtime });
            const { times, values, result } = processData(data.items, data.start_time, 5);
            this.genChartOption(times, values, result);
        } catch(e) {
            console.error(e.message);
        }

    }

    genChartOption(times, values, result) {
        let unit = ({扭矩: '牛米', 电流: '安培', 直流母线电压: '伏', 输出电压: '伏', 电机速度: 'rpm', 温度: '%'})['电流'] || '';


        this.option = {
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    return (
                        params.name +
                        '<br/>' + '电流' + ':' +
                        params.value[1] + unit
                    );
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 10
                },
                {
                    start: 0,
                    end: 10
                }
            ],
            series: [
                {
                    name: '电流',
                    type: 'line',
                    showSymbol: false,
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    data: result
                }
            ]
        };
    }
}
export default HomeModel;
