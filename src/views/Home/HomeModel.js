import {define, Model} from "mtor-vue";
import api, {baseUrl} from './api';
@define(module)
class HomeModel extends Model {
    input = '';

    text = '';

    btnEnable = true;


    async ask() {
        if(!this.btnEnable) return;
        this.btnEnable = false;
        this.text = '';
        const {data: questionId} = await api.doAsk({list: [{content: this.input}]});
        console.log(questionId);
        const evtSource = new EventSource(`${baseUrl}/ai/answer?questionId=${questionId}`);
        evtSource.onmessage = (event) => {
            const data = event.data.replaceAll('<br/>', '\n');
            this.text += data;
        };
        evtSource.onerror = () => {
            evtSource.close();
            this.btnEnable = true;
        };
    }
}
export default HomeModel;
