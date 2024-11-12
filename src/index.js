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
  buildTreeWrapper(array) {
    const processedArray = [...new Set(array)].toSorted((a, b) => a - b);

    function buildTreeRecursive() {
    // get middle
      const middle = Math.ceil(processedArray.length / 2);
    // take left subarray, construct left subtree (recurse)
      const left = processedArray.slice(0, middle - 1);

    // take right subarray, construct right subtree (recurse)
      const right = processedArray.slice(middle);

    // base case: no number is left in the array, all added to tree
      return left;
    }

    return buildTreeRecursive(processedArray);
  }
}
