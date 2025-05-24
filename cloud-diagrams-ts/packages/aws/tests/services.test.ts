import { EC2Instance, RDSDatabase, S3Bucket, VirtualPrivateCloud } from '../src';

describe('AWS Services', () => {
  describe('EC2', () => {
    it('should create EC2 instance with correct properties', () => {
      const instance = EC2Instance('Web Server', { instanceType: 't3.medium' });
      
      expect(instance.provider).toBe('aws');
      expect(instance.service).toBe('ec2');
      expect(instance.category).toBe('compute');
      expect(instance.label).toBe('Web Server');
      expect(instance.metadata?.instanceType).toBe('t3.medium');
    });
  });

  describe('RDS', () => {
    it('should create RDS database with correct properties', () => {
      const db = RDSDatabase('MySQL DB', { engine: 'mysql', instanceClass: 'db.t3.micro' });
      
      expect(db.provider).toBe('aws');
      expect(db.service).toBe('rds');
      expect(db.category).toBe('database');
      expect(db.label).toBe('MySQL DB');
      expect(db.metadata?.engine).toBe('mysql');
    });
  });

  describe('S3', () => {
    it('should create S3 bucket with correct properties', () => {
      const bucket = S3Bucket('Assets', { storageClass: 'STANDARD' });
      
      expect(bucket.provider).toBe('aws');
      expect(bucket.service).toBe('s3');
      expect(bucket.category).toBe('storage');
      expect(bucket.label).toBe('Assets');
      expect(bucket.metadata?.storageClass).toBe('STANDARD');
    });
  });

  describe('VPC', () => {
    it('should create VPC with correct properties', () => {
      const vpc = VirtualPrivateCloud('Main VPC', { cidr: '10.0.0.0/16' });
      
      expect(vpc.provider).toBe('aws');
      expect(vpc.service).toBe('vpc');
      expect(vpc.category).toBe('network');
      expect(vpc.label).toBe('Main VPC');
      expect(vpc.metadata?.cidr).toBe('10.0.0.0/16');
    });
  });
}); 