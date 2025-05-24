import { Diagram } from '../../src/dsl/diagram';
import { AWSNode } from '../../src/dsl/node';

describe('Diagram', () => {
  let diagram: Diagram;

  beforeEach(() => {
    diagram = new Diagram('Test Diagram');
  });

  it('should create a diagram with title', () => {
    expect(diagram.title).toBe('Test Diagram');
  });

  it('should add nodes', () => {
    const node = new AWSNode('ec2', 'compute', 'Web Server');
    diagram.addNode(node);

    const model = diagram.getModel();
    expect(model.nodes).toHaveLength(1);
    expect(model.nodes[0].label).toBe('Web Server');
  });

  it('should connect nodes', () => {
    const node1 = new AWSNode('ec2', 'compute', 'Web Server');
    const node2 = new AWSNode('rds', 'database', 'Database');

    diagram.addNode(node1);
    diagram.addNode(node2);
    diagram.connect(node1, node2);

    const model = diagram.getModel();
    expect(model.edges).toHaveLength(1);
  });
});
