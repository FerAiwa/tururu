const { app, BrowserWindow } = require('electron')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 375,
    height: 800,
    frame: false,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/tururu/assets/logo.png`
  })


  win.loadURL(`file://${__dirname}/dist/tururu/index.html`)

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})

app.on('browser-window-created', function (e, window) {
  window.setMenu(null);
});
