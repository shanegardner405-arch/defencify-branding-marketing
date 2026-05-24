#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];

function rel(file) {
  return path.relative(root, file);
}

function read(relativePath) {
  const file = path.join(root, relativePath);
  if (!fs.existsSync(file)) {
    failures.push(`Missing required file: ${relativePath}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function localRefs(html) {
  const refs = [];
  const regex = /\b(?:src|href)=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(html))) {
    const value = match[1];
    if (
      value.startsWith('#') ||
      value.startsWith('http://') ||
      value.startsWith('https://') ||
      value.startsWith('mailto:') ||
      value.startsWith('tel:')
    ) continue;
    refs.push(value.split('#')[0].split('?')[0]);
  }
  return refs.filter(Boolean);
}

const index = read('index.html');
const growth = read('growth-asset-system.html');
const requiredFiles = [
  'assets/brandbook.css',
  'assets/pdf-shell.css',
  'assets/growth-system.css',
  'assets/defencify-logo.png',
  'assets/defencify-mark.jpeg',
  'assets/pdf/icons-grid.png',
  'prompts/defencify-icon-generation-contract.md',
  'prompts/defencify-model-comparison-methodology.md',
  'scripts/generate-defencify-model-comparison.sh',
  'brandbook-manifest.json',
  'package.json',
];

for (const file of requiredFiles) {
  assert(fs.existsSync(path.join(root, file)), `Missing required project resource: ${file}`);
}

for (const [name, html] of [['index.html', index], ['growth-asset-system.html', growth]]) {
  assert(html.includes('assets/growth-system.css'), `${name} must include assets/growth-system.css`);
  assert(html.includes('class="bb-nav bb-top-nav"'), `${name} must use the shared top page nav`);
  assert(html.includes('class="bb-left-toc"'), `${name} must use the left table of contents`);
  assert(html.includes('href="index.html"'), `${name} must link to Brand Guidelines page`);
  assert(html.includes('href="growth-asset-system.html"'), `${name} must link to Growth Asset System page`);

  for (const ref of localRefs(html)) {
    const refPath = path.join(root, ref);
    assert(fs.existsSync(refPath), `${name} references missing local resource: ${ref}`);
  }
}

assert(index.includes('href="index.html" aria-current="page"'), 'index.html must mark Brand guidelines as active');
assert(!index.includes('href="growth-asset-system.html" aria-current="page"'), 'index.html must not mark Growth asset system as active');
assert(growth.includes('href="growth-asset-system.html" aria-current="page"'), 'growth-asset-system.html must mark Growth asset system as active');
assert(!growth.includes('href="index.html" aria-current="page"'), 'growth-asset-system.html must not mark Brand guidelines as active');
assert(growth.includes('id="model-comparison"'), 'growth-asset-system.html must include #model-comparison');
assert(growth.includes('id="production-system"'), 'growth-asset-system.html must include #production-system');
assert(growth.includes('prompts/defencify-model-comparison-methodology.md'), 'growth-asset-system.html must link prompt methodology');
assert(index.includes('id="campaign-headline-lockup"'), 'index.html must document the campaign headline lockup');
assert(index.includes('Train every guard.') && index.includes('Set the standard.'), 'index.html must include the approved campaign headline example');

const modelCardCount = (growth.match(/<article class="model-output-card(?:\s|")/g) || []).length;
assert(modelCardCount === 6, `growth-asset-system.html must contain exactly 6 model output cards, found ${modelCardCount}`);
const productionOutputCount = (growth.match(/<article class="production-output(?:\s|")/g) || []).length;
assert(productionOutputCount === 7, `growth-asset-system.html must contain exactly 7 production output examples, found ${productionOutputCount}`);

const modelAssetRefs = [
  'assets/growth/model-comparison/gpt-image-2-photoreal-security-lobby.png',
  'assets/growth/model-comparison/nano-banana-pro-photoreal-security-lobby.png',
  'assets/growth/model-comparison/nano-banana-standard-photoreal-security-lobby.png',
  'assets/growth/model-comparison/gpt-image-2-access-control-icon.png',
  'assets/growth/model-comparison/nano-banana-pro-access-control-icon.png',
  'assets/growth/model-comparison/nano-banana-standard-access-control-icon.png',
];

for (const asset of modelAssetRefs) {
  assert(fs.existsSync(path.join(root, asset)), `Missing required model comparison asset: ${asset}`);
  assert(growth.includes(asset), `Growth page does not reference required model asset: ${asset}`);
}

let manifest = {};
try {
  manifest = JSON.parse(read('brandbook-manifest.json'));
} catch (error) {
  failures.push(`Invalid brandbook-manifest.json: ${error.message}`);
}
assert(manifest.project === 'defencify-branding-marketing' || manifest.project === 'defencify-brandbook-fixed', 'brandbook-manifest.json must bind to the Defencify brandbook project');
assert((manifest.pages || []).some(page => page.file === 'index.html'), 'brandbook-manifest.json must list index.html');
assert((manifest.pages || []).some(page => page.file === 'growth-asset-system.html'), 'brandbook-manifest.json must list growth-asset-system.html');
assert(manifest.productionSystem?.sectionId === 'production-system', 'brandbook-manifest.json must list the production-system section');
assert(manifest.productionSystem?.outputCount === 7, 'brandbook-manifest.json must list 7 production outputs');
assert(manifest.typography?.campaignHeadlineLockup?.id === 'campaign-headline-lockup', 'brandbook-manifest.json must list the campaign headline lockup');
assert(manifest.typography?.campaignHeadlineLockup?.lineOneColor === '#4F575C', 'brandbook-manifest.json must list campaign headline line-one color');
assert(manifest.typography?.campaignHeadlineLockup?.lineTwoColor === '#FCAF32', 'brandbook-manifest.json must list campaign headline line-two color');
for (const asset of modelAssetRefs) {
  assert((manifest.modelComparisonAssets || []).includes(asset), `brandbook-manifest.json missing model asset: ${asset}`);
}

const result = {
  status: failures.length ? 'FAIL' : 'PASS',
  root,
  checked: {
    pages: ['index.html', 'growth-asset-system.html'],
    modelCardCount,
    productionOutputCount,
    campaignHeadlineLockup: true,
    requiredFiles: requiredFiles.length,
    modelAssets: modelAssetRefs.length,
  },
  failures,
};

console.log(JSON.stringify(result, null, 2));

if (failures.length) {
  process.exit(1);
}
