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

    return null;
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

  inOrderForEach(callback) {
    if (!callback) throw new Error("No callback provided.");
    inOrder(this.root);

    function inOrder(currentNode) {
      if (currentNode === null) return;
      inOrder(currentNode.left);
      callback(currentNode);
      inOrder(currentNode.right);
    }
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error("No callback provided.");
    inOrder(this.root);

    function inOrder(currentNode) {
      if (currentNode === null) return;
      callback(currentNode);
      inOrder(currentNode.left);
      inOrder(currentNode.right);
    }
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error("No callback provided.");
    inOrder(this.root);

    function inOrder(currentNode) {
      if (currentNode === null) return;
      inOrder(currentNode.left);
      inOrder(currentNode.right);
      callback(currentNode.data);
    }
  }

  height(value) {
    let targetNode = this.find(value);
    if (!targetNode) {
      return null;
    }
    return calcHeight(targetNode);

    function calcHeight(node) {
      if (node === null) return -1;
      let leftHeight = calcHeight(node.left);
      let rightHeight = calcHeight(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  depth(value) {
    return calcDepth(this.root);

    function calcDepth(node) {
      if (node === null) return null;

      if (value === node.data) return 0;

      if (value < node.data) {
        let depthValue = calcDepth(node.left);
        return depthValue !== null ? ++depthValue : null;
      } else if (value > node.data) {
        let depthValue = calcDepth(node.right);
        return depthValue !== null ? ++depthValue : null;
      }
    }
  }

  isBalanced() {
    function compareHeight(node) {
      if (node === null) return 0;

      let leftHeight = compareHeight(node.left);
      if (leftHeight === -1) return -1;
      let rightHeight = compareHeight(node.right);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) return -1;

      return Math.max(leftHeight, rightHeight) + 1;
    }

    return compareHeight(this.root) !== -1;
  }

  rebalance() {
    let data = [];
    this.inOrderForEach(function (node) {
      data.push(node.data);
    });
    this.root = buildTree(data);
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

// Driver sript

function generateRandomArray(size = 15, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

function collectTraversals(tree) {
  const level = [];
  const pre = [];
  const inOrder = [];
  const post = [];

  tree.levelOrderForEach((node) => level.push(node.data));
  tree.preOrderForEach((node) => pre.push(node.data));
  tree.inOrderForEach((node) => inOrder.push(node.data));
  tree.postOrderForEach((value) => post.push(value)); // postOrderForEach passes node.data

  return { level, pre, inOrder, post };
}

function printTraversals(tree) {
  const t = collectTraversals(tree);
  console.log("Level order: ", t.level.join(", "));
  console.log("Pre order:   ", t.pre.join(", "));
  console.log("In order:    ", t.inOrder.join(", "));
  console.log("Post order:  ", t.post.join(", "));
  console.log("Tree structure:");
  prettyPrint(tree.root);
  console.log(""); // spacer
}

// 1) Create a binary search tree from an array of random numbers < 100
const randArr = generateRandomArray(15, 100);
console.log("Random array:", randArr.join(", "));
const randTree = new Tree(randArr);

// 2) Confirm the tree is balanced
console.log("Is balanced (initial)?", randTree.isBalanced());

// 3) Print out all elements in level, pre, post, and in order
printTraversals(randTree);

// 4) Unbalance the tree by adding several numbers > 100
const largeInserts = [101, 102, 103, 104, 105, 106];
largeInserts.forEach((n) => randTree.insert(n));
console.log("Inserted values to unbalance:", largeInserts.join(", "));

// 5) Confirm that the tree is unbalanced
console.log("Is balanced (after inserts)?", randTree.isBalanced());
printTraversals(randTree);

// 6) Balance the tree by calling rebalance
randTree.rebalance();
console.log("Called rebalance()");

// 7) Confirm balanced and print traversals again
console.log("Is balanced (after rebalance)?", randTree.isBalanced());
printTraversals(randTree);
