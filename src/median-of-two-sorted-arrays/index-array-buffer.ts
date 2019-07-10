export default class SolutionWithArrayBuffer {
    private num1: Float64Array;
    private num2: Float64Array;

    constructor(num1: number[], num2: number[]) {
        this.num1 = new Float64Array(num1);
        this.num2 = new Float64Array(num2);
    }

    findMedianSortedArrays() {
        let m = this.num1.length;
        let n = this.num2.length;

        let left = Math.floor((m + n + 1) / 2);
        let right = Math.floor((m + n + 2) / 2);

        return (this.findKth(this.num1, this.num2, left) + this.findKth(this.num1, this.num2, right)) / 2;
    }

    private findKth(num1: Float64Array, num2: Float64Array, k:number): number {
        if (num1.length === 0) {
            return num2[k - 1]
        } else if (num2.length === 0) {
            return num1[k - 1]
        } else if (k === 1) {
            let n1 = Number(num1[0]), n2 = Number(num2[0]);
            return Math.min(n1, n2);
        } 
        let num1Ith = Math.min(num1.length, Math.floor(k / 2));
        let num2Ith = Math.min(num2.length, Math.floor(k / 2));
        if (num1[num1Ith - 1] < num2[num2Ith - 1]) {
            return this.findKth(new Float64Array(num1.buffer, num1Ith * 8 + num1.byteOffset), num2, k - num1Ith); 
        } else {
            return this.findKth(num1, new Float64Array(num2.buffer, num2Ith * 8 + num2.byteOffset), k - num2Ith);
        }
    }

}


let t = new SolutionWithArrayBuffer([1, 3], [2]);
t.findMedianSortedArrays()