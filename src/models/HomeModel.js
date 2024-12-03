import {define, Model} from 'mtor-vue';
import {window} from '@tauri-apps/api';
@define(module)
class HomeModel extends Model {
    count = 0;
    add() {
        this.count+=1;
    }
    async fullscreen() {
        const win = window.getCurrentWindow();
        const isFull = await win.isFullscreen();
        await win.setFullscreen(!isFull);
    }
}
export default HomeModel;
