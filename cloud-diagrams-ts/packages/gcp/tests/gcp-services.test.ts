import {
  // Compute
  ComputeEngine,
  GCE,
  CloudFunctions,
  GCF,
  KubernetesEngine,
  GKE,

  // Database
  CloudSQL,
  Firestore,

  // Storage
  CloudStorage,
  GCS,

  // Network
  VPC,
  LoadBalancer,
  GLB,
} from '../src';

describe('GCP Services', () => {
  describe('Compute Services', () => {
    test('ComputeEngine should create correctly', () => {
      const gce = new ComputeEngine('test-vm', {
        machineType: 'n1-standard-1',
      });
      expect(gce.label).toBe('test-vm');
      expect(gce.provider).toBe('gcp');
      expect(gce.service).toBe('compute-engine');
      expect(gce.category).toBe('compute');
    });

    test('GCE factory function should work', () => {
      const gce = GCE('test-vm', { zone: 'us-central1-a' });
      expect(gce).toBeInstanceOf(ComputeEngine);
      expect(gce.label).toBe('test-vm');
    });

    test('CloudFunctions should create correctly', () => {
      const func = new CloudFunctions('test-function', { runtime: 'nodejs16' });
      expect(func.label).toBe('test-function');
      expect(func.service).toBe('cloud-functions');
    });

    test('GCF factory function should work', () => {
      const func = GCF('test-function', { trigger: 'http' });
      expect(func).toBeInstanceOf(CloudFunctions);
    });

    test('KubernetesEngine should create correctly', () => {
      const gke = new KubernetesEngine('test-cluster', { nodeCount: 3 });
      expect(gke.label).toBe('test-cluster');
      expect(gke.service).toBe('kubernetes-engine');
    });

    test('GKE factory function should work', () => {
      const gke = GKE('test-cluster', { autopilot: true });
      expect(gke).toBeInstanceOf(KubernetesEngine);
    });
  });

  describe('Database Services', () => {
    test('CloudSQL should create correctly', () => {
      const sql = new CloudSQL('test-db', { engine: 'mysql' });
      expect(sql.label).toBe('test-db');
      expect(sql.service).toBe('cloud-sql');
      expect(sql.category).toBe('database');
    });

    test('Firestore should create correctly', () => {
      const firestore = new Firestore('test-firestore', { mode: 'native' });
      expect(firestore.label).toBe('test-firestore');
      expect(firestore.service).toBe('firestore');
    });
  });

  describe('Storage Services', () => {
    test('CloudStorage should create correctly', () => {
      const storage = new CloudStorage('test-bucket', {
        storageClass: 'standard',
      });
      expect(storage.label).toBe('test-bucket');
      expect(storage.service).toBe('cloud-storage');
      expect(storage.category).toBe('storage');
    });

    test('GCS factory function should work', () => {
      const storage = GCS('test-bucket', { region: 'us-central1' });
      expect(storage).toBeInstanceOf(CloudStorage);
    });
  });

  describe('Network Services', () => {
    test('VPC should create correctly', () => {
      const vpc = new VPC('test-vpc', { mode: 'auto' });
      expect(vpc.label).toBe('test-vpc');
      expect(vpc.service).toBe('vpc');
      expect(vpc.category).toBe('network');
    });

    test('LoadBalancer should create correctly', () => {
      const lb = new LoadBalancer('test-lb', { type: 'global' });
      expect(lb.label).toBe('test-lb');
      expect(lb.service).toBe('load-balancer');
    });

    test('GLB factory function should work', () => {
      const lb = GLB('test-lb', { protocol: 'https' });
      expect(lb).toBeInstanceOf(LoadBalancer);
    });
  });
});
