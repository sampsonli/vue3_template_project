import {define, Model} from "mtor-vue";
@define(module)
class HomeModel extends Model {
    num = 1;
    addNum() {
        this.num+=2;
    }
}
export default HomeModel;
