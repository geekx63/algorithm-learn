
let findMedianSortedArrays = function(nums1: number[], nums2: number[]):number {
    let m = nums1.length, n = nums2.length;
    
    if(m > n){
        findMedianSortedArrays(nums2, nums1);
    }

    let iMin = 0;
    let iMax = m;
    let half_len = Math.floor((m + n + 1) / 2);

    while (iMin <= iMax) {
        let i = Math.floor((iMax + iMin) / 2);
        let j = half_len - i;
        if(i < m && nums2[j - 1] > nums1[i]) {
            iMin = iMin + 1;
        } else if(i > 0 && nums1[i -1] > nums2[j]) {
            iMax = iMax - 1;
        } else {

            let max_of_left;
            if (i === 0) {
                max_of_left = nums2[j-1];
            } else if(j === 0) {
                max_of_left = nums1[i-1];
            } else {
                max_of_left = Math.max(nums1[i-1], nums2[j-1]);
            }

            if((m + n) % 2 === 1) {
                return max_of_left;
            }

            let min_of_right;
            if(i === m) {
                min_of_right = nums2[j];
            } else if(j === n){
                min_of_right = nums1[i];
            } else {
                min_of_right = Math.min(nums1[i], nums2[j]);
            }

            return (max_of_left + min_of_right) / 2.0
        }
    }
}