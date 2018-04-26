const path = require('path');
const fs = require('fs-extra');

async function copyFile (file) {
    const buildPath = path.resolve(__dirname, '../build', path.basename(file));
    await fs.copy(file, buildPath);
    console.log(`Copied ${file} to ${buildPath}`);
}

async function copyCSSFile (CSS) {
    const buildPathEs = path.resolve(__dirname, '../build/es/style/index.css');
    const buildPathLib = path.resolve(__dirname, '../build/lib/style/index.css');
    await fs.copy(CSS, buildPathEs);
    console.log(`Copied ${CSS} to ${buildPathEs}`);
    await fs.copy(CSS, buildPathLib);
    console.log(`Copied ${CSS} to ${buildPathLib}`);
}

async function createPackageJson () {
    const packageJson = await new Promise(resolve => {
        fs.readFile(path.resolve(__dirname, '../package.json'), 'utf-8', (err, data) => {
            if (err) throw err;
            resolve(data);
        });
    });
    const packageData = JSON.parse(packageJson);
    const buildPackageData = Object.assign(packageData, {
        name: 'react-touch-ripple',
        main: './lib/index.js',
        module: './es/index.js',
    });
    const buildPath = path.resolve(__dirname, '../build/package.json');

    await new Promise(resolve => {
        fs.writeFile(buildPath, JSON.stringify(buildPackageData, null, 2), 'utf8', err => {
            if (err) throw err;
            console.log(`Created package.json in ${buildPath}`);
            resolve();
        });
    });
}

(async function run () {
    await ['README.md', 'LICENSE', 'CHANGELOG.md'].map(file => copyFile(file));
    await copyCSSFile('src/style/index.css');
    await createPackageJson();
})();