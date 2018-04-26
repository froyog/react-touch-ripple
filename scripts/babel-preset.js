const ENV = process.env.BABEL_ENV;
let babelPreset = {};

babelPreset = {
    presets: [[
        require('babel-preset-env').default,
        {
            targets: {
                ie: 9,
                edge: 14,
                safari: 10,
            },
            modules: ENV === 'modules' ? false : 'commonjs',
        }
    ]]
};

module.exports = babelPreset