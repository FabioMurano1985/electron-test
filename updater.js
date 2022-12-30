const { autoUpdater } = require("electron-updater");




module.exports=()=>{
    const log = require("electron-log")
    log.transports.file.level = "debug"
    autoUpdater.logger = log
    autoUpdater.checkForUpdates

console.log('check update...')

}
