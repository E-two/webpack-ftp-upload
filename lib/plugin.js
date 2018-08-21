const fs = require('fs');
const Client = require('scp2');
const iconv = require('iconv-lite');
const colors = require('colors');
const path = require('path');

class WebpackFtpUploadPlugin {
  constructor(local) {
    this.local = local;
    this.options = {};
    this.startTime = null;
    this.endTime = null;
  }

  apply(compiler) {

    this.options = this.getFtpCon();
    this.options.local = this.local;

    compiler.plugin('done', compilation => {
      if (!this.options.port) {
        this.options.port = 22;
      }

      this.startTime = Date.now();
      console.log('\nStart upload, please wait...'.green);

      this.upload(this.options.local, this.options);
    })
  }

  upload(local, obj) {
    Client.scp(local, obj, err => {
      if (err) throw err;
      this.endTime = Date.now();
      console.log(`Uploaded ${local} successfully in ${this.endTime - this.startTime}ms`.green);
    })
  }
}

WebpackFtpUploadPlugin.prototype.read = function(filepath, options) {
  if (!options) {
    options = {};
  }
  let contents;
  console.info(`\nReading ${filepath}, please wait...`.green);
  try {
    contents = fs.readFileSync(String(filepath));
    if (options.encoding !== null) {
      contents = iconv.decode(contents, 'utf8', {
        stripBOM: true,
      });
    }
    return contents;
  } catch (e) {
    console.error(`Unable to read "${filepath}" file (Error code: ${e.code}).`, e);
  }
};

WebpackFtpUploadPlugin.prototype.getFtpCon = function() {
  const ftpcon = path.resolve('.ftpcon');

  if (fs.existsSync(ftpcon)) {
    return JSON.parse(this.read(ftpcon));
  }
  console.info('Need to provide ftpcon configuration file'.yellow);
  return {};
};

module.exports = WebpackFtpUploadPlugin;
