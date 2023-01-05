const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

module.exports = () => {
  const log = require("electron-log")
  log.transports.file.level = "debug"
  autoUpdater.logger = log
  autoUpdater.autoDownload = false;

  console.log('check update...')
  autoUpdater.checkForUpdates()

  autoUpdater.on('update-available', () => {

    dialog.showMessageBox({
      type: 'info',
      title: 'Update avaible',
      title: 'Update avaible',
      message: "A new version of Smartapp is Avaible. Do you want to update now?",
      buttons: [
        'Update', 'no'
      ]
    }).then((res) => {
      let buttonIndex = res.response;

      if (buttonIndex == 0) {
        autoUpdater.downloadUpdate()
      }
    })

    autoUpdater.on('update-downloaded', () => {

      dialog.showMessageBox({
        type: 'info',
        title: 'Update ready',
        title: 'Update avaible',
        message: "Install & restart now?",
        buttons: [
          'Yes', 'Later'
        ]
      }).then((res) => {
        let buttonIndex = res.response;

        if (buttonIndex == 0) {
          autoUpdater.quitAndInstall(false, true);
        }


      })

    })


  })
}


