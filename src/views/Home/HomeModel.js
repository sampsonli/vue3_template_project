import {define, Model} from "mtor-vue";
@define(module)
class HomeModel extends Model {
    input = '';

    text = '';

    btnEnable = true;


    async ask() {
        if(!this.btnEnable) return;
        this.btnEnable = false;
        this.text = '';
        const evtSource = new EventSource("http://47.116.42.80:8081/ai/info?ask=" + this.input);
        evtSource.onmessage = (event) => {
            console.log(event.data);
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
