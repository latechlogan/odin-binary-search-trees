#!/usr/bin/env node

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  let midpoint = Math.floor(array.length / 2);
  let left = mergeSort(array.slice(0, midpoint));
  let right = mergeSort(array.slice(midpoint));

  return merge(left, right);
}

function merge(left, right) {
  let i = 0;
  let j = 0;
  let mergedArray = [];

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      mergedArray.push(left[i++]);
    } else {
      mergedArray.push(right[j++]);
    }
  }

  if (i < left.length) {
    mergedArray.push(...left.slice(i));
  }

  if (j < right.length) {
    mergedArray.push(...right.slice(j));
  }

  return mergedArray;
}

export { mergeSort };
