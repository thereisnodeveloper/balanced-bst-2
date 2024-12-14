import { NodeBst, Tree } from './index.js';

describe('Tree class', () => {
  const tree1 = new Tree();
  let testAnswer;

  describe('isBalanced- check if tree is balanced', () => {
    it('exists', () => {
      expect(tree1.isBalanced).toBeDefined();
    });
    it('returns true when root node is fed to [0, 1, 2, 3, 4, 5, 6, 7]', () => {
      tree1.buildTree([0, 1, 2, 3, 4, 5, 6, 7]);
      expect(tree1.isBalanced()).toBe(true);
    });
    it('returns false for a small unbalanced tree', () => {
      const tree2 = new Tree();
      tree2.root = new NodeBst(0);
      tree2.root.right = new NodeBst(1);
      tree2.root.right.right = new NodeBst(2);

      expect(tree2.isBalanced()).toBe(false);
    });
  });

  describe('depth', () => {
    it('exists', () => {
      expect(tree1.depth).toBeDefined();
    });
    it('returns depth of x when targetNode is .... ', () => {
      tree1.buildTree([0, 1, 2, 3, 4, 5, 6, 7]);

      expect(tree1.depth(tree1.root.right)).toBe(1);
      expect(tree1.depth(tree1.root.left)).toBe(1);
      expect(tree1.depth(tree1.root.left.right)).toBe(2);
      expect(tree1.depth(tree1.root)).toBe(0);
    });
    it('throws error if targetNode does not exist', () => {
      tree1.buildTree([0, 1, 2, 3, 4, 5, 6, 7]);
      expect(() => tree1.depth(tree1.dontExist)).toThrow();
    });
  });

  describe('approach1 - path based ', () => {
    // it('takes 0-7, returns 4 paths', () => {
    // tree1.buildTree([0, 1, 2, 3, 4, 5, 6, 7]);
    // expect(tree1.heightWay1PathBased().length).toBe(4)
    // });
    const testArrays = [
      { array: [0, 1, 2], expectedHeight: 2 },
      { array: [0, 1, 2, 3, 4, 5], expectedHeight: 3 },
      { array: [0, 1, 2, 3, 4, 5, 12, 13], expectedHeight: 4 },
      { array: [0], expectedHeight: 1 },
    ];
    test.each(testArrays)(`test $array vs $expect`, ({ array, expectedHeight }) => {
      tree1.buildTree(array);
      expect(tree1.heightWay1PathBased()).toBe(expectedHeight);
    });
  });
  describe('postOrder traversal', () => {
    it('throws error if no callback', () => {
      tree1.buildTree([1, 2, 3, 4, 5, 6]);
      expect(tree1.postOrder).toThrow();
    });
    it('visits LEFT, RIGHT, DATA', () => {
      tree1.buildTree([3, 1, 2, 5, 4, 6]);
      const resultNodeArray = [];
      tree1.postOrder((node) => resultNodeArray.push(node.data));
      expect(resultNodeArray).toStrictEqual([2, 1, 4, 6, 5, 3]);
    });
  });
  describe('preOrder traversal', () => {
    it('handles an empty tree', () => {
      const emptyTree = new Tree();
      const resultNodeArray = [];
      emptyTree.preOrder((node) => resultNodeArray.push(node.data));
      expect(resultNodeArray).toStrictEqual([]);
    });

    it('handles a tree with only a root node', () => {
      tree1.buildTree([1]);
      const resultNodeArray = [];
      tree1.preOrder((node) => resultNodeArray.push(node.data));
      expect(resultNodeArray).toStrictEqual([1]);
    });

    it('throws error if no callback', () => {
      tree1.buildTree([1, 2, 3, 4, 5, 6]);
      expect(tree1.preOrder).toThrow();
    });
    it('visits DATA->LEFT->RIGHT', () => {
      tree1.buildTree([3, 1, 2, 5, 4, 6]);
      const resultNodeArray = [];
      tree1.preOrder((node) => resultNodeArray.push(node.data));
      expect(resultNodeArray).toStrictEqual([3, 1, 2, 5, 4, 6]);
    });
  });
  describe('levelOrder traversal', () => {
    it('throws error if no callback', () => {
      tree1.buildTree([1, 2, 3, 4, 5, 6]);
      expect(tree1.levelOrder).toThrow();
    });

    it('visits nodes in a breadth first fashion', () => {
      tree1.buildTree([1, 2, 3, 4, 5, 6]);
      const resultNodeArray = [];
      tree1.levelOrder((node) => resultNodeArray.push(node.data));
      expect(resultNodeArray).toStrictEqual([3, 1, 5, 2, 4, 6]);
    });
    it('visits nodes in an inorder fashion', () => {
      tree1.buildTree([4, 2, 6, 1, 3, 5, 7]);
      const resultNodeArray = [];
      tree1.inOrder((node) => resultNodeArray.push(node.data));
      expect(resultNodeArray).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
    });
  });

  describe('deletion', () => {
    it('exists', () => {
      expect(tree1.delete).toBeDefined();
    });
    it('returns undefined if value doesnt exist', () => {
      tree1.buildTree([1, 2, 3, 4]);
      tree1.delete(5);
      expect(tree1.delete(5)).toBeUndefined();
    });

    describe('deletion: 2 children', () => {
      it('finds inOrderSuccessor if node has 2 children', () => {
        tree1.buildTree([1, 2, 3, 4, 5, 6, 7]);
        tree1.delete(6);
        expect(tree1.showTreeAsArray()).toStrictEqual([
          { left: null, data: 1, right: null },
          { left: 1, data: 2, right: 3 },
          { left: null, data: 3, right: null },
          { left: 2, data: 4, right: 5 },
          { left: null, data: 5, right: 7 },
          { left: null, data: 7, right: null },
        ]);
      });
    });

    // it('throws error if node has 2 children',()=>{
    //   tree1.buildTree([1,2,3,4,5,6,7]);
    //   // tree1.delete(6);
    //   expect(tree1.delete).toThrow()
    // })
    it('deletes node with 1 child', () => {
      tree1.buildTree([1, 2, 3, 4]);
      tree1.delete(3);
      expect(tree1.showTreeAsArray()).toStrictEqual([
        { left: null, data: 1, right: null },
        { left: 1, data: 2, right: 4 },
        { left: null, data: 4, right: null },
      ]);
    });

    it('deletes leaf node', () => {
      tree1.buildTree([1, 2, 3, 4]);
      tree1.delete(1);
      expect(tree1.showTreeAsArray()).toStrictEqual([
        { left: null, data: 2, right: 3 },
        { left: null, data: 3, right: 4 },
        { left: null, data: 4, right: null },
      ]);
    });
  });

  describe('insertion', () => {
    it('exists', () => {
      expect(tree1.insert).toBeDefined();
    });
    it('throws error when node value exists in tree', () => {
      tree1.buildTree([1, 2, 3, 4]);
      expect(() => tree1.insert(4)).toThrow();
    });
    it('inserts 1 node, changing showTreeAsArray', () => {
      tree1.buildTree([1, 2, 3, 4]);
      tree1.insert(5);
      testAnswer = [
        { left: null, data: 1, right: null },
        { left: 1, data: 2, right: 3 },
        { left: null, data: 3, right: 4 },
        { left: null, data: 4, right: 5 },
        { left: null, data: 5, right: null },
      ];
      expect(tree1.showTreeAsArray()).toStrictEqual(testAnswer);
    });
    it('inserts a node with value between lowest and highest value, changing showTreeAsArray', () => {
      tree1.buildTree([1, 2, 3, 10]);
      tree1.insert(4);
      testAnswer = [
        { left: null, data: 1, right: null },
        { left: 1, data: 2, right: 3 },
        { left: null, data: 3, right: 10 },
        { left: null, data: 4, right: null },
        { left: 4, data: 10, right: null },
      ];
      expect(tree1.showTreeAsArray()).toStrictEqual(testAnswer);
    });
  });
  describe('showTreeAsArray', () => {
    tree1.buildTree([1, 2, 3, 4]);
    it('should not have node.left or node.right value occur more than once', () => {
      // nothing on the 'left' column can be on the 'right' column, vice versa
      // besides NULL
      // there should not be duplicate values in LEFT column
      // besides NULL, there should not be duplicate values in RIGHT column
      const arrayOfLeftRightReferences = [];
      tree1.showTreeAsArray().forEach((nodeItemObject) => {
        ['left', 'right'].forEach((property) => {
          if (nodeItemObject[property] !== null)
            arrayOfLeftRightReferences.push(nodeItemObject[property]);
        });
      });

      expect(arrayOfLeftRightReferences.length).toBe(new Set(arrayOfLeftRightReferences).size);
    });
  });

  describe('print tree as array', () => {
    tree1.buildTree([1, 2, 3, 4]);

    expect(tree1.showTreeAsArray()).toStrictEqual([
      { left: null, data: 1, right: null },
      { left: 1, data: 2, right: 3 },
      { left: null, data: 3, right: 4 },
      { left: null, data: 4, right: null },
    ]);
  });

  describe('buildTree', () => {
    // TODO: height of left subtree and rightsubtree differ by at most 1
    // TODO: check that tree is balanced

    // it('returns right array', () => {
    //   expect(tree1.buildTree([1, 2, 3, 4, 5])).toStrictEqual([4, 5]);
    // });

    // it('returns left array', () => {
    //   expect(tree1.buildTree([1, 2, 3, 4, 5])).toStrictEqual([1, 2]);
    // });

    // it('returns middle', () => {
    //   expect(tree1.buildTree([1, 2, 3, 4, 5])).toBe(3);
    //   expect(tree1.buildTree([1, 2, 3, 4])).toBe(2);
    //   expect(tree1.buildTree([3, 4, 5, 6])).toBe(2);
    // });

    // it('removes duplicates',()=>{
    //   expect(tree1.buildTree([5,5,2,4])).toStrictEqual([2,4,5]);
    //   expect(tree1.buildTree([4,4,5,5,2,4])).toStrictEqual([2,4,5])
    // })
    // it('sorts fed array', () => {
    //   expect(tree1.buildTree([1, 3, 4, 5, 2])).toStrictEqual([1, 2, 3, 4, 5]);
    //   expect(tree1.buildTree([5, 770, 100])).toStrictEqual([5, 100, 770]);
    // });
    it('exists', () => {
      expect(tree1.buildTree).toBeDefined();
    });
  });

  it('exists', () => {
    expect(Tree).toBeDefined();
  });
  it('is a class', () => {
    expect(tree1).toBeInstanceOf(Tree);
  });
  it('has property', () => {
    expect(tree1).toHaveProperty('root');
  });
});

describe('Node class', () => {
  const node1 = new NodeBst();

  it('exists', () => {
    expect(NodeBst).toBeDefined();
  });
  it('is a class', () => {
    expect(node1).toBeInstanceOf(NodeBst);
  });
  it('has properties', () => {
    ['data', 'left', 'right'].forEach((property) => expect(node1).toHaveProperty(property));
  });
});
