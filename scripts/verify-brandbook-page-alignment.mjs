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
const b2b = read('b2b-website-wireframes.html');
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
  'b2b-website-wireframes.html',
  'assets/growth/defencify-guard-company-shoulder-patch.svg',
  'package.json',
];

for (const file of requiredFiles) {
  assert(fs.existsSync(path.join(root, file)), `Missing required project resource: ${file}`);
}

for (const [name, html] of [['index.html', index], ['growth-asset-system.html', growth], ['b2b-website-wireframes.html', b2b]]) {
  assert(html.includes('assets/growth-system.css'), `${name} must include assets/growth-system.css`);
  assert(html.includes('class="bb-nav bb-top-nav"'), `${name} must use the shared top page nav`);
  assert(html.includes('class="bb-left-toc"'), `${name} must use the left table of contents`);
  assert(html.includes('href="index.html"'), `${name} must link to Brand Guidelines page`);
  assert(html.includes('href="growth-asset-system.html"'), `${name} must link to Growth Asset System page`);
  assert(html.includes('href="b2b-website-wireframes.html"'), `${name} must link to B2B wireframes page`);

  for (const ref of localRefs(html)) {
    const refPath = path.join(root, ref);
    assert(fs.existsSync(refPath), `${name} references missing local resource: ${ref}`);
  }
}

assert(index.includes('href="index.html" aria-current="page"'), 'index.html must mark Brand guidelines as active');
assert(!index.includes('href="growth-asset-system.html" aria-current="page"'), 'index.html must not mark Growth asset system as active');
assert(growth.includes('href="growth-asset-system.html" aria-current="page"'), 'growth-asset-system.html must mark Growth asset system as active');
assert(!growth.includes('href="index.html" aria-current="page"'), 'growth-asset-system.html must not mark Brand guidelines as active');
assert(b2b.includes('href="b2b-website-wireframes.html" aria-current="page"'), 'b2b-website-wireframes.html must mark B2B wireframes as active');
assert(!b2b.includes('href="index.html" aria-current="page"'), 'b2b-website-wireframes.html must not mark Brand guidelines as active');
assert(!b2b.includes('href="growth-asset-system.html" aria-current="page"'), 'b2b-website-wireframes.html must not mark Growth asset system as active');
assert(growth.includes('id="model-comparison"'), 'growth-asset-system.html must include #model-comparison');
assert(growth.includes('id="production-system"'), 'growth-asset-system.html must include #production-system');
assert(growth.includes('prompts/defencify-model-comparison-methodology.md'), 'growth-asset-system.html must link prompt methodology');
assert(index.includes('id="campaign-headline-lockup"'), 'index.html must document the campaign headline lockup');
assert(index.includes('Train every guard.') && index.includes('Set the standard.'), 'index.html must include the approved campaign headline example');
for (const id of ['overview', 'homepage', 'solutions', 'copilot', 'imagery', 'handoff']) {
  assert(b2b.includes(`id="${id}"`), `b2b-website-wireframes.html must include #${id}`);
}
assert(b2b.includes('assets/growth/defencify-guard-company-shoulder-patch.svg'), 'b2b-website-wireframes.html must include shoulder patch concept');
assert(b2b.includes('Shoulder patch concept'), 'b2b-website-wireframes.html must label the shoulder patch concept');
for (const phrase of [
  'SS Plus quality gate',
  'Security companies',
  'In-house security teams',
  'Post Ready',
  'Regulatory Intelligence',
  'Lead magnet ladder',
  'Production asset note',
  'Build handoff',
]) {
  assert(b2b.includes(phrase), `b2b-website-wireframes.html must include client-grade B2B content: ${phrase}`);
}

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
assert((manifest.pages || []).some(page => page.file === 'b2b-website-wireframes.html'), 'brandbook-manifest.json must list b2b-website-wireframes.html');
assert(manifest.productionSystem?.sectionId === 'production-system', 'brandbook-manifest.json must list the production-system section');
assert(manifest.productionSystem?.outputCount === 7, 'brandbook-manifest.json must list 7 production outputs');
assert(manifest.typography?.campaignHeadlineLockup?.id === 'campaign-headline-lockup', 'brandbook-manifest.json must list the campaign headline lockup');
assert(manifest.typography?.campaignHeadlineLockup?.lineOneColor === '#4F575C', 'brandbook-manifest.json must list campaign headline line-one color');
assert(manifest.typography?.campaignHeadlineLockup?.lineTwoColor === '#FCAF32', 'brandbook-manifest.json must list campaign headline line-two color');
for (const asset of modelAssetRefs) {
  assert((manifest.modelComparisonAssets || []).includes(asset), `brandbook-manifest.json missing model asset: ${asset}`);
}

const b2bImageryAssets = manifest.b2bWireframes?.imageryAssets || [];
assert(manifest.b2bWireframes?.file === 'b2b-website-wireframes.html', 'brandbook-manifest.json must list the B2B wireframe file');
assert((manifest.b2bWireframes?.sections || []).includes('handoff'), 'brandbook-manifest.json must list the B2B handoff section');
assert(b2bImageryAssets.includes('assets/growth/defencify-guard-company-shoulder-patch.svg'), 'brandbook-manifest.json must list shoulder patch asset');
for (const asset of b2bImageryAssets) {
  assert(fs.existsSync(path.join(root, asset)), `Missing B2B imagery asset: ${asset}`);
  assert(b2b.includes(asset), `B2B page does not reference imagery asset: ${asset}`);
}

const result = {
  status: failures.length ? 'FAIL' : 'PASS',
  root,
  checked: {
    pages: ['index.html', 'growth-asset-system.html'],
    b2bPage: 'b2b-website-wireframes.html',
    modelCardCount,
    productionOutputCount,
    campaignHeadlineLockup: true,
    requiredFiles: requiredFiles.length,
    modelAssets: modelAssetRefs.length,
    b2bImageryAssets: b2bImageryAssets.length,
  },
  failures,
};

console.log(JSON.stringify(result, null, 2));

if (failures.length) {
  process.exit(1);
}
