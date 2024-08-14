var config = {
    paths: {
        'exampleLib': 'Development_Shim/js/example-lib' // Path to your library

    },
    shim: {
        'exampleLib': {
            deps: ['jquery'], // Dependencies of your library
            exports: 'exampleLib' // The global variable name
        }
    }
};
