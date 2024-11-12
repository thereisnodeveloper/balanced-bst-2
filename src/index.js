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
  buildTree(array) {
    const processedArray = [...new Set(array)].toSorted((a, b) => a - b);
    

    return Math.ceil(processedArray.length / 2);
  }
}
