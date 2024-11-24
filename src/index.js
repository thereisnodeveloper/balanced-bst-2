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
    this.TRAVEL_DIRECTION_ENUMS = { LEFT: 'left', RIGHT: 'right' };
  }

  /**
   *
   * @param {Array} startingArray
   * @returns
   */
  buildTree(startingArray) {
    const processedArray = [...new Set(startingArray)].toSorted((a, b) => a - b);

    function buildTreeRecursive(array, whichSubTree, recursionNumber = 0) {
      if (recursionNumber > 30) {
        throw new Error('recursion callstack max exceeded');
      }

      if (array.length === 0) {
        return null;
      }
      // get middle, assign to root
      const middle = Math.floor((array.length - 1) / 2);
      const end = array.length - 1;
      const root = new NodeBst(array[middle]);
      // take left subarray, construct left subtree (recurse)
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

  compareValues = (value, currentNodeData) => {
    if (value === currentNodeData) throw new Error('shouldnt have duplicate values');
    if (value < currentNodeData) {
      return this.TRAVEL_DIRECTION_ENUMS.LEFT;
    }
    return this.TRAVEL_DIRECTION_ENUMS.RIGHT;
  };

  insert(value, node = this.root) {
    // travel down the tree
    const travelDirection = this.compareValues(value, node.data);

    // recursive case
    if (node[travelDirection]) {
      this.insert(value, node[travelDirection]);
    } else {
      // base case - no child node to get in the way
      node[travelDirection] = new NodeBst(value);
    }
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
      outputArray.push(nodeItem);
    });
    return outputArray;
  }

  inOrder(callback, node = this.root) {
    // inOrder: LEFT, DATA, RIGHT
    // visit left
    if (node.left) {
      this.inOrder(callback, node.left);
    }
    // visit node(data)
    callback(node);
    // visit right
    if (node.right) {
      this.inOrder(callback, node.right);
    }
    return null;
  }

  delete(value, node = this.root) {
    if (!node) return;
    const performDeletion = (direction) => {
      const deleteTarget = node[direction];
      // deletion target has 2 children
      if (deleteTarget.left && deleteTarget.right) {
        const { node: successor, nodeParent: successorParent } = this.findInOrderSuccessor(deleteTarget);
        // set data of deleteTarget's parent's reference to its successor's data
        node[direction].data = successor.data;
        // replace reference to the successor with its child (grandpa is now father)
        successorParent.left = successor.right;
        return;
      }
      // deletion target is leafnode, has NO children
      if (!deleteTarget.left && !deleteTarget.right) {
        node[direction] = null;
        return;
      }
      // deletion target has 1 child
      if (deleteTarget.left || deleteTarget.right) {
        // assign target's parent's references to a grandchild
        node[direction] = deleteTarget.left ? deleteTarget.left : deleteTarget.right;
      }
    };

    const findMatch = () => {
      ['left', 'right'].forEach((direction) => {
        // match has been found, perform deletion
        if (node[direction] && value === node[direction].data) {
          performDeletion(direction);
          return node[direction];
        }
        this.delete(value, node[direction]);
      });
    };
    findMatch();
  }

  findInOrderSuccessor(deleteTarget) {
    // staritng from deleteTarget, traverse down until you hit bottom
    if (!deleteTarget) {
      throw new Error(`deleteTarget ${deleteTarget} undefined`);
    }
    let node = deleteTarget;
    let nodeParent;
    while (node.left) {
      nodeParent = node;
      node = node.left;
    }
    console.log('node:', node);
    console.log('nodeParent:', nodeParent);
    return { node, nodeParent }; // FIXMEn
  }
}

function prettyPrint(node, prefix = '', isLeft = true) {
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
}
const tree1 = new Tree();
const treeArray = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
tree1.buildTree(treeArray);
console.log('%c before delete', 'color: #ff0000');
prettyPrint(tree1.root);
tree1.delete(16);
console.log('%c after delete', 'color: #ff0000');
prettyPrint(tree1.root);

console.table(tree1.showTreeAsArray());

// OPT1:check if array length changes if turned into a set
// OPT2: build a separate comparison array, iterate through it for every item of
// the original array
// OPT3: forEach, some - nest loop, bad O(n)
// DECISION: go with OPT1; cant find alternatives no internet
