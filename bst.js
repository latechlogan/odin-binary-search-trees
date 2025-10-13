#!/usr/bin/env node

import { mergeSort } from "./mergeSort.js";

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
}

function buildTree(array) {
  const sortedArray = [...new Set(mergeSort(array))];

  function build(arr) {
    if (arr.length === 0) {
      return null;
    }

    let start = 0;
    let end = arr.length - 1;
    let mid = start + Math.floor((end - start) / 2);

    let root = new Node(arr[mid]);

    root.left = buildTree(arr.slice(start, mid));
    root.right = buildTree(arr.slice(mid + 1));

    return root;
  }

  return build(sortedArray);
}

console.log(buildTree(testArray));
