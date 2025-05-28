import { EC2, S3, RDS, Lambda } from "../nodes/aws/AWSServices";
import { VirtualMachine } from "../nodes/azure/AzureServices";
import { ComputeEngine } from "../nodes/gcp/GCPServices";

describe("Cloud Service Nodes", () => {
  describe("AWS Services", () => {
    test("should create EC2 instance", () => {
      const ec2 = new EC2("web-server", "My Web Server");

      expect(ec2.id).toBe("web-server");
      expect(ec2.label).toBe("My Web Server");
      expect(ec2.provider).toBe("aws");
      expect(ec2.service).toBe("ec2");
    });

    test("should create S3 bucket", () => {
      const s3 = new S3("data-bucket", "My Storage");

      expect(s3.id).toBe("data-bucket");
      expect(s3.label).toBe("My Storage");
      expect(s3.provider).toBe("aws");
      expect(s3.service).toBe("simplestorageservice");
    });

    test("should create RDS database", () => {
      const rds = new RDS("main-db", "Main Database");

      expect(rds.id).toBe("main-db");
      expect(rds.label).toBe("Main Database");
      expect(rds.provider).toBe("aws");
      expect(rds.service).toBe("rds");
    });

    test("should create Lambda function", () => {
      const lambda = new Lambda("api-function", "API Function");

      expect(lambda.id).toBe("api-function");
      expect(lambda.label).toBe("API Function");
      expect(lambda.provider).toBe("aws");
      expect(lambda.service).toBe("lambda");
    });
  });

  describe("Azure Services", () => {
    test("should create Virtual Machine", () => {
      const vm = new VirtualMachine("web-vm", "Web VM");

      expect(vm.id).toBe("web-vm");
      expect(vm.label).toBe("Web VM");
      expect(vm.provider).toBe("azure");
      expect(vm.service).toBe("virtualmachine");
    });
  });

  describe("GCP Services", () => {
    test("should create Compute Engine", () => {
      const gce = new ComputeEngine("web-instance", "Web Instance");

      expect(gce.id).toBe("web-instance");
      expect(gce.label).toBe("Web Instance");
      expect(gce.provider).toBe("gcp");
      expect(gce.service).toBe("computeengine");
    });
  });

  describe("Node Properties", () => {
    test("should set and get node position", () => {
      const ec2 = new EC2("test");

      ec2.withPosition(100, 200);
      const position = ec2.position;

      expect(position?.x).toBe(100);
      expect(position?.y).toBe(200);
    });

    test("should set and get metadata", () => {
      const s3 = new S3("test-bucket");

      s3.withMetadata({ region: "us-east-1", encryption: true });

      expect(s3.metadata.region).toBe("us-east-1");
      expect(s3.metadata.encryption).toBe(true);
    });
  });
});
