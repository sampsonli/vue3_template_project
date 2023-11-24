import {define, Model} from "mtor-vue";
import api, {baseUrl} from './api';
@define(module)
class HomeModel extends Model {
    input = '';

    text = '';

    history = [];

    btnEnable = true;


    async ask() {
        if(!this.btnEnable || !this.input) return;
        this.btnEnable = false;
        this.text = '';
        this.history.push({content: this.input});
        const {data: questionId} = await api.doAsk({list: this.history});
        console.log(questionId);
        const evtSource = new EventSource(`${baseUrl}/ai/answer?questionId=${questionId}`);
        evtSource.onmessage = (event) => {
            const data = event.data.replaceAll('<br/>', '\n');
            this.text += data;
        };
        evtSource.onerror = () => {
            evtSource.close();
            this.btnEnable = true;
            this.input = '';
        };
    }
}
export default HomeModel;
