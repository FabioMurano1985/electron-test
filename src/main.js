
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Tray, Menu, powerSaveBlocker ,dialog} = require('electron')
// Main process
const fs = require('fs');
const {jsPDF} = require('jspdf');
const { appMenu } = require('./menu');
const updater = require('./updater');
const base64 = require('base64topdf');




let mainWindow;
let saveSuccessWindow;
let noBlankValueModal;
let tray = null;
let isActive=false;
let id;



const appTryMenu = () => {
  app.whenReady().then(() => {
    tray = new Tray(`${__dirname}/assets/icons.png`)
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Always active ', click: () => {
          //Impedisce al sistema di entrare in modalità a basso consumo (sospensione).
          if (!isActive) {
             id = powerSaveBlocker.start('prevent-display-sleep')
             console.log(powerSaveBlocker.isStarted(id))
            } else {
              powerSaveBlocker.stop(id)
              console.log(powerSaveBlocker.isStarted(id))
            }
          mainWindow.webContents.send('always-active', { isActive});
          isActive=!isActive
          contextMenu.items[0].checked = isActive
          tray.setContextMenu(contextMenu);



        }
      },
      { role: 'quit' }
    ]);
    
    //tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu);

    tray.on('click', e => {
      if (e.shiftKey) {
        app.quit()
      } else {
     //   mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
      }
    })

  })
}





createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show:false,
    webPreferences: {
      nodeIntegration: true, // per usare node ed il require di node
      contextIsolation: false // per usare node ed il require di node
    }
  })

  // Create the browser window.
  saveSuccessWindow = new BrowserWindow({
    width: 500,
    height: 400,
    darkTheme: false,
    // autoHideMenuBar:true,
    frame:false,
    parent: mainWindow,
    show: false,
    modal: true,
    webPreferences: {
      nodeIntegration: true,  // per usare node ed il require di node
      contextIsolation: false // per usare node ed il require di node
    }
  })


  noBlankValueModal = new BrowserWindow({
    width: 500,
    height: 400,
   // autoHideMenuBar:true,
    frame:false,
    darkTheme: false,
    parent: mainWindow,
    show: false,
    modal: true,
    webPreferences: {
      nodeIntegration: true,  // per usare node ed il require di node
      contextIsolation: false // per usare node ed il require di node
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile(`${__dirname}/index-main.html`)
  saveSuccessWindow.loadFile(`${__dirname}/template/success.html`)
  noBlankValueModal.loadFile(`${__dirname}/template/no-blank-value.html`)


  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  //Create MENU
  appMenu(mainWindow)
  // Create TRAY
  appTryMenu()

  mainWindow.once('ready-to-show',mainWindow.show)



  setTimeout(() => {
    updater()
  }, 6000);

}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('gpu-process-crashed',()=>{
  alert('crash')
  app.relaunch()
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


ipcMain.handle('open-dialog', (res,msg,restype) => {
  dialog.showMessageBox({
    type:restype || 'info',
    message: msg,
  })
})


// No BLANK VALUE
ipcMain.handle('no-blank-value', (res) => {
  noBlankValueModal.show()
  setTimeout(() => {
    noBlankValueModal.hide()
  }, 3000);
})

//SAVE FILE HANDLER


ipcMain.handle('save-file', (e, data) => {
  const content = data;

  const homeDir = require('os').homedir();
  const desktopDir = `${homeDir}/Desktop`;
  const path=`${desktopDir}/_file.txt`
  fs.writeFile(`${path}`, content, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
    saveSuccessWindow.show()
    setTimeout(() => {
      saveSuccessWindow.hide()
    }, 3000);
  });
})



ipcMain.handle('save-pdf-file', (e, data) => {
  const content = data;

  const homeDir = require('os').homedir();
  const desktopDir = `${homeDir}/Desktop`;
  const path=`${desktopDir}/_file.pdf`;
 try {

  doc=new jsPDF();
  doc.text(content,10,10);
  doc.save(path)      
   // file written successfully
   saveSuccessWindow.show()
   setTimeout(() => {
     saveSuccessWindow.hide()
   }, 3000);
 } catch (error) {
  console.error(error);
 }
 

})









