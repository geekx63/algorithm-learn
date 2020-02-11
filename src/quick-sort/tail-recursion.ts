function tailRecursionQuickSort(left: number, right: number, arr: number[], argArr: [number, number, number[], any[]][] = []): void {
    if (left >= right) return;

    let i = left, j = right;
    let tmp = arr[i];

    while (i < j) {
        while (j > i && arr[j] >= tmp) {
            j--;
        }
        arr[i] = arr[j];

        while (i < j && arr[i] <= tmp) {
            i++;
        }
        arr[j] = arr[i];
    }

    arr[i] = tmp;

    if (i < right) {
        argArr.push([i + 1, right, arr, argArr]);
    } 
    if (i > left) {
        argArr.push([left, i - 1, arr, argArr]);
    }
}
function quickSort(arr: number[]) {
    let argArr: [number, number, number[], any[]][] = [];
    tailRecursionQuickSort(0, arr.length - 1, arr, argArr);

    while(argArr.length > 0) {
        tailRecursionQuickSort(...argArr.pop())
    }
};
let arr = [2,5,1,34,7,42,7,13,4,2,37];
quickSort(arr)
console.log(arr);