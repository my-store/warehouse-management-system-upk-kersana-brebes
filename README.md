# Sistem Pembukuan Milik UPK Kersana/ Kradenan
Aplikasi ini berbasis desktop yang dibangun menggunakan bahasa pemrograman JavaScript (ElectronJS), aplikasi ini menggunakan NeDB (versi LITE dari MongoDB) sebagai penyimpanan data dan hanya dapat digunakan di Laptop/ PC dengan sistem:

* Windows 32/64 bit
* Proc min Intel Core2Dou
* RAM min 2GB
* HDD min 100GB (kosong)

### Helpers
* String
* Files
* Calendar
* Model/ Database

### Dependencies
* react
* react-dom
* nedb-async
* find-remove
* password-hash

### Dev-Dependencies
* @babel/core 
* @babel/preset-env 
* @babel/preset-react 
* css-loader 
* style-loader 
* sass-loader 
* sass 
* webpack 
* webpack-cli 
* babel-loader
* electron-reload

### Instruction
* git clone https://github.com/my-store/electron-react-boilerplate.git
* Install all needed dependencies
* If you install electron in globally and also use Linux, type in terminal:
\
**$ whereis electron**
\
in my own, this command returned /usr/local/bin/electron, that is my electron path
* Update app.js in line 79 with your own electron path
* If you install electron not in globally, the path is:
\
your-project-folder/node_modules/.bin/electron

### Creator
* Izzat Alharis