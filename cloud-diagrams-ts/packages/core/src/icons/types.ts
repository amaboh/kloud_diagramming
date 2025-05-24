export interface IconDefinition {
  svg: string;
  categories: string[];
  variants?: {
    dark?: string;
    light?: string;
    colored?: string;
  };
  metadata?: {
    name: string;
    description?: string;
    tags?: string[];
    size?: {
      width: number;
      height: number;
    };
  };
}

export interface IconSet {
  [service: string]: IconDefinition | undefined;
}

export interface IconPack {
  provider: string;
  version: string;
  icons?: IconSet;
  loadIcons?: () => Promise<IconSet>;
  metadata?: {
    name: string;
    description?: string;
    sourceUrl?: string;
    license?: string;
    lastUpdated?: string;
  };
}

export interface IconTheme {
  name: string;
  variants: ('light' | 'dark' | 'colored')[];
  default: 'light' | 'dark' | 'colored';
}

export interface IconProviderConfig {
  provider: string;
  baseUrl?: string;
  theme?: IconTheme;
  lazyLoad?: boolean;
}

// AWS-specific types
export interface AWSIconSet {
  // Compute
  ec2?: IconDefinition;
  lambda?: IconDefinition;
  ecs?: IconDefinition;
  eks?: IconDefinition;
  fargate?: IconDefinition;

  // Database
  rds?: IconDefinition;
  dynamodb?: IconDefinition;
  redshift?: IconDefinition;
  documentdb?: IconDefinition;

  // Storage
  s3?: IconDefinition;
  efs?: IconDefinition;
  ebs?: IconDefinition;
  glacier?: IconDefinition;

  // Network
  vpc?: IconDefinition;
  route53?: IconDefinition;
  cloudfront?: IconDefinition;
  elb?: IconDefinition;
  apigateway?: IconDefinition;

  // Allow additional services
  [service: string]: IconDefinition | undefined;
}

// Azure-specific types
export interface AzureIconSet {
  // Compute
  vm?: IconDefinition;
  functions?: IconDefinition;
  containerinstances?: IconDefinition;
  aks?: IconDefinition;

  // Database
  sqldb?: IconDefinition;
  cosmosdb?: IconDefinition;

  // Storage
  storage?: IconDefinition;
  blobstorage?: IconDefinition;

  // Network
  vnet?: IconDefinition;
  dns?: IconDefinition;
  cdn?: IconDefinition;
  loadbalancer?: IconDefinition;

  // Allow additional services
  [service: string]: IconDefinition | undefined;
}

// GCP-specific types
export interface GCPIconSet {
  // Compute
  computeengine?: IconDefinition;
  cloudfunctions?: IconDefinition;
  gke?: IconDefinition;
  cloudrun?: IconDefinition;

  // Database
  cloudsql?: IconDefinition;
  firestore?: IconDefinition;
  bigtable?: IconDefinition;

  // Storage
  cloudstorage?: IconDefinition;

  // Network
  vpc?: IconDefinition;
  dns?: IconDefinition;
  cdn?: IconDefinition;
  loadbalancer?: IconDefinition;

  // Allow additional services
  [service: string]: IconDefinition | undefined;
}
