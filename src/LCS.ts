// AABSG
// ASBD
// ASD, ASB
// write a function that takes 2 strings S1, S2
// returns the length of the longest common subsequence

// LCS(n, m) = solution
// LCS(i, j)
// LCS(i, 0) = 0
// LCS(0, i) = 0
// LCS(i, j) : if S1[i] == S2[j] 1 + LCS(i - 1, j - 1)
//             else: max(LCS(i-1, j), LCS(i, j-1))         


// O(2^n)
function LCS(s1: string, s2: string, i: number, j: number): number {
    if (i === 0 || j === 0) return 0
    else if (s1[i] === s2[j]) return 1 + LCS(s1, s2, i - 1, j - 1)
    else return Math.max(LCS(s1, s2, i - 1, j), LCS(s1, s2, i, j - 1))
}

const A = "AABSG"

const B = "ASBD"

console.log(LCS(A, B, A.length - 1, B.length - 1))