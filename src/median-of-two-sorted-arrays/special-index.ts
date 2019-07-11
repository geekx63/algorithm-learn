let findMedianSortedArrays = function (nums1: number[], nums2: number[]): number {
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