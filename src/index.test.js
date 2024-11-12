import { NodeBst, Tree } from './index.js';

describe('Tree class', () => {
  const tree1 = new Tree();

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
      expect(tree1.buildTreeWrapper).toBeDefined();
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
