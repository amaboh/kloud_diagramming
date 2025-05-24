import chalk from "chalk";
import * as AWS from "@cloud-diagrams/aws";
import * as Azure from "@cloud-diagrams/azure";
import * as GCP from "@cloud-diagrams/gcp";

interface ListOptions {
  provider?: "aws" | "azure" | "gcp";
  category?: string;
  icons: boolean;
}

interface ServiceInfo {
  name: string;
  provider: string;
  category: string;
  hasIcon: boolean;
}

export async function listCommand(options: ListOptions) {
  try {
    const services = getAllServices();

    // Filter by provider
    let filteredServices = services;
    if (options.provider) {
      filteredServices = services.filter(
        (s) => s.provider === options.provider
      );
    }

    // Filter by category
    if (options.category) {
      filteredServices = filteredServices.filter((s) =>
        s.category.toLowerCase().includes(options.category.toLowerCase())
      );
    }

    // Group by provider
    const groupedServices = groupByProvider(filteredServices);

    // Display results
    console.log(chalk.blue("Available Cloud Services\n"));

    for (const [provider, providerServices] of Object.entries(
      groupedServices
    )) {
      console.log(
        chalk.green(
          `${provider.toUpperCase()} (${providerServices.length} services)`
        )
      );

      if (options.icons) {
        // Group by category for better organization
        const categories = groupByCategory(providerServices);

        for (const [category, categoryServices] of Object.entries(categories)) {
          console.log(chalk.yellow(`  ${category}:`));

          categoryServices.forEach((service) => {
            const iconStatus = service.hasIcon
              ? chalk.green("✓")
              : chalk.red("✗");
            console.log(`    ${iconStatus} ${service.name}`);
          });
        }
      } else {
        // Simple list
        const categories = groupByCategory(providerServices);

        for (const [category, categoryServices] of Object.entries(categories)) {
          console.log(chalk.yellow(`  ${category}:`));
          console.log(`    ${categoryServices.map((s) => s.name).join(", ")}`);
        }
      }

      console.log(); // Empty line between providers
    }

    // Summary
    const totalServices = filteredServices.length;
    const servicesWithIcons = filteredServices.filter((s) => s.hasIcon).length;

    console.log(chalk.blue("Summary:"));
    console.log(`  Total services: ${totalServices}`);
    console.log(
      `  With icons: ${servicesWithIcons} (${Math.round(
        (servicesWithIcons / totalServices) * 100
      )}%)`
    );
    console.log(`  Without icons: ${totalServices - servicesWithIcons}`);
  } catch (error) {
    console.error(chalk.red("Error:"), error.message);
    process.exit(1);
  }
}

function getAllServices(): ServiceInfo[] {
  const services: ServiceInfo[] = [];

  // AWS Services
  const awsServices = Object.keys(AWS);
  awsServices.forEach((serviceName) => {
    services.push({
      name: serviceName,
      provider: "aws",
      category: categorizeAWSService(serviceName),
      hasIcon: true, // Assume all AWS services have icons for now
    });
  });

  // Azure Services
  const azureServices = Object.keys(Azure);
  azureServices.forEach((serviceName) => {
    services.push({
      name: serviceName,
      provider: "azure",
      category: categorizeAzureService(serviceName),
      hasIcon: true, // Assume all Azure services have icons for now
    });
  });

  // GCP Services
  const gcpServices = Object.keys(GCP);
  gcpServices.forEach((serviceName) => {
    services.push({
      name: serviceName,
      provider: "gcp",
      category: categorizeGCPService(serviceName),
      hasIcon: true, // Assume all GCP services have icons for now
    });
  });

  return services;
}

function groupByProvider(
  services: ServiceInfo[]
): Record<string, ServiceInfo[]> {
  return services.reduce((acc, service) => {
    if (!acc[service.provider]) {
      acc[service.provider] = [];
    }
    acc[service.provider].push(service);
    return acc;
  }, {} as Record<string, ServiceInfo[]>);
}

function groupByCategory(
  services: ServiceInfo[]
): Record<string, ServiceInfo[]> {
  return services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, ServiceInfo[]>);
}

function categorizeAWSService(serviceName: string): string {
  const computeServices = ["EC2", "Lambda", "ECS", "EKS", "Fargate", "Batch"];
  const storageServices = ["S3", "EBS", "EFS", "FSx"];
  const databaseServices = [
    "RDS",
    "DynamoDB",
    "ElastiCache",
    "DocumentDB",
    "Neptune",
  ];
  const networkingServices = [
    "VPC",
    "CloudFront",
    "Route53",
    "ELB",
    "ALB",
    "NLB",
  ];
  const securityServices = ["IAM", "Cognito", "KMS", "WAF", "Shield"];
  const analyticsServices = [
    "Redshift",
    "EMR",
    "Kinesis",
    "Athena",
    "QuickSight",
  ];

  if (computeServices.includes(serviceName)) return "Compute";
  if (storageServices.includes(serviceName)) return "Storage";
  if (databaseServices.includes(serviceName)) return "Database";
  if (networkingServices.includes(serviceName)) return "Networking";
  if (securityServices.includes(serviceName)) return "Security";
  if (analyticsServices.includes(serviceName)) return "Analytics";

  return "Other";
}

function categorizeAzureService(serviceName: string): string {
  const computeServices = [
    "VirtualMachine",
    "AppService",
    "Functions",
    "ContainerInstances",
    "AKS",
  ];
  const storageServices = [
    "StorageAccount",
    "BlobStorage",
    "FileStorage",
    "DiskStorage",
  ];
  const databaseServices = ["SQLDatabase", "CosmosDB", "PostgreSQL", "MySQL"];
  const networkingServices = [
    "VirtualNetwork",
    "LoadBalancer",
    "ApplicationGateway",
    "CDN",
  ];
  const securityServices = ["ActiveDirectory", "KeyVault", "SecurityCenter"];
  const analyticsServices = [
    "Synapse",
    "DataFactory",
    "StreamAnalytics",
    "PowerBI",
  ];

  if (computeServices.includes(serviceName)) return "Compute";
  if (storageServices.includes(serviceName)) return "Storage";
  if (databaseServices.includes(serviceName)) return "Database";
  if (networkingServices.includes(serviceName)) return "Networking";
  if (securityServices.includes(serviceName)) return "Security";
  if (analyticsServices.includes(serviceName)) return "Analytics";

  return "Other";
}

function categorizeGCPService(serviceName: string): string {
  const computeServices = [
    "ComputeEngine",
    "CloudFunctions",
    "CloudRun",
    "GKE",
    "AppEngine",
  ];
  const storageServices = ["CloudStorage", "PersistentDisk", "Filestore"];
  const databaseServices = ["CloudSQL", "Firestore", "BigTable", "Spanner"];
  const networkingServices = [
    "VPC",
    "CloudLoadBalancing",
    "CloudCDN",
    "CloudDNS",
  ];
  const securityServices = ["IAM", "CloudKMS", "SecurityCommandCenter"];
  const analyticsServices = ["BigQuery", "Dataflow", "Dataproc", "DataStudio"];

  if (computeServices.includes(serviceName)) return "Compute";
  if (storageServices.includes(serviceName)) return "Storage";
  if (databaseServices.includes(serviceName)) return "Database";
  if (networkingServices.includes(serviceName)) return "Networking";
  if (securityServices.includes(serviceName)) return "Security";
  if (analyticsServices.includes(serviceName)) return "Analytics";

  return "Other";
}
