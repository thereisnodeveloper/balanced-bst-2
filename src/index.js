/* eslint-disable max-classes-per-file */
// #region required-template
import './reset.css';
import './style.css';

export class NodeBst {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export class Tree {
  constructor() {
    this.root = null;
  }

  /**
   *
   * @param {Array} array
   * @returns
   */
  buildTree(startingArray) {
    const processedArray = [...new Set(startingArray)].toSorted((a, b) => a - b);

    function buildTreeRecursive(array, whichSubTree, recursionNumber = 0) {
      if (recursionNumber > 30) {
        throw new Error('recursion callstack max exceeded');
      }
      // Tracing recursion
      // console.log('whichSubTree', whichSubTree);
      // console.log('recursionNumber:', recursionNumber);
      // console.log('startarray:',array);

      if (array.length === 0) {
        // console.log('reached end (array.length = 0), stopping')
        return null;
      }
      // get middle, assign to root
      const middle = Math.floor((array.length - 1) / 2);
      const end = array.length - 1;
      const root = new NodeBst(array[middle]);
      // take left subarray, construct left subtree (recurse)
      // console.log('middle:', middle);

      const leftSubArray = array.slice(0, middle);
      const rightSubArray = array.slice(middle + 1, end + 1);

      root.left = buildTreeRecursive(leftSubArray, 'left', recursionNumber + 1);
      root.right = buildTreeRecursive(rightSubArray, 'right', recursionNumber + 1);

      // take right subarray, construct right subtree (recurse)

      // base case: no number is left in the array, all added to tree
      return root;
    }
    this.root = buildTreeRecursive(processedArray);
  }

  insert(value) {
    // create new node with value
    // travel down the tree
    // compare values to determine whether to go left or right
    // check if next node is leafnode
    // change reference to currentNode to the new node
  }

  showTreeAsArray() {
    const outputArray = [];
    this.inOrder((node) => {
      const nodeItem = { left: null, data: null, right: null };
      if (node.left) {
        nodeItem.left = node.left.data;
      }
      nodeItem.data = node.data;
      if (node.right) {
        nodeItem.right = node.right.data;
      }
      outputArray.push(nodeItem)
    });
    return outputArray;
  }

  inOrder(callback, node = this.root) {
    // callback(node);
    // inOrder: LEFT, DATA, RIGHT
    // LIFO stack

    // visit left
    if (node.left) {
      this.inOrder(callback, node.left);
    }
    // visit node(data)
    // console.log(node.data);
    callback(node);
    // visit right
    if (node.right) {
      this.inOrder(callback, node.right);
    }
    return null;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }

  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
const tree1 = new Tree();
// const treeArray = [1, 2, 3, 4];
const treeArray = [1, 2, 3, 4, 5];
tree1.buildTree(treeArray);
prettyPrint(tree1.root);
console.log('tree1.root:', tree1.root);
// console.log( tree1.showTreeAsArray())
console.table(tree1.showTreeAsArray());
