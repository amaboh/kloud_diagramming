import { Diagram } from "../core/Diagram";
import { EC2, S3, RDS } from "../nodes/aws/AWSServices";

describe("Diagram", () => {
  let diagram: Diagram;

  beforeEach(() => {
    diagram = new Diagram("Test Diagram");
  });

  test("should create a diagram with a title", () => {
    expect(diagram.title).toBe("Test Diagram");
  });

  test("should add nodes to the diagram", () => {
    const ec2 = new EC2("web-server");
    diagram.addNode(ec2);

    expect(diagram.getAllNodes()).toHaveLength(1);
    expect(diagram.getAllNodes()[0]).toBe(ec2);
  });

  test("should add multiple nodes", () => {
    const ec2 = new EC2("web-server");
    const s3 = new S3("storage");
    const rds = new RDS("database");

    diagram.addNode(ec2);
    diagram.addNode(s3);
    diagram.addNode(rds);

    expect(diagram.getAllNodes()).toHaveLength(3);
  });

  test("should add edges between nodes", () => {
    const ec2 = new EC2("web-server");
    const rds = new RDS("database");

    diagram.addNode(ec2);
    diagram.addNode(rds);

    const edges = diagram.connect(ec2, rds);

    expect(diagram.getAllEdges()).toHaveLength(1);
    expect(edges).toHaveLength(1);
  });

  test("should get diagram statistics", () => {
    const ec2 = new EC2("web-server");
    const s3 = new S3("storage");

    diagram.addNode(ec2);
    diagram.addNode(s3);
    diagram.connect(ec2, s3);

    const stats = diagram.getStatistics();
    expect(stats.nodeCount).toBe(2);
    expect(stats.edgeCount).toBe(1);
  });

  test("should remove nodes from the diagram", () => {
    const ec2 = new EC2("web-server");
    diagram.addNode(ec2);

    expect(diagram.getAllNodes()).toHaveLength(1);

    diagram.removeNode(ec2.id);

    expect(diagram.getAllNodes()).toHaveLength(0);
    expect(diagram.getAllEdges()).toHaveLength(0);
  });
});
