import { AzureNode } from "../CloudNodes";
import { NodeOptions } from "../../types";

/**
 * Azure Virtual Machine service node
 */
export class VirtualMachine extends AzureNode {
  constructor(
    id: string,
    label: string = "Virtual Machine",
    options: NodeOptions = {}
  ) {
    super(id, label, "virtualmachine", {
      category: "Compute",
      description: "Windows and Linux virtual machines",
      ...options,
    });
  }
}

/**
 * Azure Blob Storage service node
 */
export class BlobStorage extends AzureNode {
  constructor(
    id: string,
    label: string = "Blob Storage",
    options: NodeOptions = {}
  ) {
    super(id, label, "blobstorage", {
      category: "Storage",
      description: "REST-based object storage for unstructured data",
      ...options,
    });
  }
}

/**
 * Azure Function Apps service node
 */
export class FunctionApps extends AzureNode {
  constructor(
    id: string,
    label: string = "Function Apps",
    options: NodeOptions = {}
  ) {
    super(id, label, "functionapps", {
      category: "Compute",
      description: "Event-driven serverless compute platform",
      ...options,
    });
  }
}

/**
 * Azure SQL Database service node
 */
export class SQLDatabase extends AzureNode {
  constructor(
    id: string,
    label: string = "SQL Database",
    options: NodeOptions = {}
  ) {
    super(id, label, "sqldatabase", {
      category: "Database",
      description: "Managed relational SQL Database-as-a-Service",
      ...options,
    });
  }
}

/**
 * Azure App Service service node
 */
export class AppService extends AzureNode {
  constructor(
    id: string,
    label: string = "App Service",
    options: NodeOptions = {}
  ) {
    super(id, label, "appservice", {
      category: "Compute",
      description: "Quickly build, deploy, and scale web apps",
      ...options,
    });
  }
}

/**
 * Azure Application Gateway service node
 */
export class ApplicationGateway extends AzureNode {
  constructor(
    id: string,
    label: string = "Application Gateway",
    options: NodeOptions = {}
  ) {
    super(id, label, "applicationgateway", {
      category: "Networking",
      description: "Web traffic load balancer",
      ...options,
    });
  }
}

/**
 * Azure Virtual Network service node
 */
export class VirtualNetwork extends AzureNode {
  constructor(
    id: string,
    label: string = "Virtual Network",
    options: NodeOptions = {}
  ) {
    super(id, label, "virtualnetwork", {
      category: "Networking",
      description: "Private network in Azure",
      ...options,
    });
  }
}

/**
 * Azure Cosmos DB service node
 */
export class CosmosDB extends AzureNode {
  constructor(
    id: string,
    label: string = "Cosmos DB",
    options: NodeOptions = {}
  ) {
    super(id, label, "cosmosdb", {
      category: "Database",
      description: "Globally distributed, multi-model database service",
      ...options,
    });
  }
}

/**
 * Azure Service Bus service node
 */
export class ServiceBus extends AzureNode {
  constructor(
    id: string,
    label: string = "Service Bus",
    options: NodeOptions = {}
  ) {
    super(id, label, "servicebus", {
      category: "Integration",
      description: "Reliable cloud messaging as a service",
      ...options,
    });
  }
}

/**
 * Azure Key Vault service node
 */
export class KeyVault extends AzureNode {
  constructor(
    id: string,
    label: string = "Key Vault",
    options: NodeOptions = {}
  ) {
    super(id, label, "keyvault", {
      category: "Security",
      description: "Safeguard and maintain control of keys and secrets",
      ...options,
    });
  }
}

/**
 * Azure Monitor service node
 */
export class Monitor extends AzureNode {
  constructor(
    id: string,
    label: string = "Monitor",
    options: NodeOptions = {}
  ) {
    super(id, label, "monitor", {
      category: "Management",
      description:
        "Full observability into your applications and infrastructure",
      ...options,
    });
  }
}

/**
 * Azure Container Instances service node
 */
export class ContainerInstances extends AzureNode {
  constructor(
    id: string,
    label: string = "Container Instances",
    options: NodeOptions = {}
  ) {
    super(id, label, "containerinstances", {
      category: "Containers",
      description: "Run containers without managing servers",
      ...options,
    });
  }
}
