import {define, Model} from 'mtor-vue';
import {window} from '@tauri-apps/api';
import { ask } from '@tauri-apps/plugin-dialog';
@define(module)
class HomeModel extends Model {
    color = '';
    count = 0;
    async add() {
        this.count+=1;
        const answer = await ask('This action cannot be reverted. Are you sure?', {
            title: '李春',
            kind: 'warning',
        });

        console.log(answer);
    }
    async fullscreen() {
        const win = window.getCurrentWindow();
        const isFull = await win.isFullscreen();
        await win.setFullscreen(!isFull);
    }
}
export default HomeModel;
