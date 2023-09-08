interface Solution {
  a: number;
  b: number;
  c: number;
  operand: string;
}

export function findBestSolution(nums: number[], target: number): Solution[] {
  const solutions: Solution[][] = [];

  const add = (nums: number[], chain: Solution[]) => {
    for (let positionA = 0; positionA < nums.length - 1; positionA++) {
      for (
        let positionB = positionA + 1;
        positionB < nums.length;
        positionB++
      ) {
        const numA = nums[positionA];
        const numB = nums[positionB];
        const numC = numA + numB;

        const newChain = [
          ...chain,
          { a: numA, b: numB, operand: '+', c: numC },
        ];

        if (numC === target) {
          solutions.push(newChain);
        }

        const newNums = nums.filter(
          (num, index) => index !== positionA && index !== positionB
        );
        if (newNums.length > 0) {
          solve([numC, ...newNums], newChain);
        }
      }
    }
  };

  const subtract = (nums: number[], chain: Solution[]) => {
    for (let positionA = 0; positionA < nums.length; positionA++) {
      for (let positionB = 0; positionB < nums.length; positionB++) {
        if (positionA !== positionB) {
          const numA = nums[positionA];
          const numB = nums[positionB];
          const numC = numA - numB;
          if (numC > 0) {
            const newChain = [
              ...chain,
              { a: numA, b: numB, operand: '-', c: numC },
            ];

            if (numC === target) {
              solutions.push(newChain);
            }

            const newNums = nums.filter(
              (num, index) => index !== positionA && index !== positionB
            );
            if (newNums.length > 0) {
              solve([numC, ...newNums], newChain);
            }
          }
        }
      }
    }
  };

  const multiply = (nums: number[], chain: Solution[]) => {
    for (let positionA = 0; positionA < nums.length - 1; positionA++) {
      for (
        let positionB = positionA + 1;
        positionB < nums.length;
        positionB++
      ) {
        const numA = nums[positionA];
        const numB = nums[positionB];
        const numC = numA * numB;

        const newChain = [
          ...chain,
          { a: numA, b: numB, operand: '*', c: numC },
        ];
        if (numC === target) {
          solutions.push(newChain);
        }

        const newNums = nums.filter(
          (num, index) => index !== positionA && index !== positionB
        );
        if (newNums.length > 0) {
          solve([numC, ...newNums], newChain);
        }
      }
    }
  };

  const divide = (nums: number[], chain: Solution[]) => {
    for (let positionA = 0; positionA < nums.length; positionA++) {
      for (let positionB = 0; positionB < nums.length; positionB++) {
        if (positionA !== positionB) {
          const numA = nums[positionA];
          const numB = nums[positionB];
          const numC = numA / numB;
          if (numC > 0 && numC - Math.round(numC) === 0) {
            const newChain = [
              ...chain,
              { a: numA, b: numB, operand: '/', c: numC },
            ];

            if (numC === target) {
              solutions.push(newChain);
            }

            const newNums = nums.filter(
              (num, index) => index !== positionA && index !== positionB
            );
            if (newNums.length > 0) {
              solve([numC, ...newNums], newChain);
            }
          }
        }
      }
    }
  };

  const solve = (nums: number[], chain: Solution[]) => {
    divide(nums, chain);
    multiply(nums, chain);
    add(nums, chain);
    subtract(nums, chain);
  };

  solve(nums, []);

  solutions.sort((a, b) => a.length - b.length);

  return solutions[0];
}
