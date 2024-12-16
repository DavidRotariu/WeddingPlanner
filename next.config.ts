import { NextConfig } from 'next';
const nextConfig = {
    output: 'export',
    webpack: (config: NextConfig) => {
        config.externals = [...config.externals, { canvas: 'canvas' }]; // required to make Konva & react-konva work
        return config;
    }
};

module.exports = nextConfig;
