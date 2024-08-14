var config = {
    paths: {
        //deps
        'DepsMain': 'Development_Shim/js/deps-main',
        'DependencyOne': 'Development_Shim/js/dependency-one',
        'DependencyTwo': 'Development_Shim/js/dependency-two',

        //exports
        'exampleLib': 'Development_Shim/js/example-lib' // Path to your library

    },
    shim: {
        'exampleLib': {
            deps: ['jquery'], // Dependencies of your library
            exports: 'exampleLib' // The global variable name
        },
        'DepsMain': { // Specifies configuration for DepsMain module
            deps: ['DependencyOne', 'DependencyTwo'], // List of dependencies
        },
        'DependencyOne': { // Specifies configuration for DepsMain module
            deps: ['DependencyTwo'], // List of dependencies
        }
    }
};
