define(['originalModule'], function(originalModule) {
    return {
        message: 'Hello from the special replacement module! : From By original module ' + originalModule.message
    };
});
