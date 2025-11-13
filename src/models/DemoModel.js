import {define, Model} from 'mtor-vue';
import * as Comlink from 'comlink';
import {wait} from '~/common/utils';

@define(module)
class DemoModel extends Model {
    loaded = false;
    /**
     * @type {Comlink.Remote<{
     *          simple_async: (number)=>Promise<string>,
     *          test_performance: (number)=>Promise<{value, spend}>,
     *          test_local_performance: (number)=>Promise<{value, spend}>,
     *     }>}
     */
    static work_proxy;


    test_value = 100000000;

    num = 10;

    spend = 0;

    async simple_async() {
        this.num++;
        let ret = await DemoModel.work_proxy.simple_async(1000);
        this.num++;
        console.log(`simple_async:${ret}`);
    }

    async test_wasm_performance() {
        this.spend = 0;
        let ret = await DemoModel.work_proxy.test_performance(this.test_value);
        this.spend = ret.spend;
        console.log(`test_wasm_performance:${ret.value}`);
    }

    async test_local_performance() {
        this.spend = 0;
        let ret = await DemoModel.work_proxy.test_local_performance(this.test_value);
        this.spend = ret.spend;
        console.log(`test_local_performance:${ret.value}`);
    }

    init() {
        if (this.loaded) {
            return;
        }
        const work = new Worker(new URL('./mywork.js', import.meta.url));
        DemoModel.work_proxy = Comlink.wrap(work);
        this.onBeforeReset(() => {
            work.terminate();
            DemoModel.work_proxy.releaseProxy();


        });
        this.loaded = true;
    }


}

export default DemoModel;
