import { GCPNode } from "../CloudNodes";
import { NodeOptions } from "../../types";

/**
 * Google Compute Engine service node
 */
export class ComputeEngine extends GCPNode {
  constructor(
    id: string,
    label: string = "Compute Engine",
    options: NodeOptions = {}
  ) {
    super(id, label, "computeengine", {
      category: "Compute",
      description: "Scalable, high-performance virtual machines",
      ...options,
    });
  }
}

/**
 * Google Cloud Storage service node
 */
export class CloudStorage extends GCPNode {
  constructor(
    id: string,
    label: string = "Cloud Storage",
    options: NodeOptions = {}
  ) {
    super(id, label, "cloudstorage", {
      category: "Storage",
      description: "Object storage for companies of all sizes",
      ...options,
    });
  }
}

/**
 * Google Cloud Functions service node
 */
export class CloudFunctions extends GCPNode {
  constructor(
    id: string,
    label: string = "Cloud Functions",
    options: NodeOptions = {}
  ) {
    super(id, label, "cloudfunctions", {
      category: "Compute",
      description: "Event-driven serverless compute platform",
      ...options,
    });
  }
}

/**
 * Google Cloud SQL service node
 */
export class CloudSQL extends GCPNode {
  constructor(
    id: string,
    label: string = "Cloud SQL",
    options: NodeOptions = {}
  ) {
    super(id, label, "cloudsql", {
      category: "Database",
      description: "Fully managed relational database service",
      ...options,
    });
  }
}

/**
 * Google App Engine service node
 */
export class AppEngine extends GCPNode {
  constructor(
    id: string,
    label: string = "App Engine",
    options: NodeOptions = {}
  ) {
    super(id, label, "appengine", {
      category: "Compute",
      description: "Build and deploy scalable web applications",
      ...options,
    });
  }
}

/**
 * Google Cloud Load Balancing service node
 */
export class LoadBalancing extends GCPNode {
  constructor(
    id: string,
    label: string = "Load Balancing",
    options: NodeOptions = {}
  ) {
    super(id, label, "loadbalancing", {
      category: "Networking",
      description: "High-performance, scalable load balancing",
      ...options,
    });
  }
}

/**
 * Google Virtual Private Cloud service node
 */
export class VPC extends GCPNode {
  constructor(id: string, label: string = "VPC", options: NodeOptions = {}) {
    super(id, label, "vpc", {
      category: "Networking",
      description: "Global, scalable, and flexible virtual network",
      ...options,
    });
  }
}

/**
 * Google Firestore service node
 */
export class Firestore extends GCPNode {
  constructor(
    id: string,
    label: string = "Firestore",
    options: NodeOptions = {}
  ) {
    super(id, label, "firestore", {
      category: "Database",
      description: "NoSQL document database built for automatic scaling",
      ...options,
    });
  }
}

/**
 * Google Pub/Sub service node
 */
export class PubSub extends GCPNode {
  constructor(
    id: string,
    label: string = "Pub/Sub",
    options: NodeOptions = {}
  ) {
    super(id, label, "pubsub", {
      category: "Analytics",
      description: "Messaging and ingestion for event-driven systems",
      ...options,
    });
  }
}

/**
 * Google Cloud Run service node
 */
export class CloudRun extends GCPNode {
  constructor(
    id: string,
    label: string = "Cloud Run",
    options: NodeOptions = {}
  ) {
    super(id, label, "cloudrun", {
      category: "Compute",
      description: "Fully managed serverless platform",
      ...options,
    });
  }
}

/**
 * Google Kubernetes Engine service node
 */
export class GKE extends GCPNode {
  constructor(id: string, label: string = "GKE", options: NodeOptions = {}) {
    super(id, label, "gke", {
      category: "Compute",
      description: "Managed Kubernetes service",
      ...options,
    });
  }
}

/**
 * Google Cloud Monitoring service node
 */
export class CloudMonitoring extends GCPNode {
  constructor(
    id: string,
    label: string = "Cloud Monitoring",
    options: NodeOptions = {}
  ) {
    super(id, label, "cloudmonitoring", {
      category: "Operations",
      description:
        "Visibility into the performance and health of your applications",
      ...options,
    });
  }
}
