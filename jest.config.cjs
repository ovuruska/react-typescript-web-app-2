module.exports = {
    preset: 'ts-jest',
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    coveragePathIgnorePatterns: ['node_modules', 'src/index.tsx', 'src/setupTests.ts','**.mock.ts'],
    coverageDirectory: 'coverage',
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
        "^@quicker/(.*)$": "<rootDir>/$1",
        "^@domain/(.*)$": "<rootDir>/domain/$1",
        "^@components/(.*)$": "<rootDir>/components/$1",
        "^@hooks/(.*)$": "<rootDir>/hooks/$1",
        "^@utils/(.*)$": "<rootDir>/utils/$1",
        "^@data/(.*)$": "<rootDir>/data/$1",

    },
    module: "esnext",
    setupFiles: ['./jest.setup.cjs'],
    rootDir: 'src',
    testEnvironment: 'jsdom',
}



