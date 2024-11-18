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
   * @param {Array} startingArray
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

  insert(value, node = this.root) {
    const TRAVEL_DIR_ENUMS = { LEFT: 'left', RIGHT: 'right' };
    // travel down the tree
    const travelDirection = compareValues(value, node.data);
    function compareValues(value, currentNodeData) {
      if (value === currentNodeData) throw new Error('shouldnt have duplicate values');
      if (value < currentNodeData) {
        return TRAVEL_DIR_ENUMS.LEFT;
      }
      return TRAVEL_DIR_ENUMS.RIGHT;
    }

    // recursive case
    if (node[travelDirection]) {
      this.insert(value, node[travelDirection]);
    } else {
      // base case - no child node to get in the way
      node[travelDirection] = new NodeBst(value);
    }
    // compare values to determine whether to go left or right
    // check if either node.left or node.right exists already
    // if exists, continue - recurse
    // if not, base case.
    // create new node with value
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
      outputArray.push(nodeItem);
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
const treeArray = [1, 2, 3, 4];
tree1.buildTree(treeArray);
prettyPrint(tree1.root);
tree1.insert(5)
console.log('tree1.root:', tree1.root);
// console.log( tree1.showTreeAsArray())
console.table(tree1.showTreeAsArray());
// const filtered = tree1.showTreeAsArray().filter((nodeItemObj) => {
//   return nodeItemObj.left !== null || nodeItemObj.right !== null;
// });
// console.log('filtered:', filtered);

// .forEach((nodeItemObj)=>{
//   nodeItemObj.
// })

// OPT1:check if array length changes if turned into a set
// OPT2: build a separate comparison array, iterate through it for every item of
// the original array
// OPT3: forEach, some - nest loop, bad O(n)
// DECISION: go with OPT1; cant find alternatives no internet
