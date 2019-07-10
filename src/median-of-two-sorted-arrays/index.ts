export default class Solution {
    private num1: number[];
    private num2: number[];

    constructor(num1: number[], num2: number[]) {
        this.num1 = num1;
        this.num2 = num2;
    }

    findMedianSortedArrays() {
        let m = this.num1.length;
        let n = this.num2.length;

        let left = Math.floor((m + n + 1) / 2);
        let right = Math.floor((m + n + 2) / 2);
        return (this.findKth(this.num1, this.num2, left) + this.findKth(this.num1, this.num2, right)) / 2;
    }

    private findKth(num1: number[], num2: number[], k:number): number {
        if (num1.length === 0) {
            return num2[k - 1]
        } else if (num2.length === 0) {
            return num1[k - 1]
        } else if (k === 1) {
            return Math.min(num1[0], num2[0]);
        } 
        let num1Ith = Math.min(num1.length, Math.floor(k / 2));
        let num2Ith = Math.min(num2.length, Math.floor(k / 2));
        if (num1[num1Ith - 1] < num2[num2Ith - 1]) {
            return this.findKth(num1.slice(num1Ith), num2, k - num1Ith); 
        } else {
            return this.findKth(num1, num2.slice(num2Ith), k - num2Ith);
        }
    }
}
