import {generator} from '~/common/ajax';
// export const baseUrl = 'http://192.168.2.10' + ':8848';
export const baseUrl = 'http://192.168.2.11:8082';
const Apis = {
    doAsk: {
        url: `${baseUrl}/ai/ask`,
        method: 'post',
    },
    getMainData: {
        method: 'get',
        url: `${baseUrl}/api/v1/emotor/query`,
        mockUrl: 'http://192.168.20.12:8082/api/v1/emotor/query',
        isMock: false,
    },
};
export default generator(Apis);
