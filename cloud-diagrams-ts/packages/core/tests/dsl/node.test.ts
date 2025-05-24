import { AWSNode, AzureNode, GCPNode } from '../../src/dsl/node';

describe('Node Classes', () => {
  describe('AWSNode', () => {
    it('should create an AWS node with correct properties', () => {
      const node = new AWSNode('ec2', 'compute', 'Test Server', { instanceType: 't3.micro' });
      
      expect(node.provider).toBe('aws');
      expect(node.service).toBe('ec2');
      expect(node.category).toBe('compute');
      expect(node.label).toBe('Test Server');
      expect(node.metadata?.instanceType).toBe('t3.micro');
      expect(node.getIconKey()).toBe('aws:ec2');
    });
  });

  describe('AzureNode', () => {
    it('should create an Azure node with correct properties', () => {
      const node = new AzureNode('vm', 'compute', 'Test VM');
      
      expect(node.provider).toBe('azure');
      expect(node.service).toBe('vm');
      expect(node.category).toBe('compute');
      expect(node.label).toBe('Test VM');
      expect(node.getIconKey()).toBe('azure:vm');
    });
  });

  describe('GCPNode', () => {
    it('should create a GCP node with correct properties', () => {
      const node = new GCPNode('compute-engine', 'compute', 'Test Instance');
      
      expect(node.provider).toBe('gcp');
      expect(node.service).toBe('compute-engine');
      expect(node.category).toBe('compute');
      expect(node.label).toBe('Test Instance');
      expect(node.getIconKey()).toBe('gcp:compute-engine');
    });
  });
}); 