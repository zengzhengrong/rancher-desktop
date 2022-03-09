import { BrowserView, BrowserWindow } from 'electron';
import { windowMapping } from '.';

const dashboardURL = 'http://127.0.0.1:9080/dashboard/c/local/explorer';

export function openDashboard() {
  const window = new BrowserWindow({
    title:  'Rancher Dashboard',
    width:  800,
    height: 600
  });

  const view = new BrowserView();
  const windowSize = window.getContentSize();

  window.setBrowserView(view);

  view.setBounds({
    x:      0,
    y:      0,
    width:  windowSize[0],
    height: windowSize[1],
  });

  view.setAutoResize({ width: true, height: true });

  view.webContents
    .loadURL(dashboardURL)
    .catch((err) => {
      console.error(`Can't load the dashboard URL ${ dashboardURL }: `, err);
    });

  windowMapping['dashboard'] = window.id;
}

export function closeDashboard() {
  const window = ('dashboard' in windowMapping) ? BrowserWindow.fromId(windowMapping['dashboard']) : null;

  if (!window) {
    return;
  }

  window.close();
}