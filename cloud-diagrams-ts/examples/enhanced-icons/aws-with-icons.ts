import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS, S3, Lambda, DynamoDB, VPCGroup } from '@cloud-diagrams/aws';
import { iconRegistry } from '@cloud-diagrams/core';

/**
 * Enhanced AWS Architecture Example with Advanced Layout & Groups
 *
 * This example demonstrates:
 * 1. Advanced group management with proper node assignment
 * 2. Nested groups (VPC → Subnets → Availability Zones)
 * 3. Enhanced layout options and positioning
 * 4. Professional AWS service icons
 * 5. Interactive group visualization
 */

async function createAdvancedAwsDiagram() {
  console.log('🚀 Creating Advanced AWS Architecture with Enhanced Groups...');

  // Create main diagram with advanced layout options
  const diagram = new Diagram(
    'Advanced AWS Multi-Tier Architecture',
    {
      direction: 'LR',
      theme: 'default',
    },
    {
      algorithm: 'hierarchical',
      spacing: {
        node: 60,
        group: 100,
        level: 150,
      },
      alignment: 'center',
    }
  );

  // Create VPC group with AWS-specific styling
  const vpc = diagram.addGroup(
    'Production VPC',
    undefined,
    {
      description: 'Main production VPC with multi-AZ deployment',
      style: 'vpc',
      color: '#232F3E',
    },
    {
      direction: 'LR',
      spacing: 80,
      padding: 30,
    }
  );

  // Create Public Subnet group
  const publicSubnet = diagram.addGroup(
    'Public Subnet',
    undefined,
    {
      description: 'Public subnet for web tier',
      style: 'subnet',
      color: '#FF9900',
    },
    {
      direction: 'TB',
      spacing: 40,
    }
  );

  // Create Private Subnet group
  const privateSubnet = diagram.addGroup(
    'Private Subnet',
    undefined,
    {
      description: 'Private subnet for application tier',
      style: 'subnet',
      color: '#146EB4',
    },
    {
      direction: 'TB',
      spacing: 40,
    }
  );

  // Create Database Subnet group
  const dbSubnet = diagram.addGroup(
    'Database Subnet',
    undefined,
    {
      description: 'Database subnet for data tier',
      style: 'subnet',
      color: '#9D5025',
    },
    {
      direction: 'TB',
      spacing: 40,
    }
  );

  // Add nested Availability Zone groups
  const az1 = diagram.createNestedGroup(publicSubnet.id, 'AZ-1a', {
    description: 'Availability Zone 1a',
    style: 'availability-zone',
  });

  const az2 = diagram.createNestedGroup(publicSubnet.id, 'AZ-1b', {
    description: 'Availability Zone 1b',
    style: 'availability-zone',
  });

  // Create web tier resources in different AZs
  const webServer1 = az1.addNode(
    new EC2('web-server-1', {
      instanceType: 't3.medium',
      metadata: {
        description: 'Primary web server in AZ-1a',
        url: 'https://console.aws.amazon.com/ec2/',
        environment: 'production',
        availabilityZone: 'us-east-1a',
      },
    })
  );

  const webServer2 = az2.addNode(
    new EC2('web-server-2', {
      instanceType: 't3.medium',
      metadata: {
        description: 'Secondary web server in AZ-1b',
        url: 'https://console.aws.amazon.com/ec2/',
        environment: 'production',
        availabilityZone: 'us-east-1b',
      },
    })
  );

  // Create application tier in private subnet
  const apiLambda1 = privateSubnet.addNode(
    new Lambda('api-gateway-lambda', {
      runtime: 'nodejs18.x',
      memorySize: 512,
      metadata: {
        description: 'Main API processing Lambda function',
        url: 'https://console.aws.amazon.com/lambda/',
        handler: 'index.handler',
      },
    })
  );

  const authLambda = privateSubnet.addNode(
    new Lambda('auth-lambda', {
      runtime: 'nodejs18.x',
      memorySize: 256,
      metadata: {
        description: 'Authentication service Lambda',
        url: 'https://console.aws.amazon.com/lambda/',
        handler: 'auth.handler',
      },
    })
  );

  // Create data tier in database subnet
  const userDb = dbSubnet.addNode(
    new RDS('user-database', {
      engine: 'postgresql',
      instanceClass: 'db.t3.micro',
      multiAZ: true,
      metadata: {
        description: 'Primary user database with Multi-AZ',
        url: 'https://console.aws.amazon.com/rds/',
        port: 5432,
      },
    })
  );

  const sessionStore = dbSubnet.addNode(
    new DynamoDB('session-store', {
      billingMode: 'PAY_PER_REQUEST',
      metadata: {
        description: 'User session and state storage',
        url: 'https://console.aws.amazon.com/dynamodb/',
        readCapacity: 'auto',
        writeCapacity: 'auto',
      },
    })
  );

  // Create external storage (outside VPC)
  const assetsBucket = diagram.addNode(
    new S3('assets-bucket', {
      bucketName: 'my-app-assets-prod',
      versioning: true,
      metadata: {
        description: 'Static assets and user uploads with versioning',
        url: 'https://console.aws.amazon.com/s3/',
        region: 'us-east-1',
      },
    })
  );

  const backupBucket = diagram.addNode(
    new S3('backup-bucket', {
      bucketName: 'my-app-backups-prod',
      storageClass: 'GLACIER',
      metadata: {
        description: 'Database backups and archival storage',
        url: 'https://console.aws.amazon.com/s3/',
        region: 'us-east-1',
      },
    })
  );

  // Define enhanced connections with metadata
  diagram.connect(webServer1, apiLambda1, {
    label: 'HTTPS API',
    style: 'solid',
    metadata: {
      protocol: 'HTTPS',
      port: 443,
      description: 'Load balanced API calls',
    },
  });

  diagram.connect(webServer2, apiLambda1, {
    label: 'HTTPS API',
    style: 'solid',
    metadata: {
      protocol: 'HTTPS',
      port: 443,
      description: 'Load balanced API calls',
    },
  });

  diagram.connect(apiLambda1, authLambda, {
    label: 'Auth Check',
    style: 'dashed',
    metadata: {
      protocol: 'HTTP',
      description: 'Authentication validation',
    },
  });

  diagram.connect(apiLambda1, userDb, {
    label: 'SQL Queries',
    style: 'solid',
    metadata: {
      protocol: 'PostgreSQL',
      port: 5432,
      encryption: 'TLS',
    },
  });

  diagram.connect(authLambda, sessionStore, {
    label: 'Session Data',
    style: 'solid',
    metadata: {
      protocol: 'DynamoDB API',
      encryption: 'AES-256',
    },
  });

  diagram.connect(webServer1, assetsBucket, {
    label: 'Static Assets',
    style: 'dotted',
    metadata: {
      protocol: 'S3 API',
      description: 'CDN-cached static resources',
    },
  });

  diagram.connect(userDb, backupBucket, {
    label: 'Automated Backups',
    style: 'dashed',
    metadata: {
      protocol: 'S3 API',
      schedule: 'Daily at 2 AM UTC',
    },
  });

  return diagram;
}

/**
 * Demonstrate advanced layout algorithms
 */
async function createLayoutComparisonDiagrams() {
  console.log('🎯 Creating Layout Algorithm Comparison...');

  const baseConfig = {
    direction: 'LR' as const,
    theme: 'default' as const,
  };

  // Auto Layout
  const autoLayoutDiagram = new Diagram('Auto Layout Algorithm', baseConfig, {
    algorithm: 'auto',
    spacing: { node: 50, group: 80 },
  });

  // Hierarchical Layout
  const hierarchicalDiagram = new Diagram(
    'Hierarchical Layout Algorithm',
    baseConfig,
    {
      algorithm: 'hierarchical',
      spacing: { node: 60, group: 100, level: 150 },
      alignment: 'center',
    }
  );

  // Manual Layout with positioning
  const manualDiagram = new Diagram(
    'Manual Layout with Positioning',
    baseConfig,
    {
      algorithm: 'manual',
      spacing: { node: 80, group: 120 },
    }
  );

  // Add the same nodes to each diagram for comparison
  const createSampleNodes = (diagram: any) => {
    const webServer = diagram.addNode(new EC2('web-server'));
    const apiServer = diagram.addNode(new Lambda('api-service'));
    const database = diagram.addNode(new RDS('database'));

    // For manual layout, set specific positions
    if (diagram.layoutOptions.algorithm === 'manual') {
      diagram.positionNode(webServer.id, 100, 100, true);
      diagram.positionNode(apiServer.id, 300, 100, true);
      diagram.positionNode(database.id, 500, 100, true);
    }

    diagram.connect(webServer, apiServer);
    diagram.connect(apiServer, database);
  };

  createSampleNodes(autoLayoutDiagram);
  createSampleNodes(hierarchicalDiagram);
  createSampleNodes(manualDiagram);

  return { autoLayoutDiagram, hierarchicalDiagram, manualDiagram };
}

/**
 * Render advanced diagram with enhanced groups
 */
async function renderAdvancedDiagram() {
  try {
    const diagram = await createAdvancedAwsDiagram();

    console.log('🎨 Rendering advanced diagram with enhanced groups...');

    // Get group statistics
    const stats = diagram.getGroupStatistics();
    console.log('📊 Group Statistics:', {
      totalGroups: stats.totalGroups,
      totalNodes: stats.totalNodes,
      nodesInGroups: stats.nodesInGroups,
      ungroupedNodes: stats.ungroupedNodes,
      maxGroupDepth: stats.maxGroupDepth,
    });

    // Check if we're in a browser environment
    if (typeof document !== 'undefined') {
      // Create container if it doesn't exist
      let container = document.getElementById('advanced-diagram');
      if (!container) {
        container = document.createElement('div');
        container.id = 'advanced-diagram';
        container.style.width = '100%';
        container.style.height = '800px';
        container.style.border = '1px solid #ddd';
        container.style.borderRadius = '8px';
        container.style.padding = '20px';
        container.style.margin = '20px 0';
        document.body.appendChild(container);
      }

      // Render with enhanced options
      await diagram.render(container, {
        theme: 'default',
        interactive: true,
        width: 1400,
        height: 800,
        layoutAlgorithm: 'hierarchical',
      });

      console.log('✅ Advanced diagram rendered successfully!');

      // Add event listener for enhanced node interactions
      container.addEventListener('nodeClick', (event: any) => {
        const { node } = event.detail;
        console.log('🖱️ Enhanced node clicked:', {
          label: node.label,
          provider: node.provider,
          service: node.service,
          groupId: node.groupId,
          metadata: node.metadata,
        });

        // Show detailed node information
        if (node.metadata) {
          const details = [
            `Service: ${node.provider?.toUpperCase()} ${node.service?.toUpperCase()}`,
            `Description: ${node.metadata.description || 'N/A'}`,
            `Environment: ${node.metadata.environment || 'N/A'}`,
            node.metadata.availabilityZone &&
              `AZ: ${node.metadata.availabilityZone}`,
            node.metadata.instanceType &&
              `Instance: ${node.metadata.instanceType}`,
            node.metadata.engine && `Engine: ${node.metadata.engine}`,
          ]
            .filter(Boolean)
            .join('\n');

          alert(`${node.label}\n\n${details}`);
        }

        if (node.metadata?.url) {
          const shouldOpen = confirm(`Open ${node.label} in AWS Console?`);
          if (shouldOpen) {
            window.open(node.metadata.url, '_blank');
          }
        }
      });
    } else {
      console.log(
        '📝 Node.js environment - advanced diagram created successfully'
      );
      console.log('Diagram contains:', stats);
    }

    return diagram;
  } catch (error) {
    console.error('❌ Failed to render advanced diagram:', error);
    throw error;
  }
}

/**
 * Demonstrate layout algorithm comparisons
 */
async function demonstrateLayoutAlgorithms() {
  console.log('🔬 Demonstrating Layout Algorithms...');

  try {
    const { autoLayoutDiagram, hierarchicalDiagram, manualDiagram } =
      await createLayoutComparisonDiagrams();

    if (typeof document !== 'undefined') {
      // Create containers for each layout type
      const createLayoutContainer = (id: string, title: string) => {
        let container = document.getElementById(id);
        if (!container) {
          const wrapper = document.createElement('div');
          wrapper.style.marginBottom = '30px';

          const heading = document.createElement('h3');
          heading.textContent = title;
          heading.style.color = '#667eea';
          heading.style.marginBottom = '10px';

          container = document.createElement('div');
          container.id = id;
          container.style.width = '100%';
          container.style.height = '300px';
          container.style.border = '1px solid #ddd';
          container.style.borderRadius = '8px';
          container.style.padding = '15px';

          wrapper.appendChild(heading);
          wrapper.appendChild(container);
          document.body.appendChild(wrapper);
        }
        return container;
      };

      // Render different layout algorithms
      await autoLayoutDiagram.render(
        createLayoutContainer('auto-layout', '🔄 Auto Layout Algorithm'),
        { theme: 'default', interactive: false, width: 600, height: 250 }
      );

      await hierarchicalDiagram.render(
        createLayoutContainer(
          'hierarchical-layout',
          '📊 Hierarchical Layout Algorithm'
        ),
        { theme: 'default', interactive: false, width: 600, height: 250 }
      );

      await manualDiagram.render(
        createLayoutContainer(
          'manual-layout',
          '🎯 Manual Layout with Positioning'
        ),
        { theme: 'default', interactive: false, width: 600, height: 250 }
      );

      console.log('✅ Layout algorithm demonstration complete!');
    }
  } catch (error) {
    console.error('❌ Layout algorithm demonstration failed:', error);
  }
}

// Export for use in examples
export {
  createAdvancedAwsDiagram,
  createLayoutComparisonDiagrams,
  renderAdvancedDiagram,
  demonstrateLayoutAlgorithms,
};

// Auto-run if in browser environment
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
      await renderAdvancedDiagram();
      await demonstrateLayoutAlgorithms();
    });
  } else {
    // DOM is already ready
    renderAdvancedDiagram()
      .then(() => demonstrateLayoutAlgorithms())
      .catch(console.error);
  }
}
