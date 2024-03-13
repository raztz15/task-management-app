


// given n objects with weights wi for all i in 1..n
// and value vi for all i in 1...n
// and MAXIMUM weight W we want the optimal choice of objects to maximize value
// write a function that takes the array v_i of values, w_i of weights
// and the maximum weight W, are returns the maximum value that is feasble
// input example : v = [1,1,1], w=[3,2,1], W = 5

// O(2^n*W)
// KS(n, W) = solution
// KS(0, W) = 0
// KS(n, 0) = 0
// KS(n, W) = if w[n] < W : return max(KS(n - 1, W), v[n] + KS(n - 1, W - w[n]))
// T(n) = T(n-1) + O(1) = O(n)

var n = 50
var W = 100
var Memory = new Array(n + 1).fill(new Array(W + 1).fill(0, 0, W + 1), 0, n + 1)

function KS(v: Array<number>, w: Array<number>, n: number, W: number): number { // O(n * W)
    if (Memory[n][W]) { // already computed value for n and W
        return Memory[n][W]
    }
    if (n === 0 || W === 0) {
        Memory[n][W] = 0
        return Memory[n][W]
    }
    else if (w[n] < W) {
        Memory[n][W] = Math.max(KS(v, w, n - 1, W), v[n] + KS(v, w, n - 1, W - w[n]))
        return Memory[n][W]
    }
    else {
        Memory[n][W] = KS(v, w, n - 1, W)
        return Memory[n][W]
    }
}


// O(n * W)
function KSDP(values: Array<number>, weights: Array<number>, W: number) {

    var n = values.length
    var dp = new Array(n + 1).fill(new Array(W + 1).fill(0, 0, W + 1), 0, n + 1)


    for (var i = 1; i <= n; i++) { // O(n)
        for (var w = 1; w <= W; w++) { // O(W)
            if (weights[i] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], values[i] + dp[i - 1][w - weights[i]])
            } else {
                dp[i][w] = dp[i - 1][w]
            }
        }
    }

    return dp[n][W]
}