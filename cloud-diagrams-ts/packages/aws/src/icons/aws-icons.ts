import type { IconPack, AWSIconSet } from '@cloud-diagrams/core';

// AWS Official SVG Icons - Based on AWS Architecture Icons
// Source: https://aws.amazon.com/architecture/icons/
// These are simplified representations for demo purposes
// In production, these would be loaded from the official AWS icon set

const awsIcons: AWSIconSet = {
  // Compute Services
  ec2: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <defs>
        <style>
          .a { fill: #f58536; }
          .b { fill: #9d5025; }
          .c { fill: #fff; }
        </style>
      </defs>
      <rect class="a" width="80" height="80"/>
      <rect class="b" x="0" y="61.6" width="80" height="18.4"/>
      <rect class="c" x="13.6" y="13.6" width="52.8" height="39.2"/>
      <rect class="a" x="20.8" y="20.8" width="38.4" height="24.8"/>
      <circle class="c" cx="40" cy="33.2" r="4"/>
      <rect class="c" x="15.2" y="56.8" width="49.6" height="2.4"/>
      <text x="40" y="72" text-anchor="middle" class="c" font-family="Arial" font-size="8">EC2</text>
    </svg>`,
    categories: ['compute'],
    variants: {
      light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
        <rect fill="#f58536" width="80" height="80"/>
        <rect fill="#9d5025" x="0" y="61.6" width="80" height="18.4"/>
        <rect fill="#fff" x="13.6" y="13.6" width="52.8" height="39.2"/>
        <rect fill="#f58536" x="20.8" y="20.8" width="38.4" height="24.8"/>
        <circle fill="#fff" cx="40" cy="33.2" r="4"/>
        <rect fill="#fff" x="15.2" y="56.8" width="49.6" height="2.4"/>
        <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="8">EC2</text>
      </svg>`,
      dark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
        <rect fill="#f58536" width="80" height="80"/>
        <rect fill="#2a2a2a" x="0" y="61.6" width="80" height="18.4"/>
        <rect fill="#333" x="13.6" y="13.6" width="52.8" height="39.2"/>
        <rect fill="#f58536" x="20.8" y="20.8" width="38.4" height="24.8"/>
        <circle fill="#fff" cx="40" cy="33.2" r="4"/>
        <rect fill="#fff" x="15.2" y="56.8" width="49.6" height="2.4"/>
        <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="8">EC2</text>
      </svg>`,
    },
    metadata: {
      name: 'Amazon EC2',
      description: 'Amazon Elastic Compute Cloud virtual servers',
      tags: ['compute', 'virtual machine', 'instance'],
      size: { width: 80, height: 80 },
    },
  },

  lambda: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <defs>
        <style>
          .a { fill: #f58536; }
          .b { fill: #9d5025; }
          .c { fill: #fff; }
        </style>
      </defs>
      <rect class="a" width="80" height="80"/>
      <rect class="b" x="0" y="61.6" width="80" height="18.4"/>
      <path class="c" d="M20,20 L30,45 L40,20 L50,20 L35,50 L45,50 L60,20 L50,20 M25,50 L35,50"/>
      <text x="40" y="72" text-anchor="middle" class="c" font-family="Arial" font-size="7">Lambda</text>
    </svg>`,
    categories: ['compute', 'serverless'],
    metadata: {
      name: 'AWS Lambda',
      description: 'AWS Lambda serverless compute service',
      tags: ['serverless', 'function', 'compute'],
      size: { width: 80, height: 80 },
    },
  },

  ecs: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#f58536" width="80" height="80"/>
      <rect fill="#9d5025" x="0" y="61.6" width="80" height="18.4"/>
      <rect fill="#fff" x="15" y="15" width="50" height="35" rx="3"/>
      <rect fill="#f58536" x="20" y="20" width="15" height="10" rx="2"/>
      <rect fill="#f58536" x="40" y="20" width="15" height="10" rx="2"/>
      <rect fill="#f58536" x="20" y="35" width="15" height="10" rx="2"/>
      <rect fill="#f58536" x="40" y="35" width="15" height="10" rx="2"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="8">ECS</text>
    </svg>`,
    categories: ['compute', 'containers'],
    metadata: {
      name: 'Amazon ECS',
      description: 'Amazon Elastic Container Service',
      tags: ['containers', 'docker', 'orchestration'],
      size: { width: 80, height: 80 },
    },
  },

  // Database Services
  rds: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#3c4b99" width="80" height="80"/>
      <rect fill="#2a2a2a" x="0" y="61.6" width="80" height="18.4"/>
      <ellipse fill="#fff" cx="40" cy="25" rx="25" ry="8"/>
      <rect fill="#fff" x="15" y="25" width="50" height="20"/>
      <ellipse fill="#3c4b99" cx="40" cy="25" rx="20" ry="6"/>
      <ellipse fill="#3c4b99" cx="40" cy="35" rx="20" ry="6"/>
      <ellipse fill="#fff" cx="40" cy="45" rx="25" ry="8"/>
      <ellipse fill="#3c4b99" cx="40" cy="45" rx="20" ry="6"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="8">RDS</text>
    </svg>`,
    categories: ['database'],
    metadata: {
      name: 'Amazon RDS',
      description: 'Amazon Relational Database Service',
      tags: ['database', 'sql', 'relational'],
      size: { width: 80, height: 80 },
    },
  },

  dynamodb: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#3c4b99" width="80" height="80"/>
      <rect fill="#2a2a2a" x="0" y="61.6" width="80" height="18.4"/>
      <circle fill="#fff" cx="30" cy="25" r="8"/>
      <circle fill="#fff" cx="50" cy="25" r="8"/>
      <circle fill="#fff" cx="30" cy="45" r="8"/>
      <circle fill="#fff" cx="50" cy="45" r="8"/>
      <line stroke="#fff" stroke-width="2" x1="38" y1="25" x2="42" y2="25"/>
      <line stroke="#fff" stroke-width="2" x1="30" y1="33" x2="30" y2="37"/>
      <line stroke="#fff" stroke-width="2" x1="50" y1="33" x2="50" y2="37"/>
      <line stroke="#fff" stroke-width="2" x1="38" y1="45" x2="42" y2="45"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="6">DynamoDB</text>
    </svg>`,
    categories: ['database'],
    metadata: {
      name: 'Amazon DynamoDB',
      description: 'Amazon DynamoDB NoSQL database service',
      tags: ['database', 'nosql', 'key-value'],
      size: { width: 80, height: 80 },
    },
  },

  // Storage Services
  s3: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#3f9c59" width="80" height="80"/>
      <rect fill="#2a2a2a" x="0" y="61.6" width="80" height="18.4"/>
      <path fill="#fff" d="M20,20 L60,20 L55,35 L65,35 L60,50 L20,50 Z"/>
      <circle fill="#3f9c59" cx="35" cy="30" r="4"/>
      <circle fill="#3f9c59" cx="45" cy="40" r="4"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="8">S3</text>
    </svg>`,
    categories: ['storage'],
    metadata: {
      name: 'Amazon S3',
      description: 'Amazon Simple Storage Service',
      tags: ['storage', 'object storage', 'bucket'],
      size: { width: 80, height: 80 },
    },
  },

  // Network Services
  vpc: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#8c4fff" width="80" height="80"/>
      <rect fill="#2a2a2a" x="0" y="61.6" width="80" height="18.4"/>
      <rect fill="none" stroke="#fff" stroke-width="3" x="15" y="15" width="50" height="35" rx="5"/>
      <circle fill="#fff" cx="25" cy="25" r="3"/>
      <circle fill="#fff" cx="35" cy="25" r="3"/>
      <circle fill="#fff" cx="45" cy="25" r="3"/>
      <circle fill="#fff" cx="55" cy="25" r="3"/>
      <line stroke="#fff" stroke-width="2" x1="25" y1="35" x2="55" y2="35"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="8">VPC</text>
    </svg>`,
    categories: ['network'],
    metadata: {
      name: 'Amazon VPC',
      description: 'Amazon Virtual Private Cloud',
      tags: ['network', 'vpc', 'private cloud'],
      size: { width: 80, height: 80 },
    },
  },

  route53: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#8c4fff" width="80" height="80"/>
      <rect fill="#2a2a2a" x="0" y="61.6" width="80" height="18.4"/>
      <circle fill="none" stroke="#fff" stroke-width="3" cx="40" cy="35" r="20"/>
      <circle fill="#fff" cx="40" cy="20" r="3"/>
      <circle fill="#fff" cx="40" cy="50" r="3"/>
      <circle fill="#fff" cx="25" cy="35" r="3"/>
      <circle fill="#fff" cx="55" cy="35" r="3"/>
      <circle fill="#fff" cx="40" cy="35" r="5"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="6">Route 53</text>
    </svg>`,
    categories: ['network'],
    metadata: {
      name: 'Amazon Route 53',
      description: 'Amazon Route 53 DNS service',
      tags: ['network', 'dns', 'routing'],
      size: { width: 80, height: 80 },
    },
  },
};

export const awsIconPack: IconPack = {
  provider: 'aws',
  version: '2024.1',
  icons: awsIcons as any, // Type assertion to handle interface compatibility
  metadata: {
    name: 'AWS Architecture Icons',
    description: 'Official AWS architecture icons for cloud diagrams',
    sourceUrl: 'https://aws.amazon.com/architecture/icons/',
    license: 'AWS Icon License - Permitted for architecture diagrams',
    lastUpdated: '2024-01-31',
  },
};
