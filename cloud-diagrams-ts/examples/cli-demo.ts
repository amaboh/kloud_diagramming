import { Diagram } from '@cloud-diagrams/core';
import * as AWS from '@cloud-diagrams/aws';
import * as Azure from '@cloud-diagrams/azure';
import * as GCP from '@cloud-diagrams/gcp';

// Create a multi-cloud architecture diagram
const diagram = new Diagram('Multi-Cloud Enterprise Architecture', {
  direction: 'TB',
  theme: 'light',
});

// AWS Infrastructure
diagram.addGroup('AWS Region (us-east-1)', (aws) => {
  aws.addGroup('Production VPC', (vpc) => {
    // Web Tier
    vpc.addGroup('Web Tier', (web) => {
      web.addNode(AWS.CloudFront('CDN'));
      web.addNode(AWS.ALB('Load Balancer'));
      web.addNode(AWS.EC2('Web Server 1'));
      web.addNode(AWS.EC2('Web Server 2'));
    });

    // Application Tier
    vpc.addGroup('App Tier', (app) => {
      app.addNode(AWS.Lambda('User Service'));
      app.addNode(AWS.Lambda('Order Service'));
      app.addNode(AWS.APIGateway('API Gateway'));
    });

    // Data Tier
    vpc.addGroup('Data Tier', (data) => {
      data.addNode(AWS.RDS('Primary DB'));
      data.addNode(AWS.RDS('Read Replica'));
      data.addNode(AWS.ElastiCache('Redis Cache'));
    });
  });

  // Storage & Analytics
  aws.addNode(AWS.S3('Data Lake'));
  aws.addNode(AWS.Redshift('Data Warehouse'));
});

// Azure Infrastructure
diagram.addGroup('Azure Region (East US)', (azure) => {
  azure.addGroup('Resource Group', (rg) => {
    // Backup & DR
    rg.addNode(Azure.BlobStorage('Backup Storage'));
    rg.addNode(Azure.SQLDatabase('DR Database'));

    // AI/ML Services
    rg.addNode(Azure.CognitiveServices('AI Services'));
    rg.addNode(Azure.MachineLearning('ML Pipeline'));
  });
});

// GCP Infrastructure
diagram.addGroup('GCP Region (us-central1)', (gcp) => {
  gcp.addGroup('Analytics Project', (project) => {
    // Big Data Processing
    project.addNode(GCP.BigQuery('Analytics DB'));
    project.addNode(GCP.Dataflow('Stream Processing'));
    project.addNode(GCP.CloudStorage('Raw Data'));
  });
});

// Cross-Cloud Connections
const awsApi = diagram.findNodeByLabel('API Gateway');
const azureAI = diagram.findNodeByLabel('AI Services');
const gcpBigQuery = diagram.findNodeByLabel('Analytics DB');
const awsDataLake = diagram.findNodeByLabel('Data Lake');

if (awsApi && azureAI) {
  diagram.connect(awsApi, azureAI, 'AI Processing');
}

if (awsDataLake && gcpBigQuery) {
  diagram.connect(awsDataLake, gcpBigQuery, 'Analytics Pipeline');
}

// Export the diagram
export default diagram;
