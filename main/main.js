const { app, BrowserWindow } = require('electron');
const path = require('path');
const {spawn} = require('child_process')

// Configurar electron-reload para observar tanto el directorio actual como los archivos HTML en la carpeta 'views'
const mainDir = __dirname;
const viewsDir = path.resolve(__dirname, '..','views');
const scriptsDir = path.resolve(__dirname, '..',"public", 'js');  
const stylesDir = path.resolve(__dirname, '..', "public", "css");    

// Configuracion de electron-reload para observar múltiples directorios
require('electron-reload')([mainDir, viewsDir, scriptsDir, stylesDir], {
    electron: require(`${path.join(__dirname, '..', 'node_modules', 'electron')}`),
});



//Atributos para la ventana Electron
const createWindow = () => {
    const win = new BrowserWindow({
        minWidth: 650,
        minHeight: 650,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            },
    });
    // win.loadFile(path.join(__dirname, '..','frontend','react_app','build','index.html')) //esto es para cuando quiera ver el proyecto en produccion
    // win.loadFile(path.join(viewsDir, 'main.html')); //esto se hace si quiero cargar los archivos locales.
    win.loadURL('http://localhost:3000') //esto es para cuando se quieran abrir los puertos en para react.
    win.webContents.openDevTools();
    
};



app.on('ready', () => {
    // Iniciar el servidor FastAPI **PYTHON**
    fastapiProcess = spawn('uvicorn', ['app.main:app', '--host', '127.0.0.1', '--port', '5000'], {
        env: { ...process.env, PYTHONPATH: './fastapi' },
        stdio: 'inherit'
    });

    fastapiProcess.on('error', (error) => {
        console.error(`Error starting FastAPI: ${error}`);
    });

    fastapiProcess.on('exit', (code, signal) => {
        console.log(`FastAPI process exited with code ${code} and signal ${signal}`);
    });

    createWindow();
});

//MacOs Configuration
app.on ('window-all-closed', ()=> {
    if (process.platform !== 'darwin'){
        app.quit();
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


//SE CIERRA EL SERVIDOR UVICORN CUANDO CIERRO LA APLICACIÓN.
app.on('quit', () => {
    if (fastapiProcess) {
        fastapiProcess.kill('SIGINT');
    }
});