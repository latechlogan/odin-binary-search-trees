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

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let currentNode = this.root;

    while (currentNode !== null) {
      if (value === currentNode.data) return; // duplicate check

      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  delete(value) {
    this.root = deleteNode(this.root, value);

    function deleteNode(currentNode, value) {
      if (currentNode === null) {
        return currentNode;
      }

      if (value < currentNode.data) {
        currentNode.left = deleteNode(currentNode.left, value);
      } else if (value > currentNode.data) {
        currentNode.right = deleteNode(currentNode.right, value);
      } else {
        if (currentNode.left === null) {
          return currentNode.right;
        }

        if (currentNode.right === null) {
          return currentNode.left;
        }

        let successor = getSuccessor(currentNode);
        currentNode.data = successor.data;
        currentNode.right = deleteNode(currentNode.right, successor.data);
      }

      return currentNode;
    }

    function getSuccessor(currentNode) {
      currentNode = currentNode.right;
      while (currentNode !== null && currentNode.left !== null) {
        currentNode = currentNode.left;
      }
      return currentNode;
    }
  }

  find(value) {
    let currentNode = this.root;

    if (currentNode === null) {
      return currentNode;
    }

    while (currentNode !== null) {
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        return currentNode;
      }
    }

    return `Value "${value}" not found.`;
  }

  levelOrderForEach(callback) {
    if (!callback) throw new Error("No callback provided.");

    if (this.root === null) return;

    let discoveredNodes = [this.root];

    while (discoveredNodes.length) {
      let currentNode = discoveredNodes.shift();
      callback(currentNode);

      if (currentNode.left !== null) {
        discoveredNodes.push(currentNode.left);
      }

      if (currentNode.right !== null) {
        discoveredNodes.push(currentNode.right);
      }
    }
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

    root.left = build(arr.slice(start, mid));
    root.right = build(arr.slice(mid + 1));

    return root;
  }

  return build(sortedArray);
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let numTree = new Tree(testArray);

console.log(numTree);
prettyPrint(numTree.root);
