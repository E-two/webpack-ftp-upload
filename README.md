# webpack-ftp-upload
webpack plugin for ftp upload

## Installation
```bash
npm i -D webpack-ftp-upload
```
or
```
yarn add --dev webpack-ftp-upload
```

## Usage
add following code to your webpack config file.
```javascript
const WebpackFtpUpload = require('webpack-ftp-upload')

new WebpackFtpUpload('path'); // path.join(__dirname, '..')           
```

## add .ftpcon
```javascript
    {
        "host": "x.x.x.x",
        "port": "22",
        "username": "xx",
        "password": "xxx",
        "path": "remote path"
    }
```

## Simple example
```javascript
const WebpackFtpUpload = require('webpack-ftp-upload')

module.exports = {
    entry: 'ftp.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'ftp_bundle.js'
    },
    plugins: [
        new WebpackFtpUpload('path')
    ]
}
```

## License

MIT © [etwo](https://github.com/E-two)