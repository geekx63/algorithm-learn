#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <limits.h>

#define min(a,b) (((a) < (b)) ? (a) : (b))

void main() {
    int f[150], i, n, cost;
    scanf("%d", &n);

    f[0] = 0;

    for(i = 1; i <= n; i++) {
        cost = INT_MAX;
        if(i - 1 >= 0) cost = min(cost, f[i - 1] + 1);
        if(i - 5 >= 0) cost = min(cost, f[i - 5] + 1);
        if(i - 11 >= 0) cost = min(cost, f[i - 11] + 1);

        f[i] = cost;
        printf("f[%d]=%d\n", i, f[i]);
    }
}