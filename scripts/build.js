#!/usr/bin/env node

/**
 * Build script for heater-shutdown-checker
 * Creates a distribution package ready for deployment
 */

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');
const publicDir = join(rootDir, 'public');
const docsDir = join(rootDir, 'docs');

// Files to copy
const filesToCopy = [
  { from: 'public/index.html', to: 'index.html' },
  { from: 'public/manifest.json', to: 'manifest.json' },
  { from: 'public/sw.js', to: 'sw.js' },
  { from: 'LICENSE', to: 'LICENSE' },
  { from: 'README.md', to: 'README.md' },
  { from: 'docs/INSTALL.md', to: 'INSTALL.md' },
  { from: 'docs/USER_GUIDE.md', to: 'USER_GUIDE.md' }
];

// Directories to copy
const dirsToCopy = [
  { from: 'public/assets', to: 'assets' }
];

async function cleanDist() {
  console.log('🧹 Cleaning dist directory...');
  try {
    await fs.rm(distDir, { recursive: true, force: true });
  } catch (error) {
    // Directory doesn't exist, that's fine
  }
  await fs.mkdir(distDir, { recursive: true });
  console.log('✓ dist directory cleaned');
}

async function copyFile(from, to) {
  const fromPath = join(rootDir, from);
  const toPath = join(distDir, to);

  try {
    await fs.mkdir(dirname(toPath), { recursive: true });
    await fs.copyFile(fromPath, toPath);
    console.log(`✓ Copied ${from} → dist/${to}`);
  } catch (error) {
    console.warn(`⚠ Could not copy ${from}: ${error.message}`);
  }
}

async function copyDir(from, to) {
  const fromPath = join(rootDir, from);
  const toPath = join(distDir, to);

  try {
    await fs.mkdir(toPath, { recursive: true });

    const entries = await fs.readdir(fromPath, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = join(fromPath, entry.name);
      const destPath = join(toPath, entry.name);

      if (entry.isDirectory()) {
        await copyDirRecursive(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }

    console.log(`✓ Copied directory ${from} → dist/${to}`);
  } catch (error) {
    console.warn(`⚠ Could not copy directory ${from}: ${error.message}`);
  }
}

async function copyDirRecursive(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirRecursive(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function createPackageInfo() {
  console.log('📦 Creating package info...');

  const packageJson = JSON.parse(
    await fs.readFile(join(rootDir, 'package.json'), 'utf-8')
  );

  const buildInfo = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    license: packageJson.license,
    buildDate: new Date().toISOString(),
    files: [
      'index.html',
      'manifest.json',
      'sw.js',
      'assets/',
      'README.md',
      'INSTALL.md',
      'USER_GUIDE.md',
      'LICENSE'
    ]
  };

  await fs.writeFile(
    join(distDir, 'BUILD_INFO.json'),
    JSON.stringify(buildInfo, null, 2)
  );

  console.log('✓ Package info created');
}

async function build() {
  console.log('🚀 Building heater-shutdown-checker...\n');

  try {
    // Step 1: Clean
    await cleanDist();

    // Step 2: Copy files
    console.log('\n📂 Copying files...');
    for (const file of filesToCopy) {
      await copyFile(file.from, file.to);
    }

    // Step 3: Copy directories
    console.log('\n📁 Copying directories...');
    for (const dir of dirsToCopy) {
      await copyDir(dir.from, dir.to);
    }

    // Step 4: Create package info
    console.log('');
    await createPackageInfo();

    // Step 5: Done
    console.log('\n✅ Build completed successfully!');
    console.log(`\n📦 Distribution package created in: ${distDir}`);
    console.log('\nNext steps:');
    console.log('  - Test: npm run preview');
    console.log('  - Deploy: Push to GitHub or create a release');
  } catch (error) {
    console.error('\n❌ Build failed:', error);
    process.exit(1);
  }
}

// Run build
build();
