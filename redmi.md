# Il map (es. pippo.map.js) file associa il file non minimizzato al file minimizzato. Se apporti modifiche al file non minimizzato, le modifiche si rifletteranno automaticamente nella versione minimizzata del file.


# per configurazione webpack (funzionante ma non in uso dall'applicazione leggere nei commenti)

# check update logs
C:\Users\{nomeutente}\AppData\Roaming\Smartapp\logs\main.lo

# per effettuare un rilascio
cambiare la versione nel package.json es 1.0.1
preparare in draft il tag su github con la versione che stiamo per rilasciare 1.0.1
effettuiamo il rilascio da terminale "npm run release" (non dimenticandoci di aggiungere il token github)
set GH_TOKEN  su windows
export GH_TOKEN su mac

