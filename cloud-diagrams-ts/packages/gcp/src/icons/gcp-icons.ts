import type { IconPack, GCPIconSet } from '@cloud-diagrams/core';

// GCP Official SVG Icons - Based on Google Cloud Architecture Icons
// Source: https://cloud.google.com/icons
// These are simplified representations for demo purposes
// In production, these would be loaded from the official GCP icon set

const gcpIcons: GCPIconSet = {
  // Compute Services
  'compute-engine': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#4285f4" width="80" height="80"/>
      <rect fill="#1a73e8" x="0" y="61.6" width="80" height="18.4"/>
      <rect fill="#fff" x="13.6" y="13.6" width="52.8" height="39.2"/>
      <rect fill="#4285f4" x="20.8" y="20.8" width="38.4" height="24.8"/>
      <circle fill="#fff" cx="40" cy="33.2" r="4"/>
      <rect fill="#fff" x="15.2" y="56.8" width="49.6" height="2.4"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="7">GCE</text>
    </svg>`,
    categories: ['compute'],
    metadata: {
      name: 'Google Compute Engine',
      description: 'Google Compute Engine virtual machines',
      tags: ['compute', 'virtual machine', 'gce'],
      size: { width: 80, height: 80 },
    },
  },

  'cloud-functions': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#4285f4" width="80" height="80"/>
      <rect fill="#1a73e8" x="0" y="61.6" width="80" height="18.4"/>
      <path fill="#fff" d="M25,20 L30,35 L35,20 L45,20 L40,35 L45,50 L35,50 L30,35 L25,50 L15,50 L20,35 L15,20 Z"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="6">Functions</text>
    </svg>`,
    categories: ['compute', 'serverless'],
    metadata: {
      name: 'Google Cloud Functions',
      description: 'Google Cloud Functions serverless compute',
      tags: ['serverless', 'function', 'compute'],
      size: { width: 80, height: 80 },
    },
  },

  'kubernetes-engine': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#4285f4" width="80" height="80"/>
      <rect fill="#1a73e8" x="0" y="61.6" width="80" height="18.4"/>
      <circle fill="#fff" cx="40" cy="35" r="15"/>
      <path fill="#4285f4" d="M40,25 L45,30 L40,35 L35,30 Z"/>
      <circle fill="#4285f4" cx="30" cy="30" r="3"/>
      <circle fill="#4285f4" cx="50" cy="30" r="3"/>
      <circle fill="#4285f4" cx="30" cy="40" r="3"/>
      <circle fill="#4285f4" cx="50" cy="40" r="3"/>
      <circle fill="#4285f4" cx="40" cy="45" r="3"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="7">GKE</text>
    </svg>`,
    categories: ['compute', 'containers'],
    metadata: {
      name: 'Google Kubernetes Engine',
      description: 'Google Kubernetes Engine',
      tags: ['kubernetes', 'containers', 'orchestration'],
      size: { width: 80, height: 80 },
    },
  },

  // Database Services
  'cloud-sql': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#4285f4" width="80" height="80"/>
      <rect fill="#1a73e8" x="0" y="61.6" width="80" height="18.4"/>
      <ellipse fill="#fff" cx="40" cy="25" rx="25" ry="8"/>
      <rect fill="#fff" x="15" y="25" width="50" height="20"/>
      <ellipse fill="#4285f4" cx="40" cy="25" rx="20" ry="6"/>
      <ellipse fill="#4285f4" cx="40" cy="35" rx="20" ry="6"/>
      <ellipse fill="#fff" cx="40" cy="45" rx="25" ry="8"/>
      <ellipse fill="#4285f4" cx="40" cy="45" rx="20" ry="6"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="6">Cloud SQL</text>
    </svg>`,
    categories: ['database'],
    metadata: {
      name: 'Google Cloud SQL',
      description: 'Google Cloud SQL managed database',
      tags: ['database', 'sql', 'managed'],
      size: { width: 80, height: 80 },
    },
  },

  firestore: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#4285f4" width="80" height="80"/>
      <rect fill="#1a73e8" x="0" y="61.6" width="80" height="18.4"/>
      <circle fill="#fff" cx="40" cy="35" r="20"/>
      <circle fill="#4285f4" cx="40" cy="35" r="15"/>
      <circle fill="#fff" cx="30" cy="30" r="3"/>
      <circle fill="#fff" cx="50" cy="30" r="3"/>
      <circle fill="#fff" cx="30" cy="40" r="3"/>
      <circle fill="#fff" cx="50" cy="40" r="3"/>
      <circle fill="#fff" cx="40" cy="25" r="3"/>
      <circle fill="#fff" cx="40" cy="45" r="3"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="6">Firestore</text>
    </svg>`,
    categories: ['database'],
    metadata: {
      name: 'Google Firestore',
      description: 'Google Firestore NoSQL database',
      tags: ['database', 'nosql', 'firestore'],
      size: { width: 80, height: 80 },
    },
  },

  // Storage Services
  'cloud-storage': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#4285f4" width="80" height="80"/>
      <rect fill="#1a73e8" x="0" y="61.6" width="80" height="18.4"/>
      <circle fill="#fff" cx="30" cy="25" r="8"/>
      <circle fill="#fff" cx="50" cy="25" r="8"/>
      <circle fill="#fff" cx="40" cy="40" r="8"/>
      <circle fill="#4285f4" cx="30" cy="25" r="4"/>
      <circle fill="#4285f4" cx="50" cy="25" r="4"/>
      <circle fill="#4285f4" cx="40" cy="40" r="4"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="6">Storage</text>
    </svg>`,
    categories: ['storage'],
    metadata: {
      name: 'Google Cloud Storage',
      description: 'Google Cloud Storage object storage',
      tags: ['storage', 'object storage', 'gcs'],
      size: { width: 80, height: 80 },
    },
  },

  // Network Services
  vpc: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#4285f4" width="80" height="80"/>
      <rect fill="#1a73e8" x="0" y="61.6" width="80" height="18.4"/>
      <rect fill="none" stroke="#fff" stroke-width="3" x="15" y="15" width="50" height="35" rx="5"/>
      <circle fill="#fff" cx="25" cy="25" r="3"/>
      <circle fill="#fff" cx="35" cy="25" r="3"/>
      <circle fill="#fff" cx="45" cy="25" r="3"/>
      <circle fill="#fff" cx="55" cy="25" r="3"/>
      <line stroke="#fff" stroke-width="2" x1="25" y1="35" x2="55" y2="35"/>
      <text x="40" y="72" text-anchor="middle" fill="#fff" font-family="Arial" font-size="7">VPC</text>
    </svg>`,
    categories: ['network'],
    metadata: {
      name: 'Google VPC',
      description: 'Google Virtual Private Cloud',
      tags: ['network', 'vpc', 'virtual network'],
      size: { width: 80, height: 80 },
    },
  },

  'load-balancer': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect fill="#4285f4" width="80" height="80"/>
      <rect fill="#1a73e8" x="0" y="61.6" width="80" height="18.4"/>
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
      name: 'Google Load Balancer',
      description: 'Google Cloud Load Balancer',
      tags: ['network', 'load balancer', 'traffic'],
      size: { width: 80, height: 80 },
    },
  },
};

export const gcpIconPack: IconPack = {
  provider: 'gcp',
  version: '1.0.0',
  icons: gcpIcons,
  metadata: {
    name: 'GCP Icons',
    description:
      'Official Google Cloud Platform service icons for cloud diagrams',
    sourceUrl: 'https://cloud.google.com/icons',
    license: 'MIT',
  },
};
