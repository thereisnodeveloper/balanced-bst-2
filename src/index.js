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
      if (recursionNumber > 30) { throw new Error('recursion callstack max exceeded'); }
      // Tracing recursion
      console.log('whichSubTree', whichSubTree);
      console.log('recursionNumber:', recursionNumber);

      console.log(array);
      if (array.length === 0) return null;
      // get middle, assign to root
      const middle = (array.length - 1) / 2;
      const root = new NodeBst(middle);
      // take left subarray, construct left subtree (recurse)
      console.log('middle:', middle);

      root.left = buildTreeRecursive(array.slice(0, middle - 1), 'left', recursionNumber + 1);
      root.right = buildTreeRecursive(
        array.slice(array.slice(middle)),
        'right',
        recursionNumber + 1,
      );

      // take right subarray, construct right subtree (recurse)

      // base case: no number is left in the array, all added to tree
      return root;
    }
    this.root = buildTreeRecursive(processedArray);
  }
}

// traceRecursion(){
//   const recursionCount
// }

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
prettyPrint(tree1.root);
tree1.buildTree([1, 2, 3, 4, 5]);
