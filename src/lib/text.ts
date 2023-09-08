export function isValidInteger(num: number): boolean {
  return !isNaN(num) && num > 0 && Number.isInteger(num);
}

export function convertStringToNums(str: string): number[] {
  return str
    .split(' ')
    .map((subStr) => Number(subStr))
    .filter(isValidInteger);
}
