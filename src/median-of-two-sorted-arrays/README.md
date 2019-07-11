## 在原数组里面查找

    内存：92.19%
    耗时：47.14%
    内存少，速度偏慢，代码逻辑晦涩，不易读懂

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
"use strict";
var findKth = function(nums1, nums1Offset, nums2, nums2Offset, k) {
    if (nums1.length - nums1Offset === 0) {
        return nums2[nums2Offset + k - 1];
    }
    if (nums2.length - nums2Offset === 0) {
        return nums1[nums1Offset + k - 1];
    }
    if (k === 1) {
        return Math.min(nums1[nums1Offset], nums2[nums2Offset]);
    }
    
    let nums1Ith = Math.min(nums1.length - nums1Offset, Math.floor(k / 2));
    let nums2Ith = Math.min(nums2.length - nums2Offset, Math.floor(k / 2));
    if (nums1[nums1Offset + nums1Ith - 1] < nums2[nums2Offset + nums2Ith - 1]) {
        return findKth(nums1, nums1Offset + nums1Ith, nums2, nums2Offset, k - nums1Ith);
    }
    else {
        return findKth(nums1, nums1Offset, nums2, nums2Offset + nums2Ith, k - nums2Ith);
    }
}

var findMedianSortedArrays = function(nums1, nums2) {
    let m = nums1.length;
    let n = nums2.length;
    let left = Math.floor((m + n + 1) / 2);
    let right = Math.floor((m + n + 2) / 2);
    return (findKth(nums1, 0, nums2, 0, left) + findKth(nums1, 0, nums2, 0, right)) / 2;
};

```
[详情链接](https://leetcode.com/submissions/detail/242131135/)

## 用slice创建新数组查找

    内存：41.05%
    耗时：96.32%
    速度快，内存高，代码简单易读。

``` javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
"use strict";
var findKth = function(nums1, nums2, k) {
    if (nums1.length === 0) {
        return nums2[k - 1];
    }
    if (nums2.length === 0) {
        return nums1[k - 1];
    }
    if (k === 1) {
        return Math.min(nums1[0], nums2[0]);
    }
    
    let nums1Ith = Math.min(nums1.length, Math.floor(k / 2));
    let nums2Ith = Math.min(nums2.length, Math.floor(k / 2));
    if (nums1[nums1Ith - 1] < nums2[nums2Ith - 1]) {
        return findKth(nums1.slice(nums1Ith), nums2, k - nums1Ith);
    }
    else {
        return findKth(nums1, nums2.slice(nums2Ith), k - nums2Ith);
    }
}

var findMedianSortedArrays = function(nums1, nums2) {
    let m = nums1.length;
    let n = nums2.length;
    let left = Math.floor((m + n + 1) / 2);
    let right = Math.floor((m + n + 2) / 2);
    return (findKth(nums1, nums2, left) + findKth(nums1, nums2, right)) / 2;
};
```
[详情链接](https://leetcode.com/submissions/detail/241977896/)

## 用buffer创建数组查找

    内存：19.13%
    耗时：88.68%
    效率和内存都低，应该是内存数组在真正访问操作的时候，需要映射到js Object中，生成dataView。

``` javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
"use strict";
var findKth = function(nums1, nums2, k) {
    if (nums1.length === 0) {
        return nums2[k - 1];
    }
    if (nums2.length === 0) {
        return nums1[k - 1];
    }
    if (k === 1) {
        return Math.min(nums1[0], nums2[0]);
    }
    
    let nums1Ith = Math.min(nums1.length, Math.floor(k / 2));
    let nums2Ith = Math.min(nums2.length, Math.floor(k / 2));
    if (nums1[nums1Ith - 1] < nums2[nums2Ith - 1]) {
        // return findKth(nums1.slice(nums1Ith), nums2, k - nums1Ith);
        return findKth(new Float64Array(nums1.buffer, nums1Ith * 8 + nums1.byteOffset), nums2, k - nums1Ith); 
    }
    else {
        // return findKth(nums1, nums2.slice(nums2Ith), k - nums2Ith);
        return findKth(nums1, new Float64Array(nums2.buffer, nums2Ith * 8 + nums2.byteOffset), k - nums2Ith);
    }
}

var findMedianSortedArrays = function(nums1, nums2) {
    let nums1Buffer = new Float64Array(nums1);
    let nums2Buffer = new Float64Array(nums2);
    
    let m = nums1Buffer.length;
    let n = nums2Buffer.length;
    let left = Math.floor((m + n + 1) / 2);
    let right = Math.floor((m + n + 2) / 2);
    return (findKth(nums1Buffer, nums2Buffer, left) + findKth(nums1Buffer, nums2Buffer, right)) / 2;
};
```
[详情链接](https://leetcode.com/submissions/detail/242125398/)

## 官方分界线找发

    内存：93.24%
    耗时：89.55%
    分析很透彻，综合效率也最高，计算复杂度最低，唯一缺点，代码不太好懂。

``` javascript
let findMedianSortedArrays = function (nums1, nums2) {
    let m = nums1.length, n = nums2.length;
    if (m > n) {
        return findMedianSortedArrays(nums2, nums1);
    }
    let iMin = 0;
    let iMax = m;
    let halfLen = Math.floor((m + n + 1) / 2);
    while (iMin <= iMax) {
        let i = Math.floor((iMax + iMin) / 2);
        let j = halfLen - i;
        if (i < m && nums2[j - 1] > nums1[i]) {
            iMin = iMin + 1;
        }
        else if (i > 0 && nums1[i - 1] > nums2[j]) {
            iMax = iMax - 1;
        }
        else {
            let maxOfLeft;
            if (i === 0) {
                maxOfLeft = nums2[j - 1];
            }
            else if (j === 0) {
                maxOfLeft = nums1[i - 1];
            }
            else {
                maxOfLeft = Math.max(nums1[i - 1], nums2[j - 1]);
            }
            if ((m + n) % 2 === 1) {
                return maxOfLeft;
            }
            let minOfRight;
            if (i === m) {
                minOfRight = nums2[j];
            }
            else if (j === n) {
                minOfRight = nums1[i];
            }
            else {
                minOfRight = Math.min(nums1[i], nums2[j]);
            }
            return (maxOfLeft + minOfRight) / 2.0;
        }
    }
};

```
[详情链接](https://leetcode.com/submissions/detail/242521623/)