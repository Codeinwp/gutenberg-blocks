module.exports = {
    presets: [
        '@babel/preset-env',
        '@emotion/babel-preset-css-prop'
    ],
    plugins: [
        '@babel/plugin-transform-async-to-generator',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        [
            '@babel/plugin-transform-react-jsx', {
                pragma: 'wp.element.createElement',
                pragmaFrag: 'wp.element.Fragment'
            }
        ]
    ]
}