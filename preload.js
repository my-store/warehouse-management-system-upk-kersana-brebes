const { ipcRenderer, contextBridge } = require("electron")
const path = require("path")

// Helpers
const Helper = require(path.join(__dirname, "helpers", "index"))

// Date & Time
let jam = "", menit ="", detik = "", hari = "", tanggal = "", bulan = "", tahun = ""
async function reloadCalendar() 
{
    // Assign date & time
    await Helper("Calendar")("Jam",(getJam)=>jam=getJam)
    await Helper("Calendar")("Menit",(getMenit)=>menit=getMenit)
    await Helper("Calendar")("Detik",(getDetik)=>detik=getDetik)
    await Helper("Calendar")("Hari",(getHari)=>hari=getHari)
    await Helper("Calendar")("Tanggal",(getTanggal)=>tanggal=getTanggal)
    await Helper("Calendar")("Bulan",(getBulan)=>bulan=getBulan)
    await Helper("Calendar")("Tahun",(getTahun)=>tahun=getTahun)
}

// Database
const { Model } = Helper("Model")
contextBridge.exposeInMainWorld("Database", Model)

// Notification
contextBridge.exposeInMainWorld("Notif", {
    send: _msg => ipcRenderer.send("notify", _msg)
})

// Helpers
contextBridge.exposeInMainWorld("Helper", {
    Calendar: Helper("Calendar"),
    String: Helper("String"),
    Files: Helper("Files"),

    Time: async () => {
        await reloadCalendar()
        return {jam, menit, detik, hari, tanggal, bulan, tahun, format: "WIB"}
    }
})