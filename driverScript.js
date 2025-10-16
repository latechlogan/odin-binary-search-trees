import { Tree, prettyPrint } from "./bst.js";

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
