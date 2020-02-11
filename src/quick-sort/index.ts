export default class QuickSort {
    arr: number[];
    count: number = 0;

    constructor(arr: number[]) {
        this.arr = arr;      
    }

    sort(left: number = 0, right: number = this.arr.length - 1) {
        if (left >= right) return;

        this.count++;

        let i = left, j = right;
        let tmp = this.arr[i];

        while (i < j) {
            while (j > i && this.arr[j] >= tmp) {
                j--;
            }
            this.arr[i] = this.arr[j];

            while (i < j && this.arr[i] <= tmp) {
                i++;
            }
            this.arr[j] = this.arr[i];
        }

        this.arr[i] = tmp;

        this.sort(left, i - 1);
        this.sort(i + 1, right);

        return this.arr;
    }
}

let arrQuickSort = new QuickSort([2,5,1,34,7,42,7,13,4,2,37]);
console.log(arrQuickSort.sort())
console.log(arrQuickSort.count)