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
      if (node) {
        if (node.left) {
          nodeItem.left = node.left.data;
        }
        nodeItem.data = node.data;
        if (node.right) {
          nodeItem.right = node.right.data;
        }
        outputArray.push(nodeItem);
      }
    });
    return outputArray;
  }

  inOrder(callback, node = this.root) {
    // inOrder: LEFT, DATA, RIGHT
    if (!node) return;

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
    // return null;
  }

  preOrder(callback, node = this.root) {
    // preOrder: DATA, LEFT, RIGHT
    // handle empty tree
    if (!this.root) return;
    if (!callback) throw new Error('no callback');
    // visit node(data)
    callback(node);
    // visit left
    if (node.left) {
      this.preOrder(callback, node.left);
    }
    // visit right
    if (node.right) {
      this.preOrder(callback, node.right);
    }
  }

  postOrder(callback, node = this.root) {
    // postOrder: LEFT, RIGHT, DATA
    if (!callback) throw new Error('no callback');

    // visit left
    if (node.left) {
      this.postOrder(callback, node.left);
    }
    // visit right
    if (node.right) {
      this.postOrder(callback, node.right);
    }
    // visit node(data)
    callback(node);
  }

  delete(value, node = this.root) {
    if (!node) return;
    const performDeletion = (direction) => {
      const deleteTarget = node[direction];
      // deletion target has 2 children
      if (deleteTarget.left && deleteTarget.right) {
        const { node: successor, nodeParent: successorParent } =
          this.findInOrderSuccessor(deleteTarget);
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
    return { node, nodeParent };
  }

  levelOrder(callback, queueArray = [this.root]) {
    if (!callback) throw new Error('no callback function');
    const node = queueArray.shift();
    callback(node);
    // base case
    if (!node.left && !node.right && queueArray.length <= 0) return;
    if (node.left) queueArray.push(node.left);
    if (node.right) queueArray.push(node.right);

    this.levelOrder(callback, queueArray);
  }

  height(node) {
    // get: number of edges in the longest path from a given node to a leaf node
    // OPTION1: generate paths & find one with highest length
    // start at given node
    // create new path (array)
    // go left if node has never been visited
    // otherwise go rightarrayForThisLevel2, count
    // whenever there's a fork in the road, copy the current array and feed it to
    // the "side road"
    // node is added to path
    // count++ every time a new jump is made to another node
    // if you hit leaf node, save path and push to array
    // start from
    /* OPTION2: "chop" method - cut the tree, removing nodes and replacing them
    with their children */
    // no matter whether node has 1 or 2 children, 1 "chop" counts as 1 operation
    // stop chopping
    // OPTION3: "modified levelOrder traversal"
    // get all children of node, save to arrayForThisLevel
    // loop through the whole arrayForThisLevel and
    // add children of all items to arrayForThisLevel2
    // when done, count++
    // return {arrayForThisLevel2, count}
    // OPTION4: use callback with inOrder(depth-first) traversal, keep track of
    // max traversal, count++ when going down
    // count-- when going up
    // if conut > max, save count to max when hitting leaf
    // return max after end of traversald
  }

  heightWay4TraversalBased(node = this.root, count = 1, max = 0) {
    // whenever visiting LEFT or RIGHT, ++count
    // whenever finishing the entire DLR function, --count (returning and going back
    // up the function  )

    if (!node) {
      if (count > max) max = count;
      // return count;
    }
    if (node.left) {
      this.heightWay4TraversalBased(node.left, ++count);
    }
    if (node.right) {
      this.heightWay4TraversalBased(node.right, ++count);
    }
    return --count;

    //! !! store count in callback
  }

  heightWay1PathBased(node = this.root, allPaths = [], singlePath) {
    let newPath;
    newPath = singlePath || [];
    newPath.push(node);
    // OPTION1: generate paths & find one with highest length
    // start at given node
    // create new path (array)
    if (node.left) {
      this.heightWay1PathBased(node.left, allPaths, newPath);
    }
    if (node.right) {
      this.heightWay1PathBased(node.right, allPaths, newPath);
    }

    if (!node.left && !node.right) {
      allPaths.push(newPath);
      newPath = null;
      return;
    }

    return allPaths;
    // go left if node has never been visited
    // otherwise go right, count
    // whenever there's a fork in the road, copy the current array and feed it to
    // the "side road"
    // node is added to path
    // count++ every time a new jump is made to another node
    // if you hit leaf node, save path and push to array
    // start from
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
const treeArray = [1, 2, 3, 4, 5, 6];
tree1.buildTree(treeArray);

// tree1.buildTree([3, 2, 1]);

// console.log('%c before delete', 'color: #ff0000');
prettyPrint(tree1.root);
// tree1.delete(16);
// console.log('%c after delete', 'color: #ff0000');
// prettyPrint(tree1.root);

console.table(tree1.showTreeAsArray());

// DECISION: how to check if 2 arrays are different
// OPTION1:check if array length changes if turned into a set
// OPTION2: build a separate comparison array, iterate through it for every item of
// the original array
// OPTION3: forEach, some - nest loop, bad O(n)
// DECISION: go with OPT1; cant find alternatives no internet

console.log( tree1.heightWay4TraversalBased())