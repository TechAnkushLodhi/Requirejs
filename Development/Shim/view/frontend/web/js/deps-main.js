define(['DependencyOne', 'DependencyTwo'], function(DependencyOne, DependencyTwo) {
    return {
        init: function() {
            console.log('DepsMain initialized with:', DependencyOne.name, DependencyTwo.name);
        }
    };
});
