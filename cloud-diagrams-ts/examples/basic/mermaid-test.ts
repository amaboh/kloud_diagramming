import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS, S3 } from '@cloud-diagrams/aws';

// Create a new diagram
const diagram = new Diagram('3-Tier Web Application', {
  direction: 'LR',
  theme: 'default',
});

// Add a VPC group
const vpc = diagram.addGroup('Production VPC', (group) => {
  // Add nodes to the group
  const web1 = new EC2('web-server-1', 'Web Server 1', {
    url: 'https://console.aws.amazon.com/ec2',
    description: 'Primary web server',
  });

  const web2 = new EC2('web-server-2', 'Web Server 2', {
    url: 'https://console.aws.amazon.com/ec2',
    description: 'Secondary web server',
  });

  group.addNode(web1);
  group.addNode(web2);
});

// Add external services
const database = diagram.addNode(
  new RDS('prod-db', 'Production Database', {
    url: 'https://console.aws.amazon.com/rds',
    description: 'Main application database',
  })
);

const storage = diagram.addNode(
  new S3('static-assets', 'Static Assets Bucket', {
    url: 'https://console.aws.amazon.com/s3',
    description: 'CDN and static file storage',
  })
);

// Create connections
const webServers = vpc.getNodes();
webServers.forEach((webServer) => {
  diagram.connect(webServer, database, {
    label: 'DB Queries',
    style: 'solid',
  });

  diagram.connect(webServer, storage, {
    label: 'Static Files',
    style: 'dashed',
  });
});

// Export the diagram model for testing
export { diagram };

// Browser usage example (commented out for Node.js compatibility)
/*
// Render in browser
if (typeof document !== 'undefined') {
  diagram.render('#diagram-container', {
    theme: 'default',
    interactive: true,
    width: 1000,
    height: 600
  }).then(() => {
    console.log('Diagram rendered successfully!');
    
    // Add custom event listener
    const container = document.querySelector('#diagram-container');
    container?.addEventListener('nodeClick', (event) => {
      const { node } = (event as CustomEvent).detail;
      console.log('Clicked node:', node.label);
      alert(`Clicked: ${node.label}\nDescription: ${node.metadata?.description || 'No description'}`);
    });
  }).catch(error => {
    console.error('Rendering failed:', error);
  });

  // Export functionality
  const exportButtons = {
    svg: () => diagram.export('svg', { width: 1200, height: 800 }),
    png: () => diagram.export('png', { width: 1200, height: 800, backgroundColor: 'white' }),
    pdf: () => diagram.export('pdf', { width: 1200, height: 800 })
  };

  // Example export usage
  document.getElementById('export-svg')?.addEventListener('click', async () => {
    try {
      const blob = await exportButtons.svg();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'diagram.svg';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  });
}
*/
