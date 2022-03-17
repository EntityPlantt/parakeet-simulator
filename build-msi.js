(async() => {
	const { MSICreator } = require("electron-wix-msi");
	const path = require("path");

	const msiCreator = new MSICreator({
	    appDirectory: path.resolve(__dirname, "./Parakeet Simulator-win32-x64"),
	    outputDirectory: path.resolve(__dirname, "./msi"),
	    description: "A HTML/CSS/JS game about a parakeet (budgerigar)",
	    exe: "Parakeet Simulator",
	    name: "Parakeet Simulator",
	    manufacturer: "EntityPlantt",
	    appIconPath: path.resolve(__dirname, "./icon.ico"),
	    version: "1.0.0",
	    shortcutFolderName: "Parakeet Simulator",
	    ui: {
	        chooseDirectory: true,
	        images: {
	        	background: path.resolve(__dirname, "./assets/msi-background.jpg")
	        }
	    }
	});
	await msiCreator.create();
	await msiCreator.compile();
	console.log("Done!");
})();