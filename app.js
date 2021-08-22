const electron = require("electron")
const path = require("path")
const url = require("url")

let ROMBAX = null // Main window
const {app, BrowserWindow, Menu, ipcMain, Notification, screen} = electron

// Production | Development
process.env.NODE_ENV = app.isPackaged ? "production" : "development" // Set production

// Autoreload in Development
if(process.env.NODE_ENV === "development")
{
    require("electron-reload")(__dirname, {
        electron : path.join(__dirname, "node_modules", ".bin", "electron"),
        ignored: [
            /src|[\/\\]\./,

            /node_modules|[\/\\]\./,
            /databases|[\/\\]\./,

            /public\/fonts|[\/\\]\./,
            /public\/icons|[\/\\]\./,
            /public\/img|[\/\\]\./,

            /webpack.common.js/,
            /package-lock.json/,
            /package.json/,
            /.prettierrc/,
            /preload.js/,
            /.gitignore/,
            /README.md/
        ], 
        argv: []
    })
}

// Entry Point
app.whenReady().then(() =>
{
    // Get user screen size
    const { width, height } = screen.getPrimaryDisplay().workAreaSize

    // Main window
    ROMBAX = new BrowserWindow({
        webPreferences : {
            contextIsolation            : true,
            worldSafeExecuteJavaScript  : true,
            preload                     : path.join(__dirname, "preload.js"),
        },
        height, width, minHeight: 600, minWidth: 900,
        title       : "UPK Kradenan",
        frame       : true, // Disable Close & Minimize buton
        resizable   : true,
        icon        : path.join(__dirname, "./assets/icons/win/icon.ico")
    })

    // Load HTML
    if (BrowserWindow.getAllWindows().length > 0)
    {
        ROMBAX.loadURL(url.format({
            pathname    : path.join(__dirname, "main.html"),
            protocol    : "file:",
            slashes     : true
        }))
    }

    // Remove menu
    // Menu.setApplicationMenu(null)

    // On close listener
    ROMBAX.on("closed", () => ROMBAX = null)
})

app.on("window-all-closed", () => app.quit())

// Notification
ipcMain.on("notify", (_, _msg) => new Notification({title : "Notification", body : _msg}).show())