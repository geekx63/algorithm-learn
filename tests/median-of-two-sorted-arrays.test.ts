import MedianSortedArrays from '../src/median-of-two-sorted-arrays/index';
import MedianSortedArraysWithBuffer from '../src/median-of-two-sorted-arrays/index-array-buffer';

let num1 = [1, 2];
let num2 = [3, 4];

describe('test MedianSortedArrays:', () => {
    test('run 1000000 count', () => {
        let t = new MedianSortedArrays(num1, num2);
        for(let i = 0; i < 2; i++) {
            t.findMedianSortedArrays()
        }
        let result = t.findMedianSortedArrays();
        expect(result).toBe(2.5);
    });
})

describe('test MedianSortedArraysWithBuffer:', () => {
    test('run 1000000 count', () => {
        let t = new MedianSortedArraysWithBuffer(num1, num2);
        for(let i = 0; i < 2; i++) {
            t.findMedianSortedArrays()
        }
        let result = t.findMedianSortedArrays();
        expect(result).toBe(2.5);
    });
})