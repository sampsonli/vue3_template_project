import {define, Model} from 'mtor-vue';
@define(module)
class HomeModel extends Model {
    count = 0;


    add() {
        this.count++;
    }
}
export default HomeModel;
