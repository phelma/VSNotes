const vscode = require('vscode');

module.exports = async function () {
  const uri = vscode.Uri.file(vscode.workspace.getConfiguration('vsnotes').get('defaultNotePath'));

  // We need to check if a workspace folder is open. VSCode doesn't allow
  // findInFile if a workspace folder isn't available.
  const openWorkspace = vscode.workspace.workspaceFolders;
  if (openWorkspace == null) {
    vscode.window.showWarningMessage('Whoops, can\'t search without an open folder in the workspace. Open notes folder?', ...['Open']).then(val => {
      if (val == 'Open') {
        vscode.commands.executeCommand('vscode.openFolder', uri)
      }
    })
  } else {
    vscode.commands.executeCommand('filesExplorer.findInFolder', uri)
  }
}