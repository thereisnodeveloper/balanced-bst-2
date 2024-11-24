import { NodeBst, Tree } from './index.js';

describe('Tree class', () => {
  const tree1 = new Tree();
  let testAnswer;
describe('levelOrder traversal', ()=>{
  it('throws error if no callback', ()=>{
    tree1.buildTree([1,2,3,4,5,6])
    expect(tree1.levelOrder).toThrow()
  })
})

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
      // besides NULL, there should not be duplicate values in LEFT column
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
