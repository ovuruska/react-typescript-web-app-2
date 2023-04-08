module.exports = {
    preset: 'ts-jest',
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    moduleNameMapper: {
        '\\.(scss|sass|css|less)$': 'identity-obj-proxy',
        "^@quicker/(.*)$": "<rootDir>/src/$1",
        "^@domain/(.*)$": "<rootDir>/src/domain/$1",
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
        "^@data/(.*)$": "<rootDir>/src/data/$1",
        "^@features/(.*)$": "<rootDir>/src/features/$1",
        "^@assets/(.*)$": "<rootDir>/src/assets/$1",
        "^@pages/(.*)$": "<rootDir>/src/pages/$1",

    },
    setupFiles: ['./jest.setup.cjs'],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    rootDir: '',
    testEnvironment: 'jsdom',
}



