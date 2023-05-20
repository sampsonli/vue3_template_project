import {define, Model} from "mtor-vue";
@define(module)
class DemoModel extends Model {
    num = 1;
    addNum() {
        this.num += 1;
    }
}
export default DemoModel;