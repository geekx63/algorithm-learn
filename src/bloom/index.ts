import * as mmh3 from 'murmurhash3js';
import {BIT, BitArray} from 'bit-array-buffer';

export default class BloomFilter {
    private bitArray: BitArray;
    private bitLength: number;

    constructor(bitLength: number) {
        this.bitLength = bitLength;
        this.bitArray = new BitArray(bitLength);
    }

    add(email: string) {
        let points = this.getPostions(email);

        for(let point of points) {
            this.bitArray.set(point, BIT.ON)
        }
    }

    contains(email: string) {
        let points = this.getPostions(email);

        let result = true;
        for(let point of points){
            result = result && Boolean(this.bitArray.get(point));
        }

        return result;
    }

    private getPostions(email: string) {
        let point1 = mmh3.x86.hash32(email, 1) % this.bitLength;
        let point2 = mmh3.x86.hash32(email, 2) % this.bitLength;
        let point3 = mmh3.x86.hash32(email, 3) % this.bitLength;
        let point4 = mmh3.x86.hash32(email, 4) % this.bitLength;
        let point5 = mmh3.x86.hash32(email, 5) % this.bitLength;
        let point6 = mmh3.x86.hash32(email, 6) % this.bitLength;
        let point7 = mmh3.x86.hash32(email, 7) % this.bitLength;
        let point8 = mmh3.x86.hash32(email, 8) % this.bitLength;

        return [point1, point2, point3, point4, point5, point6, point7, point8];
    }
}
