import { Command } from 'commander';
import chalk from 'chalk';

export const listCommand = new Command('list')
  .description('List available services, icons, or templates')
  .option('-p, --provider <provider>', 'Filter by provider (aws|azure|gcp)')
  .option('-c, --category <category>', 'Filter by service category')
  .option('-s, --services', 'List available services')
  .option('-i, --icons', 'List available icons')
  .option('-t, --templates', 'List available templates')
  .option('--search <term>', 'Search services/icons by name')
  .option('--format <format>', 'Output format (table|json|csv)', 'table')
  .option('--output <file>', 'Save output to file')
  .action(async (options) => {
    try {
      if (options.services) {
        await listServices(options);
      } else if (options.icons) {
        await listIcons(options);
      } else if (options.templates) {
        await listTemplates(options);
      } else {
        // Default: show overview
        await showOverview(options);
      }
    } catch (error: any) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

async function listServices(options: any) {
  console.log(chalk.blue('☁️  Available Cloud Services'));
  console.log(chalk.gray('===============================\n'));

  const services = await getServices(options.provider, options.category);

  if (options.search) {
    const filtered = services.filter(
      (service) =>
        service.name.toLowerCase().includes(options.search.toLowerCase()) ||
        service.description.toLowerCase().includes(options.search.toLowerCase())
    );
    displayServices(filtered, options);
  } else {
    displayServices(services, options);
  }
}

async function listIcons(options: any) {
  console.log(chalk.blue('🎨 Available Icons'));
  console.log(chalk.gray('===================\n'));

  const icons = await getIcons(options.provider);

  if (options.search) {
    const filtered = icons.filter((icon) =>
      icon.name.toLowerCase().includes(options.search.toLowerCase())
    );
    displayIcons(filtered, options);
  } else {
    displayIcons(icons, options);
  }
}

async function listTemplates(options: any) {
  console.log(chalk.blue('🏗️  Available Templates'));
  console.log(chalk.gray('======================\n'));

  const templates = await getTemplates(options.provider);
  displayTemplates(templates, options);
}

async function showOverview(options: any) {
  console.log(chalk.blue('📋 Cloud Diagrams TypeScript CLI'));
  console.log(chalk.gray('==================================\n'));

  console.log(chalk.green('Available Commands:'));
  console.log('  --services    List available cloud services');
  console.log('  --icons       List available icons');
  console.log('  --templates   List project templates\n');

  console.log(chalk.green('Supported Providers:'));
  console.log('  🟠 AWS      - Amazon Web Services (50+ services)');
  console.log('  🔵 Azure    - Microsoft Azure (30+ services)');
  console.log('  🟡 GCP      - Google Cloud Platform (20+ services)');
  console.log('  🌍 Multi    - Multi-cloud architectures\n');

  console.log(chalk.yellow('Examples:'));
  console.log('  cloud-diagrams list --services --provider aws');
  console.log('  cloud-diagrams list --icons --search database');
  console.log('  cloud-diagrams list --templates --provider azure');
}

async function getServices(provider?: string, category?: string) {
  // In a real implementation, this would load from the packages
  const allServices = [
    // AWS Services
    {
      provider: 'aws',
      category: 'compute',
      name: 'EC2',
      className: 'EC2',
      description: 'Elastic Compute Cloud',
    },
    {
      provider: 'aws',
      category: 'compute',
      name: 'Lambda',
      className: 'Lambda',
      description: 'Serverless Functions',
    },
    {
      provider: 'aws',
      category: 'compute',
      name: 'ECS',
      className: 'ECS',
      description: 'Elastic Container Service',
    },
    {
      provider: 'aws',
      category: 'database',
      name: 'RDS',
      className: 'RDS',
      description: 'Relational Database Service',
    },
    {
      provider: 'aws',
      category: 'database',
      name: 'DynamoDB',
      className: 'DynamoDB',
      description: 'NoSQL Database',
    },
    {
      provider: 'aws',
      category: 'storage',
      name: 'S3',
      className: 'S3',
      description: 'Simple Storage Service',
    },
    {
      provider: 'aws',
      category: 'network',
      name: 'VPC',
      className: 'VPC',
      description: 'Virtual Private Cloud',
    },
    {
      provider: 'aws',
      category: 'network',
      name: 'ALB',
      className: 'ALB',
      description: 'Application Load Balancer',
    },

    // Azure Services
    {
      provider: 'azure',
      category: 'compute',
      name: 'Virtual Machines',
      className: 'VirtualMachine',
      description: 'Azure Virtual Machines',
    },
    {
      provider: 'azure',
      category: 'compute',
      name: 'Functions',
      className: 'AzureFunction',
      description: 'Serverless Functions',
    },
    {
      provider: 'azure',
      category: 'database',
      name: 'SQL Database',
      className: 'SQLDatabase',
      description: 'Azure SQL Database',
    },
    {
      provider: 'azure',
      category: 'storage',
      name: 'Blob Storage',
      className: 'BlobStorage',
      description: 'Azure Blob Storage',
    },

    // GCP Services
    {
      provider: 'gcp',
      category: 'compute',
      name: 'Compute Engine',
      className: 'ComputeEngine',
      description: 'Google Compute Engine',
    },
    {
      provider: 'gcp',
      category: 'compute',
      name: 'Cloud Functions',
      className: 'CloudFunction',
      description: 'Serverless Functions',
    },
    {
      provider: 'gcp',
      category: 'database',
      name: 'Cloud SQL',
      className: 'CloudSQL',
      description: 'Managed SQL Database',
    },
    {
      provider: 'gcp',
      category: 'storage',
      name: 'Cloud Storage',
      className: 'CloudStorage',
      description: 'Object Storage',
    },
  ];

  let filtered = allServices;

  if (provider) {
    filtered = filtered.filter((s) => s.provider === provider);
  }

  if (category) {
    filtered = filtered.filter((s) => s.category === category);
  }

  return filtered;
}

async function getIcons(provider?: string) {
  const allIcons = [
    { provider: 'aws', name: 'ec2', size: '80x80', format: 'svg' },
    { provider: 'aws', name: 'lambda', size: '80x80', format: 'svg' },
    { provider: 'aws', name: 'rds', size: '80x80', format: 'svg' },
    { provider: 'aws', name: 's3', size: '80x80', format: 'svg' },
    {
      provider: 'azure',
      name: 'virtual-machine',
      size: '80x80',
      format: 'svg',
    },
    { provider: 'azure', name: 'function', size: '80x80', format: 'svg' },
    { provider: 'gcp', name: 'compute-engine', size: '80x80', format: 'svg' },
    { provider: 'gcp', name: 'cloud-function', size: '80x80', format: 'svg' },
  ];

  return provider ? allIcons.filter((i) => i.provider === provider) : allIcons;
}

async function getTemplates(provider?: string) {
  const allTemplates = [
    {
      name: 'basic',
      provider: 'all',
      description: 'Simple 2-tier architecture',
    },
    {
      name: '3tier',
      provider: 'all',
      description: 'Traditional 3-tier web application',
    },
    {
      name: 'microservices',
      provider: 'all',
      description: 'Microservices architecture with API gateway',
    },
    {
      name: 'pipeline',
      provider: 'all',
      description: 'Data processing pipeline',
    },
    {
      name: 'serverless-aws',
      provider: 'aws',
      description: 'AWS serverless architecture',
    },
    {
      name: 'container-azure',
      provider: 'azure',
      description: 'Azure container architecture',
    },
    { name: 'data-gcp', provider: 'gcp', description: 'GCP data platform' },
  ];

  return provider
    ? allTemplates.filter(
        (t) => t.provider === provider || t.provider === 'all'
      )
    : allTemplates;
}

function displayServices(services: any[], options: any) {
  if (options.format === 'json') {
    console.log(JSON.stringify(services, null, 2));
  } else if (options.format === 'csv') {
    console.log('Provider,Category,Service,Class,Description');
    services.forEach((s) => {
      console.log(
        `${s.provider},${s.category},${s.name},${s.className},${s.description}`
      );
    });
  } else {
    // Table format
    if (services.length === 0) {
      console.log(chalk.yellow('No services found matching the criteria.'));
      return;
    }

    const grouped = services.reduce(
      (acc, service) => {
        const key = `${service.provider.toUpperCase()} ${service.category.charAt(0).toUpperCase() + service.category.slice(1)}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(service);
        return acc;
      },
      {} as Record<string, any[]>
    );

    Object.entries(grouped).forEach(([category, serviceList]) => {
      console.log(chalk.cyan(`\n${category} Services:`));
      console.log(
        '┌─────────────────┬─────────────────────┬──────────────────────────────┐'
      );
      console.log(
        '│ Service         │ Class Name          │ Description                  │'
      );
      console.log(
        '├─────────────────┼─────────────────────┼──────────────────────────────┤'
      );

      serviceList.forEach((service) => {
        const name = service.name.padEnd(15);
        const className = service.className.padEnd(19);
        const description = service.description.padEnd(28);
        console.log(`│ ${name} │ ${className} │ ${description} │`);
      });

      console.log(
        '└─────────────────┴─────────────────────┴──────────────────────────────┘'
      );
    });
  }
}

function displayIcons(icons: any[], options: any) {
  if (options.format === 'json') {
    console.log(JSON.stringify(icons, null, 2));
  } else {
    icons.forEach((icon) => {
      console.log(
        `${icon.provider.toUpperCase().padEnd(8)} ${icon.name.padEnd(20)} ${icon.size.padEnd(10)} ${icon.format}`
      );
    });
  }
}

function displayTemplates(templates: any[], options: any) {
  if (options.format === 'json') {
    console.log(JSON.stringify(templates, null, 2));
  } else {
    templates.forEach((template) => {
      console.log(
        `${template.name.padEnd(15)} ${template.provider.padEnd(8)} ${template.description}`
      );
    });
  }
}
