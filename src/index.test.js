import NodeBst from './index.js';

describe('Node class', () => {
  it('exists', () => {
    expect(NodeBst).toBeDefined();
  });
  it('is a class'), () => {
    const node1 = new NodeBst();
    expect(node1).toBeInstanceOf(NodeBst)
  };
});
