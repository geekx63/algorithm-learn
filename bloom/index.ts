import * as mmh3 from 'murmurhash3js';
import BIT from './bit';
import BitArray from './bitArray';

/* 200M memory for BloomFilter */
const BIT_SIZE = 200 * 1024 * 1024 * 8;

class BloomFilter {
    bitArray: BitArray;

    constructor() {
        this.bitArray = new BitArray(BIT_SIZE);
        console.log(this.bitArray.getLength())
    }

    add(email: string) {
        let points = this.getPostions(email);

        for(let point of points) {
            this.bitArray.setAt(point, BIT.ON)
        }
    }

    contains(email: string) {
        let points = this.getPostions(email);

        let result = true;
        for(let point of points){
            result = result && Boolean(this.bitArray.getAt(point));
        }

        return result;
    }

    getPostions(email: string) {
        let point1 = mmh3.x86.hash32(email, 1) % BIT_SIZE;
        let point2 = mmh3.x86.hash32(email, 2) % BIT_SIZE;
        let point3 = mmh3.x86.hash32(email, 3) % BIT_SIZE;
        let point4 = mmh3.x86.hash32(email, 4) % BIT_SIZE;
        let point5 = mmh3.x86.hash32(email, 5) % BIT_SIZE;
        let point6 = mmh3.x86.hash32(email, 6) % BIT_SIZE;
        let point7 = mmh3.x86.hash32(email, 7) % BIT_SIZE;
        let point8 = mmh3.x86.hash32(email, 8) % BIT_SIZE;

        return [point1, point2, point3, point4, point5, point6, point7, point8];
    }
}

let bloomFilter = new BloomFilter();

bloomFilter.add('越越');
bloomFilter.contains('越越')
