import {define, Model} from "mtor-vue";
@define(module)
class HomeModel extends Model {
    num = 1;

    n = 1;

    addNum() {
        this.num+=this.n;
        if(this.num % 10 === 0) {
            this.n++;
        }
    }
}
export default HomeModel;
