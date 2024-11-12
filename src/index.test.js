import { NodeBst, Tree } from './index.js';

describe('Tree class', () => {
  const tree1 = new Tree()


describe('buildTree',()=>{
  it('exists',()=>{
    expect(tree1.buildTree).toBeDefined()
  })
})

  it('exists', () => {
    expect(Tree).toBeDefined();
  });
  it('is a class', () => {
    expect(tree1).toBeInstanceOf(Tree);
  });
  it('has property',()=>{
    expect(tree1).toHaveProperty('root')
  })
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
