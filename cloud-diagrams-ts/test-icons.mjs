import corePkg from './packages/core/dist/index.esm.js';
import awsPkg from './packages/aws/dist/index.esm.js';

const { Diagram, iconRegistry } = corePkg;
const { EC2, S3, Lambda, RDS } = awsPkg;

console.log('🧪 Testing Enhanced Icon System...');

// Test icon registry
const stats = iconRegistry.getStats();
console.log('📊 Icon Registry Stats:', stats);

// Test AWS services
const awsServices = iconRegistry.getServicesForProvider('aws');
console.log('📦 AWS Services Available:', awsServices);

// Test icon availability
console.log('🎯 EC2 icon available:', iconRegistry.hasIcon('aws', 'ec2'));
console.log('🎯 S3 icon available:', iconRegistry.hasIcon('aws', 's3'));
console.log('🎯 Lambda icon available:', iconRegistry.hasIcon('aws', 'lambda'));
console.log('🎯 RDS icon available:', iconRegistry.hasIcon('aws', 'rds'));

// Test icon retrieval
try {
  const ec2Icon = await iconRegistry.getIconSvg('aws', 'ec2');
  console.log('🎨 EC2 icon SVG length:', ec2Icon?.length || 0, 'characters');

  const s3Icon = await iconRegistry.getIconSvg('aws', 's3');
  console.log('🎨 S3 icon SVG length:', s3Icon?.length || 0, 'characters');
} catch (error) {
  console.log('⚠️ Icon retrieval test failed:', error.message);
}

console.log('✅ Enhanced Icon System Test Complete!');
