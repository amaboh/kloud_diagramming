import { Diagram, Group } from '@cloud-diagrams/core';
import { EC2, RDS, VPC, LoadBalancer, S3 } from '@cloud-diagrams/aws';

// Create a new diagram
const diagram = new Diagram('My First AWS Architecture');

// Create a VPC group to organize resources
const vpc = new Group('main-vpc', {
  label: 'Main VPC (10.0.0.0/16)',
  style: {
    background: '#e8f4f8',
    border: '2px solid #1f77b4',
    borderRadius: '8px',
  },
});

// Create cloud resources
const loadBalancer = new LoadBalancer('alb', {
  label: 'Application Load Balancer',
});

const webServer = new EC2('web-server', {
  label: 'Web Server',
  instanceType: 't3.medium',
  availabilityZone: 'us-east-1a',
});

const database = new RDS('database', {
  label: 'PostgreSQL Database',
  engine: 'postgres',
  instanceClass: 'db.t3.micro',
});

const storage = new S3('static-assets', {
  label: 'Static Assets Bucket',
});

// Organize resources in the VPC
vpc.addNode(loadBalancer);
vpc.addNode(webServer);
vpc.addNode(database);

// Add VPC to diagram
diagram.addGroup(vpc);

// S3 is outside VPC
diagram.addNode(storage);

// Connect the components
diagram.connect(loadBalancer, webServer, {
  label: 'HTTP traffic',
});

diagram.connect(webServer, database, {
  label: 'SQL queries',
  style: { strokeDasharray: '5,5' },
});

diagram.connect(webServer, storage, {
  label: 'serve assets',
});

// Generate the diagram
console.log('=== Generated Mermaid Diagram ===');
console.log(diagram.render());

// Display diagram statistics
console.log('\n=== Diagram Statistics ===');
console.log(`Nodes: ${diagram.getNodes().length}`);
console.log(`Groups: ${diagram.getGroups().length}`);
console.log(`Connections: ${diagram.getConnections().length}`);

// List all resources
console.log('\n=== Resources ===');
diagram.getNodes().forEach((node) => {
  console.log(`- ${node.metadata.label || node.id} (${node.iconType})`);
});

// Example of using interactive features
webServer.onClick((node, event) => {
  console.log(`\n🖱️  Clicked on ${node.metadata.label}`);
  console.log(`   Instance Type: ${node.metadata.instanceType}`);
  console.log(`   Availability Zone: ${node.metadata.availabilityZone}`);
});

database.onHover((node, event) => {
  console.log(`\n🔍 Hovering over ${node.metadata.label}`);
  console.log(`   Engine: ${node.metadata.engine}`);
  console.log(`   Instance Class: ${node.metadata.instanceClass}`);
});

console.log('\n=== Interactive Features Enabled ===');
console.log(
  'Click and hover handlers have been set up for web server and database.'
);
console.log(
  'In a browser environment, these would respond to actual user interactions.'
);

export { diagram };
