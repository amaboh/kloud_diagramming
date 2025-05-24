import type { IconPack, AzureIconSet } from '@cloud-diagrams/core';

// Azure Official SVG Icons - Based on Azure Architecture Icons
// Source: https://docs.microsoft.com/en-us/azure/architecture/icons/
// These are simplified representations for demo purposes
// In production, these would be loaded from the official Azure icon set

const azureIcons: AzureIconSet = {
  // Compute Services
  'virtual-machine': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <defs>
        <style>
          .a { fill: #0078d4; }
          .b { fill: #005a9e; }
          .c { fill: #fff; }
        </style>
      </defs>
      <rect class="a" width="80" height="80"/>
      <rect class="b" x="0" y="61.6" width="80" height="18.4"/>
      <rect class="c" x="13.6" y="13.6" width="52.8" height="39.2"/>
      <rect class="a" x="20.8" y="20.8" width="38.4" height="24.8"/>
      <circle class="c" cx="40" cy="33.2" r="4"/>
      <rect class="c" x="15.2" y="56.8" width="49.6" height="2.4"/>
      <text x="40" y="72" text-anchor="middle" class="c" font-family="Arial" font-size="7">VM</text>
    </svg>`,
    categories: ['compute'],
    variants: {
      light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
        <rect fill="#0078d4" width="80" height="80"/>
        <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
        <rect fill="#fff" x="13.6" y="13.6" width="52.8" height="39.2"/>
        <rect fill="#0078d4" x="20.8" y="20.8" width="38.4" height="24.8"/>
        <circle fill="#fff" cx="40" cy="33.2" r="4"/>
        <rect fill="#fff" x="15.2" y="56.8" width="49.6" height="2.4"/>
        <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="7">VM</text>
      </svg>`,
      dark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
        <rect fill="#0078d4" width="80" height="80"/>
        <rect fill="#2a2a2a" x="0" y="61.6" width="80" height="18.4"/>
        <rect fill="#333" x="13.6" y="13.6" width="52.8" height="39.2"/>
        <rect fill="#0078d4" x="20.8" y="20.8" width="38.4" height="24.8"/>
        <circle fill="#fff" cx="40" cy="33.2" r="4"/>
        <rect fill="#fff" x="15.2" y="56.8" width="49.6" height="2.4"/>
        <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="7">VM</text>
      </svg>`,
    },
    metadata: {
      name: 'Azure Virtual Machine',
      description: 'Azure Virtual Machine compute service',
      tags: ['compute', 'virtual machine', 'vm'],
      size: { width: 80, height: 80 },
    },
  },

  'function-app': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <path fill="#fff" d="M25,20 L30,35 L35,20 L45,20 L40,35 L45,50 L35,50 L30,35 L25,50 L15,50 L20,35 L15,20 Z"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="6">Functions</text>
    </svg>`,
    categories: ['compute', 'serverless'],
    metadata: {
      name: 'Azure Functions',
      description: 'Azure Functions serverless compute service',
      tags: ['serverless', 'function', 'compute'],
      size: { width: 80, height: 80 },
    },
  },

  'container-instance': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <rect fill="#fff" x="15" y="15" width="50" height="35" rx="3"/>
      <rect fill="#0078d4" x="20" y="20" width="15" height="10" rx="2"/>
      <rect fill="#0078d4" x="40" y="20" width="15" height="10" rx="2"/>
      <rect fill="#0078d4" x="20" y="35" width="15" height="10" rx="2"/>
      <rect fill="#0078d4" x="40" y="35" width="15" height="10" rx="2"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="7">ACI</text>
    </svg>`,
    categories: ['compute', 'containers'],
    metadata: {
      name: 'Azure Container Instances',
      description: 'Azure Container Instances',
      tags: ['containers', 'docker', 'aci'],
      size: { width: 80, height: 80 },
    },
  },

  'kubernetes-service': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <circle fill="#fff" cx="40" cy="35" r="15"/>
      <path fill="#0078d4" d="M40,25 L45,30 L40,35 L35,30 Z"/>
      <circle fill="#0078d4" cx="30" cy="30" r="3"/>
      <circle fill="#0078d4" cx="50" cy="30" r="3"/>
      <circle fill="#0078d4" cx="30" cy="40" r="3"/>
      <circle fill="#0078d4" cx="50" cy="40" r="3"/>
      <circle fill="#0078d4" cx="40" cy="45" r="3"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="7">AKS</text>
    </svg>`,
    categories: ['compute', 'containers'],
    metadata: {
      name: 'Azure Kubernetes Service',
      description: 'Azure Kubernetes Service',
      tags: ['kubernetes', 'containers', 'orchestration'],
      size: { width: 80, height: 80 },
    },
  },

  // Database Services
  'sql-database': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <ellipse fill="#fff" cx="40" cy="25" rx="25" ry="8"/>
      <rect fill="#fff" x="15" y="25" width="50" height="20"/>
      <ellipse fill="#0078d4" cx="40" cy="25" rx="20" ry="6"/>
      <ellipse fill="#0078d4" cx="40" cy="35" rx="20" ry="6"/>
      <ellipse fill="#fff" cx="40" cy="45" rx="25" ry="8"/>
      <ellipse fill="#0078d4" cx="40" cy="45" rx="20" ry="6"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="6">SQL DB</text>
    </svg>`,
    categories: ['database'],
    metadata: {
      name: 'Azure SQL Database',
      description: 'Azure SQL Database service',
      tags: ['database', 'sql', 'relational'],
      size: { width: 80, height: 80 },
    },
  },

  'cosmos-db': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <circle fill="#fff" cx="40" cy="35" r="20"/>
      <circle fill="#0078d4" cx="40" cy="35" r="15"/>
      <circle fill="#fff" cx="30" cy="30" r="3"/>
      <circle fill="#fff" cx="50" cy="30" r="3"/>
      <circle fill="#fff" cx="30" cy="40" r="3"/>
      <circle fill="#fff" cx="50" cy="40" r="3"/>
      <circle fill="#fff" cx="40" cy="25" r="3"/>
      <circle fill="#fff" cx="40" cy="45" r="3"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="6">Cosmos</text>
    </svg>`,
    categories: ['database'],
    metadata: {
      name: 'Azure Cosmos DB',
      description: 'Azure Cosmos DB NoSQL database service',
      tags: ['database', 'nosql', 'cosmos'],
      size: { width: 80, height: 80 },
    },
  },

  'mysql-database': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <ellipse fill="#fff" cx="40" cy="30" rx="20" ry="6"/>
      <rect fill="#fff" x="20" y="30" width="40" height="15"/>
      <ellipse fill="#fff" cx="40" cy="45" rx="20" ry="6"/>
      <path fill="#0078d4" d="M25,32 L35,32 L35,43 L25,43 Z"/>
      <path fill="#0078d4" d="M45,32 L55,32 L55,43 L45,43 Z"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="6">MySQL</text>
    </svg>`,
    categories: ['database'],
    metadata: {
      name: 'Azure Database for MySQL',
      description: 'Azure Database for MySQL',
      tags: ['database', 'mysql', 'relational'],
      size: { width: 80, height: 80 },
    },
  },

  'postgresql-database': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <ellipse fill="#fff" cx="40" cy="30" rx="20" ry="6"/>
      <rect fill="#fff" x="20" y="30" width="40" height="15"/>
      <ellipse fill="#fff" cx="40" cy="45" rx="20" ry="6"/>
      <circle fill="#0078d4" cx="30" cy="37" r="4"/>
      <circle fill="#0078d4" cx="50" cy="37" r="4"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="5">PostgreSQL</text>
    </svg>`,
    categories: ['database'],
    metadata: {
      name: 'Azure Database for PostgreSQL',
      description: 'Azure Database for PostgreSQL',
      tags: ['database', 'postgresql', 'relational'],
      size: { width: 80, height: 80 },
    },
  },

  // Storage Services
  'blob-storage': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <circle fill="#fff" cx="30" cy="25" r="8"/>
      <circle fill="#fff" cx="50" cy="25" r="8"/>
      <circle fill="#fff" cx="40" cy="40" r="8"/>
      <circle fill="#0078d4" cx="30" cy="25" r="4"/>
      <circle fill="#0078d4" cx="50" cy="25" r="4"/>
      <circle fill="#0078d4" cx="40" cy="40" r="4"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="7">Blob</text>
    </svg>`,
    categories: ['storage'],
    metadata: {
      name: 'Azure Blob Storage',
      description: 'Azure Blob Storage service',
      tags: ['storage', 'blob', 'object storage'],
      size: { width: 80, height: 80 },
    },
  },

  'file-storage': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <rect fill="#fff" x="20" y="20" width="40" height="30" rx="3"/>
      <rect fill="#0078d4" x="25" y="25" width="30" height="3"/>
      <rect fill="#0078d4" x="25" y="30" width="30" height="3"/>
      <rect fill="#0078d4" x="25" y="35" width="30" height="3"/>
      <rect fill="#0078d4" x="25" y="40" width="20" height="3"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="7">Files</text>
    </svg>`,
    categories: ['storage'],
    metadata: {
      name: 'Azure Files',
      description: 'Azure Files storage service',
      tags: ['storage', 'files', 'smb'],
      size: { width: 80, height: 80 },
    },
  },

  'queue-storage': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <rect fill="#fff" x="15" y="25" width="12" height="8" rx="2"/>
      <rect fill="#fff" x="30" y="25" width="12" height="8" rx="2"/>
      <rect fill="#fff" x="45" y="25" width="12" height="8" rx="2"/>
      <path fill="#fff" d="M60,29 L65,25 L65,33 Z"/>
      <rect fill="#fff" x="15" y="37" width="12" height="8" rx="2"/>
      <rect fill="#fff" x="30" y="37" width="12" height="8" rx="2"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="6">Queue</text>
    </svg>`,
    categories: ['storage'],
    metadata: {
      name: 'Azure Queue Storage',
      description: 'Azure Queue Storage service',
      tags: ['storage', 'queue', 'messaging'],
      size: { width: 80, height: 80 },
    },
  },

  // Network Services
  'virtual-network': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <rect fill="none" stroke="#fff" stroke-width="3" x="15" y="15" width="50" height="35" rx="5"/>
      <circle fill="#fff" cx="25" cy="25" r="3"/>
      <circle fill="#fff" cx="35" cy="25" r="3"/>
      <circle fill="#fff" cx="45" cy="25" r="3"/>
      <circle fill="#fff" cx="55" cy="25" r="3"/>
      <line stroke="#fff" stroke-width="2" x1="25" y1="35" x2="55" y2="35"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="6">VNet</text>
    </svg>`,
    categories: ['network'],
    metadata: {
      name: 'Azure Virtual Network',
      description: 'Azure Virtual Network',
      tags: ['network', 'vnet', 'virtual network'],
      size: { width: 80, height: 80 },
    },
  },

  'load-balancer': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <rect fill="#fff" x="35" y="15" width="10" height="15" rx="2"/>
      <circle fill="#fff" cx="25" cy="40" r="5"/>
      <circle fill="#fff" cx="40" cy="40" r="5"/>
      <circle fill="#fff" cx="55" cy="40" r="5"/>
      <line stroke="#fff" stroke-width="2" x1="40" y1="30" x2="25" y2="35"/>
      <line stroke="#fff" stroke-width="2" x1="40" y1="30" x2="40" y2="35"/>
      <line stroke="#fff" stroke-width="2" x1="40" y1="30" x2="55" y2="35"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="8">LB</text>
    </svg>`,
    categories: ['network'],
    metadata: {
      name: 'Azure Load Balancer',
      description: 'Azure Load Balancer',
      tags: ['network', 'load balancer', 'traffic'],
      size: { width: 80, height: 80 },
    },
  },

  'application-gateway': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <rect fill="#fff" x="20" y="20" width="40" height="25" rx="3"/>
      <rect fill="#0078d4" x="25" y="25" width="30" height="4"/>
      <rect fill="#0078d4" x="25" y="32" width="30" height="4"/>
      <rect fill="#0078d4" x="25" y="39" width="30" height="4"/>
      <circle fill="#fff" cx="15" cy="32" r="3"/>
      <circle fill="#fff" cx="65" cy="32" r="3"/>
      <line stroke="#fff" stroke-width="2" x1="18" y1="32" x2="20" y2="32"/>
      <line stroke="#fff" stroke-width="2" x1="60" y1="32" x2="62" y2="32"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="5">App GW</text>
    </svg>`,
    categories: ['network'],
    metadata: {
      name: 'Azure Application Gateway',
      description: 'Azure Application Gateway',
      tags: ['network', 'application gateway', 'waf'],
      size: { width: 80, height: 80 },
    },
  },

  // AI Services
  'cognitive-services': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <circle fill="#fff" cx="40" cy="35" r="15"/>
      <circle fill="#0078d4" cx="35" cy="30" r="3"/>
      <circle fill="#0078d4" cx="45" cy="30" r="3"/>
      <path fill="#0078d4" d="M30,40 Q40,45 50,40"/>
      <circle fill="#fff" cx="25" cy="25" r="4"/>
      <circle fill="#fff" cx="55" cy="25" r="4"/>
      <circle fill="#fff" cx="25" cy="45" r="4"/>
      <circle fill="#fff" cx="55" cy="45" r="4"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="5">Cognitive</text>
    </svg>`,
    categories: ['ai'],
    metadata: {
      name: 'Azure Cognitive Services',
      description: 'Azure Cognitive Services',
      tags: ['ai', 'cognitive', 'machine learning'],
      size: { width: 80, height: 80 },
    },
  },

  'machine-learning': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#0078d4" width="80" height="80"/>
      <rect fill="#005a9e" x="0" y="61.6" width="80" height="18.4"/>
      <rect fill="#fff" x="20" y="20" width="40" height="25" rx="3"/>
      <circle fill="#0078d4" cx="30" cy="30" r="3"/>
      <circle fill="#0078d4" cx="40" cy="27" r="3"/>
      <circle fill="#0078d4" cx="50" cy="30" r="3"/>
      <line stroke="#0078d4" stroke-width="2" x1="30" y1="33" x2="40" y2="30"/>
      <line stroke="#0078d4" stroke-width="2" x1="40" y1="30" x2="50" y2="33"/>
      <circle fill="#0078d4" cx="35" cy="38" r="2"/>
      <circle fill="#0078d4" cx="45" cy="38" r="2"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="7">ML</text>
    </svg>`,
    categories: ['ai'],
    metadata: {
      name: 'Azure Machine Learning',
      description: 'Azure Machine Learning service',
      tags: ['ai', 'machine learning', 'ml'],
      size: { width: 80, height: 80 },
    },
  },
};

export const azureIconPack: IconPack = {
  provider: 'azure',
  version: '1.0.0',
  icons: azureIcons,
  metadata: {
    name: 'Azure Icons',
    description: 'Official Azure service icons for cloud diagrams',
    sourceUrl: 'https://docs.microsoft.com/en-us/azure/architecture/icons/',
    license: 'MIT',
  },
};
