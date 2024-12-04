import dayjs from "dayjs";


/**
 *
 * @param {[{timestamp: number, value: number, created_at: string}]} list
 */
export const processData = (list, baseTime = '2024-05-31 17:24:53.016', freq = 5) => {




    let base = new Date(baseTime.split('.')[0]).getTime() + (baseTime.split('.')[1] - 0);
    let result = [{time: dayjs(base).format('YYYY-MM-DD HH:mm:ss'), value: base.value}];
    let times = [result.time];
    let values = [base.value];
    for(let i = 1; i < list.length; i++) {
        const before = list[i - 1];
        const current = list[i];
        // const between = current.t - before.t;
        // const size = between / (1000/freq) - 1;
        // if(size) {
        //   let baseT = base + before.t;
        //   for(let j = 0; j < size; j++) {
        //     const time = dayjs(baseT + 1000 / freq).format('YYYY-MM-DD HH:mm:ss');
        //     result.push({name: time, value: [time,before.v]});
        //     times.push(time);
        //     values.push(before.v);
        //   }
        // }
        const time = dayjs(base + current.t).format('YYYY-MM-DD HH:mm:ss');
        result.push({name: time, value: [time,current.v]});
        times.push(time);
        values.push(current.v);
    }
    return {result, times, values};

};