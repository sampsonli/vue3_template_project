const bigMap = new Map();
const allPoints = new Map();
const precision = 10;
/**
 * 
 * @param {DataView} dataView 
 */
const process1 = (dataView) => {
    const size = Math.floor(dataView.byteLength / 12);
    const offset = 0;
    let x, y, z;
    let ix, iy, iz, ix2, iy2, iz2;
    let key, tmp, base, key2;
    for (let r = 0; r < size; r++) {
        base = offset + r * 12;
        x = dataView.getFloat32(base, true);
        y = dataView.getFloat32(base + 4, true);
        z = dataView.getFloat32(base + 8, true);
        ix = Math.round(x * precision);
        iy = Math.round(y * precision);
        iz = Math.round(z * precision);
        x = ix / precision;
        y = iy / precision;
        z = iz / precision;

        ix2 = Math.abs(ix) | ix & 0x8000; // 设置符号位， 如果是负数， 16位二进制第16位设为1; 0x8000 = 0b10000000, 00000000;
        iy2 = Math.abs(iy) | iy & 0x8000; // 如果ix, iy 是负数， 必然第16位是1；
        iz2 = Math.abs(iz) | iz & 0x8000; // 如果ix, iy 是负数， 必然第16位是1；

        ix2 = (ix2 & 0xfff0) << 20;
        iy2 = (iy2 & 0xfff0) << 8;
        iz2 = (iz2 & 0xfff0) >> 4;

        key = ix2 | iy2 | iz2;

        let arr = bigMap.get(key);
        if(arr) {
            arr.push({x, y, z});
        } else{
            arr = [{x, y, z}];
            bigMap.set(key, arr);
        }

    }

};