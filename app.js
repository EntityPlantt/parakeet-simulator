const {app, BrowserWindow} = require("electron");
const fs = require("fs");
const windowSettings = {
	"minWidth": 800,
	"minHeight": 600,
	"disableAutoHideCursor": true,
	"darkTheme": true,
	"fullscreen": true,
	"autoHideMenuBar": true,
	"webPreferences": {
		"devTools": false
	}
};
function createWindow() {
	const win = new BrowserWindow(windowSettings);
	win.loadFile("index.html");
}
app.whenReady().then(() => {
	createWindow();
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});