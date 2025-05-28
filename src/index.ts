/**
 * @kloud-diagramming/core
 * A complete Mingrammer-style cloud architecture diagramming library
 *
 * @author Kloud Diagramming Team
 * @license MIT
 */

// Core classes
export { Diagram } from "./core/Diagram";
export { Node } from "./core/Node";
export { Edge, EdgeBuilder } from "./core/Edge";
export { Cluster } from "./core/Cluster";
export { Group } from "./core/Group";

// Renderers
export { CloudDiagramsD3Renderer } from "./renderers/D3Renderer";

// Node factories
export { AWSNode, AzureNode, GCPNode } from "./nodes/CloudNodes";

// Service shortcuts - AWS
export {
  EC2,
  S3,
  Lambda,
  RDS,
  ELB,
  VPC,
  CloudFront,
  APIGateway,
  DynamoDB,
  SNS,
  SQS,
  CloudWatch,
} from "./nodes/aws/AWSServices";

// Service shortcuts - Azure
export {
  VirtualMachine,
  BlobStorage,
  SQLDatabase,
  FunctionApps,
  AppService,
  ApplicationGateway,
  VirtualNetwork,
  CosmosDB,
  ServiceBus,
  KeyVault,
  Monitor,
  ContainerInstances,
} from "./nodes/azure/AzureServices";

// Service shortcuts - GCP
export {
  ComputeEngine,
  CloudStorage,
  CloudSQL,
  CloudFunctions,
  AppEngine,
  LoadBalancing,
  VPC as GCPVPC,
  Firestore,
  PubSub,
  CloudRun,
  GKE,
  CloudMonitoring,
} from "./nodes/gcp/GCPServices";

// Icon registries
export { createIconRegistry, IconRegistryImpl } from "./icons/IconRegistry";
export {
  awsIcons,
  loadAwsIcons,
  getAwsIconCount,
  areAwsIconsLoaded,
} from "./icons/aws";
export {
  azureIcons,
  loadAzureIcons,
  getAzureIconCount,
  areAzureIconsLoaded,
} from "./icons/azure";
export {
  gcpIcons,
  loadGcpIcons,
  getGcpIconCount,
  areGcpIconsLoaded,
} from "./icons/gcp";

// Utilities
export {
  generateId,
  deepMerge,
  isValidProvider,
  normalizeServiceName,
  getProviderColor,
} from "./utils/helpers";

// Types
export type {
  DiagramConfig,
  NodeOptions,
  EdgeOptions,
  ClusterOptions,
  RenderOptions,
  IconRegistry,
  IconData,
  IconMetadata,
  CloudProvider,
  DiagramStatistics,
  ClusterStatistics,
  DiagramModel,
  ValidationResult,
  ExportOptions,
  DiagramEvent,
  DiagramEventType,
  DiagramPlugin,
  PluginOptions,
} from "./types";

// Default export for convenience
export { Diagram as default } from "./core/Diagram";
