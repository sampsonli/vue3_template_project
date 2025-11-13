import {simple_async} from '~/wasm/pkg/wasm_demo';

import * as ComLink from 'comlink';
import {test_performance} from '~/wasm/pkg';


// 定义 worker 中要暴露的 API
const workerAPI = {
    simple_async: async (num = 30) => {
        const ret = await simple_async(num);

        return ret;
    },
    test_performance: async (num = 30) => {
        const now = Date.now();
        const ret = test_performance(num);


        return {value: ret, spend: Date.now() - now};
    },

    test_local_performance: async (num = 30) => {
        const now = Date.now();
        let sum = 0;
        for (let i = 1; i < num + 1; i++) {
            if (i % 2 === 0) {
                sum += 1;
            }
            sum += 1;
        }

        return {value: sum, spend: Date.now() - now};
    }
};
// 暴露 API 给主线程
ComLink.expose(workerAPI);

