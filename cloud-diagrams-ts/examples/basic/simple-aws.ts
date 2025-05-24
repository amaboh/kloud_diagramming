import { Diagram } from '@cloud-diagrams/core';
import { EC2Instance, RDSDatabase, S3Bucket } from '@cloud-diagrams/aws';

// Create a simple 3-tier architecture
const diagram = new Diagram('Simple Web Application', {
  direction: 'LR'
});

// Add nodes
const web = diagram.addNode(EC2Instance('Web Server', { instanceType: 't3.medium' }));
const app = diagram.addNode(EC2Instance('App Server', { instanceType: 't3.large' }));
const db = diagram.addNode(RDSDatabase('Database', { engine: 'mysql' }));
const storage = diagram.addNode(S3Bucket('Static Assets', { storageClass: 'STANDARD' }));

// Connect them
diagram.connect(web, app, { label: 'HTTP' });
diagram.connect(app, db, { label: 'SQL' });
diagram.connect(web, storage, { label: 'CDN' });

// Render (in browser environment)
// diagram.render('#diagram-container');

export { diagram }; 