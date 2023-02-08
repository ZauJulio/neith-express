#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example :');
  console.log('    npx create-neith-express my-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  err.code === 'EEXIST'
    ? console.log(`The file ${projectName} already exist.`)
    : console.log(err);

  process.exit(1);
}

function copyTemplate(src, dest, ignore = []) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (exists && isDirectory) {
    fs.mkdirSync(dest, { recursive: true });

    fs.readdirSync(src).forEach((childItemName) => {
      if (!ignore.includes(childItemName)) {
        copyTemplate(
          path.join(src, childItemName),
          path.join(dest, childItemName),
          ignore,
        );
      }
    });
  } else if (!isDirectory) {
    fs.copyFileSync(src, dest);
  }
}

async function main() {
  try {
    copyFiles();
    gitInit();
    installDependencies();

    console.log('  >>> The installation is done, this is ready to use!');
  } catch (error) {
    console.log(error);
  }

  function copyFiles() {
    console.log("[1/3] Let's create your app...");
    console.log('  >>> Copying files...');
    // Fetch the template and copy it to the project folder
    copyTemplate(path.join(__dirname, '../'), projectPath, [
      'node_modules',
      'packages',
      'bin',
      '.git',
    ]);

    // Create .env file based on .env.example
    const envExamplePath = path.join(projectPath, '.env.example');

    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, path.join(projectPath, '.env'));
    }

    console.log('  >>> Creating the project...');
    process.chdir(projectPath);
  }

  function gitInit() {
    console.log("[2/3] Let's initialize git...");
    console.log('  >>> Initializing git...');
    execSync('git init');
  }

  function installDependencies() {
    console.log("[3/3] Let's install the dependencies...");
    console.log('  >>> Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    console.log("  >>> Initializing git's hooks...");
    execSync('npx husky install');
  }
}

main();
