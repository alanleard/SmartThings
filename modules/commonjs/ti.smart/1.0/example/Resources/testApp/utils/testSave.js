function createFile() {
	var file1 = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'testResults.xml');
	if(file1.exists()) {
		file1.deleteFile();
	}
}

function writeMethodFile(fileName, string) {
	var fileM = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, fileName);
	fileM.write(string);
	fileM = null;
}

function writeToFile(string) {
	var file1 = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'testResults.xml');
	file1.write(string);
	file1 = null;
}

function appendToFile(string) {
	var file1 = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'testResults.xml');
	file1.write(string, true);
	file1 = null;
}

function readFile() {
	var rfile1 = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'testResults.xml');
	var content = rfile1.read();
	rfile1 = null
	return content.text;
}

function readMethodFile(fileName) {
	var rfileM = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, fileName + '.xml');
	var content = rfileM.read();
	rfileM = null;
	return content.text;
}

