import {define, Model} from "mtor-vue";

@define(module)
class HomeModel extends Model {
    num = 1;
    async init() {
        this.num = 277;
    }
    addNum() {
        this.num+=20;
    }


}
export default HomeModel;
