import { plugin } from "typescript-eslint";

module.exports = {
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-syntax-import-assertions'
    ]
};