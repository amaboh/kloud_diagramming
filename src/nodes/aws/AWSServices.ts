import { AWSNode } from "../CloudNodes";
import { NodeOptions } from "../../types";

/**
 * Amazon EC2 (Elastic Compute Cloud) service node
 */
export class EC2 extends AWSNode {
  constructor(id: string, label: string = "EC2", options: NodeOptions = {}) {
    super(id, label, "ec2", {
      category: "Compute",
      description: "Virtual servers in the cloud",
      ...options,
    });
  }
}

/**
 * Amazon S3 (Simple Storage Service) service node
 */
export class S3 extends AWSNode {
  constructor(id: string, label: string = "S3", options: NodeOptions = {}) {
    super(id, label, "simplestorageservice", {
      category: "Storage",
      description:
        "Object storage built to store and retrieve any amount of data",
      ...options,
    });
  }
}

/**
 * AWS Lambda service node
 */
export class Lambda extends AWSNode {
  constructor(id: string, label: string = "Lambda", options: NodeOptions = {}) {
    super(id, label, "lambda", {
      category: "Compute",
      description: "Run code without thinking about servers",
      ...options,
    });
  }
}

/**
 * Amazon RDS (Relational Database Service) service node
 */
export class RDS extends AWSNode {
  constructor(id: string, label: string = "RDS", options: NodeOptions = {}) {
    super(id, label, "rds", {
      category: "Database",
      description: "Managed relational database service",
      ...options,
    });
  }
}

/**
 * Elastic Load Balancing service node
 */
export class ELB extends AWSNode {
  constructor(
    id: string,
    label: string = "Load Balancer",
    options: NodeOptions = {}
  ) {
    super(id, label, "elasticloadbalancing", {
      category: "Networking",
      description: "Distribute incoming application traffic",
      ...options,
    });
  }
}

/**
 * Amazon VPC (Virtual Private Cloud) service node
 */
export class VPC extends AWSNode {
  constructor(id: string, label: string = "VPC", options: NodeOptions = {}) {
    super(id, label, "vpc", {
      category: "Networking",
      description: "Isolated cloud resources",
      ...options,
    });
  }
}

/**
 * Amazon CloudFront service node
 */
export class CloudFront extends AWSNode {
  constructor(
    id: string,
    label: string = "CloudFront",
    options: NodeOptions = {}
  ) {
    super(id, label, "cloudfront", {
      category: "Networking",
      description: "Global content delivery network",
      ...options,
    });
  }
}

/**
 * Amazon API Gateway service node
 */
export class APIGateway extends AWSNode {
  constructor(
    id: string,
    label: string = "API Gateway",
    options: NodeOptions = {}
  ) {
    super(id, label, "apigateway", {
      category: "Networking",
      description: "Create, publish, maintain, monitor, and secure APIs",
      ...options,
    });
  }
}

/**
 * Amazon DynamoDB service node
 */
export class DynamoDB extends AWSNode {
  constructor(
    id: string,
    label: string = "DynamoDB",
    options: NodeOptions = {}
  ) {
    super(id, label, "dynamodb", {
      category: "Database",
      description: "Fast and flexible NoSQL database service",
      ...options,
    });
  }
}

/**
 * Amazon SNS (Simple Notification Service) service node
 */
export class SNS extends AWSNode {
  constructor(id: string, label: string = "SNS", options: NodeOptions = {}) {
    super(id, label, "sns", {
      category: "Application Integration",
      description: "Pub/sub messaging and mobile notifications",
      ...options,
    });
  }
}

/**
 * Amazon SQS (Simple Queue Service) service node
 */
export class SQS extends AWSNode {
  constructor(id: string, label: string = "SQS", options: NodeOptions = {}) {
    super(id, label, "sqs", {
      category: "Application Integration",
      description: "Managed message queues",
      ...options,
    });
  }
}

/**
 * Amazon CloudWatch service node
 */
export class CloudWatch extends AWSNode {
  constructor(
    id: string,
    label: string = "CloudWatch",
    options: NodeOptions = {}
  ) {
    super(id, label, "cloudwatch", {
      category: "Management & Governance",
      description: "Monitoring and observability service",
      ...options,
    });
  }
}
