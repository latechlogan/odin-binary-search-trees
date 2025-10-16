# Binary Search Tree (BST)

A balanced binary search tree implementation in JavaScript with full CRUD operations, tree traversal methods, and automatic rebalancing.

## What This Does

This project implements a self-balancing binary search tree that keeps your data sorted and accessible with lightning-fast O(log n) lookup, insertion, and deletion. The tree automatically builds itself in a balanced state and can rebalance on command when things get lopsided.

## Features

- **Balanced tree construction** from unsorted arrays
- **Insert & delete** nodes while maintaining BST properties
- **Find** nodes by value
- **Four traversal methods**: level-order (breadth-first), in-order, pre-order, and post-order
- **Height & depth** calculations for any node
- **Balance checking** to verify tree health
- **Automatic rebalancing** to restore optimal structure
- **Pretty print** visualization for debugging

## Project Structure

```
.
├── bst.js           # Core BST implementation (Node & Tree classes)
├── mergeSort.js     # Merge sort algorithm for sorting input arrays
├── driver.js        # Demo script showing all BST operations
└── README.md        # You're reading it
```

## How It Works

### Building the Tree

The `buildTree()` function takes an array, removes duplicates, sorts it using merge sort, and recursively builds a balanced BST by selecting the middle element as the root at each level.

### Node Structure

Each node contains:

- `data` - the value stored in the node
- `left` - reference to left child (smaller values)
- `right` - reference to right child (larger values)

### Core Methods

**Tree Operations:**

- `insert(value)` - Add a new value to the tree
- `delete(value)` - Remove a value from the tree
- `find(value)` - Locate and return the node containing a value

**Traversal Methods:**

- `levelOrderForEach(callback)` - Breadth-first traversal
- `inOrderForEach(callback)` - Left → Root → Right (sorted order)
- `preOrderForEach(callback)` - Root → Left → Right
- `postOrderForEach(callback)` - Left → Right → Root

**Analysis Methods:**

- `height(value)` - Returns number of edges from node to deepest leaf
- `depth(value)` - Returns number of edges from node to root
- `isBalanced()` - Checks if tree maintains balance property
- `rebalance()` - Rebuilds the tree in balanced form

## Running the Project

### Prerequisites

- Node.js installed on your machine

### Execute the Driver Script

```bash
node driver.js
```

### What the Driver Does

1. Creates a BST from 15 random numbers (0-99)
2. Confirms the tree is balanced
3. Prints all four traversal orders
4. Adds numbers > 100 to unbalance the tree
5. Confirms the tree is now unbalanced
6. Rebalances the tree
7. Confirms balance is restored and prints traversals again

## Example Output

```
Random array: 23, 45, 12, 67, 89, 34, 56, 78, 90, 1, 43, 65, 87, 21, 54
Is balanced (initial)? true
Level order:  45, 23, 67, 12, 34, 56, 87, 1, 21, 43, 54, 65, 78, 89, 90
Pre order:    45, 23, 12, 1, 21, 34, 43, 67, 56, 54, 65, 87, 78, 89, 90
In order:     1, 12, 21, 23, 34, 43, 45, 54, 56, 65, 67, 78, 87, 89, 90
Post order:   1, 21, 12, 43, 34, 23, 54, 65, 56, 78, 90, 89, 87, 67, 45
Tree structure:
│           ┌── 90
│       ┌── 89
│       │   └── 87
│   ┌── 78
│   │   └── 67
│   │       └── 65
└── 45
    │       ┌── 56
    │       │   └── 54
    │   ┌── 43
    │   │   └── 34
    └── 23
        │   ┌── 21
        └── 12
            └── 1
```

## Key Implementation Details

- **No duplicates allowed** - duplicate values are ignored during insertion
- **Merge sort integration** - ensures O(n log n) sorting before tree construction
- **Recursive deletion** - handles three cases: no children, one child, two children
- **In-order successor** - used when deleting nodes with two children
- **Callback pattern** - all traversal methods require a callback function
- **Balance validation** - checks balance condition for every node, not just the root

## Assignment Source

This project is from [The Odin Project](https://www.theodinproject.com/) - Full Stack JavaScript curriculum.

## What I Learned

- Building and balancing binary search trees from scratch
- Implementing recursive tree traversal algorithms
- Managing node relationships and references
- Using callbacks with tree traversal methods
- Calculating tree metrics (height, depth, balance)

---

Built with ☕ and recursion
