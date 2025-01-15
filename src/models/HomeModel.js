import {define, Model} from 'mtor-vue';

@define(module)
class HomeModel extends Model {

    async init() {
        this.onBeforeReset(() => {
            console.log('hello destroy');
        });
    }

}
export default HomeModel;
