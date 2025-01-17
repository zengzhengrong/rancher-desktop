import { execFileSync } from 'child_process';
import os from 'os';

async function runScripts() {
  await (await import('./download/moby-openapi.mjs')).default();
  switch (os.platform()) {
  case 'linux':
    await (await import('./download/tools.mjs')).default('linux');
    await (await import('./download/lima.mjs')).default();
    break;
  case 'darwin':
    await (await import('./download/tools.mjs')).default('darwin');
    await (await import('./download/lima.mjs')).default();
    break;
  case 'win32':
    await (await import('./download/tools.mjs')).default('win32');
    await (await import('./download/tools.mjs')).default('wsl');
    await (await import('./download/wsl.mjs')).default();
    break;
  }
}

runScripts().then(() => {
  execFileSync('node', ['node_modules/electron-builder/out/cli/cli.js', 'install-app-deps'], { stdio: 'inherit' });
})
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
