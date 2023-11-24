import {generator} from '../../common/ajax';
// export const baseUrl = 'http://localhost:8081';
export const baseUrl = 'http://47.116.42.80:8081';
const Apis = {
    doAsk: {
        url: `${baseUrl}/ai/ask`,
        method: 'post',
    },
};
export default generator(Apis);
