import NodeBst from './index.js';

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
