const fs = require('fs');
const path = require('path');

const AUTH_DIR = path.join(process.cwd(), 'test-results', 'auth');
const AUTH_FILE = path.join(AUTH_DIR, 'storageState.json');

function ensureAuthDirectory() {
  fs.mkdirSync(AUTH_DIR, { recursive: true });
}

function authFilePath() {
  ensureAuthDirectory();
  return AUTH_FILE;
}

module.exports = { authFilePath };