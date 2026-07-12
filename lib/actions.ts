'use server'

const total_simulate_run = 1000000

/**
 * Calculates the number of ways to partition N distinct items into unlabelled groups.
 * @param {number[]} partition - Array of group sizes, e.g., [2, 2, 1, 1, 1]
 * @returns {string} - The total combinations as a string (handles arbitrarily large numbers safely)
 */
function calculatePartitionWays(partition) {
  // Helper function to calculate factorial using BigInt
  function factorial(num) {
    let res = 1
    for (let i = 2; i <= BigInt(num); i++) {
      res *= i
    }
    return res
  }

  // 1. Calculate N (total number of balls)
  const N = partition.reduce((sum, val) => sum + val, 0)

  // 2. Start with N! in the numerator
  const numerator = factorial(N)
  let denominator = 1

  // 3. Track the frequencies of each group size
  const sizeCounts = {}

  for (const size of partition) {
    // Multiply denominator by individual size factorials (S_i!)
    denominator *= factorial(size)

    // Count frequencies
    sizeCounts[size] = (sizeCounts[size] || 0) + 1
  }

  // 4. Multiply denominator by frequency factorials (F_j!)
  for (const size in sizeCounts) {
    const frequency = sizeCounts[size]
    denominator *= factorial(frequency)
  }

  // 5. Divide to get the total unique combinations
  return (numerator / denominator).toString()
}

/**
 *
 */
function generatePartitions(n) {
  const result: number[][] = []

  function backtrack(remaining, maxAllowed, currentPartition) {
    // Base case: if remaining is 0, a complete partition is found
    if (remaining === 0) {
      result.push([...currentPartition])
      return
    }

    // Explore choices from the maximum allowed value down to 1
    const limit = Math.min(remaining, maxAllowed)
    for (let i = limit; i >= 1; i--) {
      currentPartition.push(i)
      // Recursively partition the remaining value
      backtrack(remaining - i, i, currentPartition)
      // Remove the last added number to backtrack
      currentPartition.pop()
    }
  }

  backtrack(n, n, [])
  return result
}
/**
 *
 */
const findDuplicates = (arr) => {
  const seen = new Set()
  const duplicates = new Set()

  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item)
    } else {
      seen.add(item)
    }
  }

  return [...duplicates]
}
/**
 * Theoritically calculate possibilities using Integer Partitions
 */
function integerPartition(target_number) {
  const R = []
  const P = generatePartitions(target_number)
  for (let i = 0; i < P.length; i++) {
    const C = P[i]
    const o = 365
    for (let j = 0; j < C.length; j++) {
      const n = C[j]
    }
  }
}
/**
 *
 */
const arrEqual = (a, b) => a.length === b.length && a.every((val, index) => val === b[index])

/**
 * Random Simulation
 * output is an array of objects {dup: Array, cnt: Number}
 * The Array of key 'dup' contains duplicated occurrances, like [3, 2] means
 * there are two groups of duplication; the first group is having 3 duplicated birthday and
 * the second group is having 2 duplicated birthday.
 * array [1] means there are no duplications of birthday
 */
function birthdaySimulate(target_number) {
  type Obj = { dup: number[]; cnt: number }
  const D: Obj[] = []
  const noDup = [1]
  D.push({ dup: noDup, cnt: 0 })

  for (let i = 0; i < total_simulate_run; i++) {
    const R: number[] = []
    /**
     * generate random birthday
     */
    for (let j = 0; j < target_number; j++) {
      const randomNumber = Math.floor(Math.random() * 365) + 1
      R.push(randomNumber)
    }
    /**
     * find duplicated birthdays
     * and pick up occurrances
     */
    const Dup = findDuplicates(R)
    const Partition: number[] = []
    let T = noDup
    if (Dup.length > 0) {
      for (const d of Dup) {
        let cnt = 0
        for (const r of R) {
          if (r == d) {
            cnt += 1
          }
        }
        Partition.push(cnt)
      }
      Partition.sort((a, b) => b - a)
      T = Partition
    }
    let hit = false
    for (const d of D) {
      if (arrEqual(d.dup, T) == true) {
        d.cnt += 1
        hit = true
        break
      }
    }
    if (hit == false) D.push({ dup: T, cnt: 1 })
  }

  D.sort((a, b) => b.cnt - a.cnt)
  return D
}

/**
 *
 */
export default async function simulate(target_number) {
  if (target_number <= 0) {
    const E = { nodup: 0, array: [] }
    return E
  }
  const Bday = birthdaySimulate(target_number)
  type Obj = { dup: number[]; cnt: number; odds: string }
  const D: Obj[] = []
  const total = Bday.length < 10 ? Bday.length : 10
  for (let i = 0; i < total; i++) {
    const B = Bday[i]
    const d = {
      dup: B.dup,
      cnt: B.cnt,
      odds: ((B.cnt * 100) / total_simulate_run).toFixed(2) + '%',
    }
    D.push(d)
  }
  console.log(D)
  const R = { nodup: 0, array: D }
  for (const b of Bday) {
    if (arrEqual(b.dup, [1]) == true) {
      R.nodup = (b.cnt * 100) / total_simulate_run
    }
  }
  return R
}
