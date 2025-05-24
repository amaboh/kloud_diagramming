import {
  // Compute
  VirtualMachine,
  VM,
  FunctionApp,
  Functions,
  ContainerInstance,
  ACI,
  KubernetesService,
  AKS,

  // Database
  SQLDatabase,
  SqlDB,
  CosmosDB,
  Cosmos,
  MySQLDatabase,
  MySQL,
  PostgreSQLDatabase,
  PostgreSQL,

  // Storage
  BlobStorage,
  Blob,
  FileStorage,
  Files,
  QueueStorage,
  Queue,

  // Network
  VirtualNetwork,
  VNet,
  LoadBalancer,
  LB,
  ApplicationGateway,
  AppGW,

  // AI
  CognitiveServices,
  Cognitive,
  MachineLearning,
  ML,
} from '../src';

describe('Azure Services', () => {
  describe('Compute Services', () => {
    test('VirtualMachine should create correctly', () => {
      const vm = new VirtualMachine('test-vm', { size: 'Standard_B2s' });
      expect(vm.label).toBe('test-vm');
      expect(vm.provider).toBe('azure');
      expect(vm.service).toBe('virtual-machine');
      expect(vm.category).toBe('compute');
    });

    test('VM factory function should work', () => {
      const vm = VM('test-vm', { os: 'linux' });
      expect(vm).toBeInstanceOf(VirtualMachine);
      expect(vm.label).toBe('test-vm');
    });

    test('FunctionApp should create correctly', () => {
      const func = new FunctionApp('test-function', { runtime: 'node' });
      expect(func.label).toBe('test-function');
      expect(func.service).toBe('function-app');
    });

    test('Functions factory function should work', () => {
      const func = Functions('test-function', { tier: 'premium' });
      expect(func).toBeInstanceOf(FunctionApp);
    });

    test('ContainerInstance should create correctly', () => {
      const aci = new ContainerInstance('test-container', { image: 'nginx' });
      expect(aci.label).toBe('test-container');
      expect(aci.service).toBe('container-instance');
    });

    test('ACI factory function should work', () => {
      const aci = ACI('test-container', { cpu: 2 });
      expect(aci).toBeInstanceOf(ContainerInstance);
    });

    test('KubernetesService should create correctly', () => {
      const aks = new KubernetesService('test-aks', { nodeCount: 3 });
      expect(aks.label).toBe('test-aks');
      expect(aks.service).toBe('kubernetes-service');
    });

    test('AKS factory function should work', () => {
      const aks = AKS('test-aks', { nodeSize: 'Standard_D2s_v3' });
      expect(aks).toBeInstanceOf(KubernetesService);
    });
  });

  describe('Database Services', () => {
    test('SQLDatabase should create correctly', () => {
      const db = new SQLDatabase('test-sql', { tier: 'standard' });
      expect(db.label).toBe('test-sql');
      expect(db.service).toBe('sql-database');
      expect(db.category).toBe('database');
    });

    test('SqlDB factory function should work', () => {
      const db = SqlDB('test-sql', { backup: true });
      expect(db).toBeInstanceOf(SQLDatabase);
    });

    test('CosmosDB should create correctly', () => {
      const cosmos = new CosmosDB('test-cosmos', { api: 'sql' });
      expect(cosmos.label).toBe('test-cosmos');
      expect(cosmos.service).toBe('cosmos-db');
    });

    test('Cosmos factory function should work', () => {
      const cosmos = Cosmos('test-cosmos', { consistency: 'session' });
      expect(cosmos).toBeInstanceOf(CosmosDB);
    });

    test('MySQLDatabase should create correctly', () => {
      const mysql = new MySQLDatabase('test-mysql', { version: '8.0' });
      expect(mysql.label).toBe('test-mysql');
      expect(mysql.service).toBe('mysql-database');
    });

    test('MySQL factory function should work', () => {
      const mysql = MySQL('test-mysql', { tier: 'general-purpose' });
      expect(mysql).toBeInstanceOf(MySQLDatabase);
    });

    test('PostgreSQLDatabase should create correctly', () => {
      const pg = new PostgreSQLDatabase('test-pg', { version: '14' });
      expect(pg.label).toBe('test-pg');
      expect(pg.service).toBe('postgresql-database');
    });

    test('PostgreSQL factory function should work', () => {
      const pg = PostgreSQL('test-pg', { backup: true });
      expect(pg).toBeInstanceOf(PostgreSQLDatabase);
    });
  });

  describe('Storage Services', () => {
    test('BlobStorage should create correctly', () => {
      const blob = new BlobStorage('test-blob', { tier: 'hot' });
      expect(blob.label).toBe('test-blob');
      expect(blob.service).toBe('blob-storage');
      expect(blob.category).toBe('storage');
    });

    test('Blob factory function should work', () => {
      const blob = Blob('test-blob', { redundancy: 'LRS' });
      expect(blob).toBeInstanceOf(BlobStorage);
    });

    test('FileStorage should create correctly', () => {
      const files = new FileStorage('test-files', { tier: 'premium' });
      expect(files.label).toBe('test-files');
      expect(files.service).toBe('file-storage');
    });

    test('Files factory function should work', () => {
      const files = Files('test-files', { protocol: 'SMB' });
      expect(files).toBeInstanceOf(FileStorage);
    });

    test('QueueStorage should create correctly', () => {
      const queue = new QueueStorage('test-queue', { messageRetention: 7 });
      expect(queue.label).toBe('test-queue');
      expect(queue.service).toBe('queue-storage');
    });

    test('Queue factory function should work', () => {
      const queue = Queue('test-queue', { encryption: true });
      expect(queue).toBeInstanceOf(QueueStorage);
    });
  });

  describe('Network Services', () => {
    test('VirtualNetwork should create correctly', () => {
      const vnet = new VirtualNetwork('test-vnet', {
        addressSpace: '10.0.0.0/16',
      });
      expect(vnet.label).toBe('test-vnet');
      expect(vnet.service).toBe('virtual-network');
      expect(vnet.category).toBe('network');
    });

    test('VNet factory function should work', () => {
      const vnet = VNet('test-vnet', { subnets: ['10.0.1.0/24'] });
      expect(vnet).toBeInstanceOf(VirtualNetwork);
    });

    test('LoadBalancer should create correctly', () => {
      const lb = new LoadBalancer('test-lb', { type: 'public' });
      expect(lb.label).toBe('test-lb');
      expect(lb.service).toBe('load-balancer');
    });

    test('LB factory function should work', () => {
      const lb = LB('test-lb', { sku: 'standard' });
      expect(lb).toBeInstanceOf(LoadBalancer);
    });

    test('ApplicationGateway should create correctly', () => {
      const appgw = new ApplicationGateway('test-appgw', { tier: 'waf' });
      expect(appgw.label).toBe('test-appgw');
      expect(appgw.service).toBe('application-gateway');
    });

    test('AppGW factory function should work', () => {
      const appgw = AppGW('test-appgw', { ssl: true });
      expect(appgw).toBeInstanceOf(ApplicationGateway);
    });
  });

  describe('AI Services', () => {
    test('CognitiveServices should create correctly', () => {
      const cognitive = new CognitiveServices('test-cognitive', {
        service: 'vision',
      });
      expect(cognitive.label).toBe('test-cognitive');
      expect(cognitive.service).toBe('cognitive-services');
      expect(cognitive.category).toBe('ai');
    });

    test('Cognitive factory function should work', () => {
      const cognitive = Cognitive('test-cognitive', { tier: 'standard' });
      expect(cognitive).toBeInstanceOf(CognitiveServices);
    });

    test('MachineLearning should create correctly', () => {
      const ml = new MachineLearning('test-ml', { computeType: 'gpu' });
      expect(ml.label).toBe('test-ml');
      expect(ml.service).toBe('machine-learning');
    });

    test('ML factory function should work', () => {
      const ml = ML('test-ml', { autoScale: true });
      expect(ml).toBeInstanceOf(MachineLearning);
    });
  });
});
