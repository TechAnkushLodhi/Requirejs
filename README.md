# Requirejs

# RequireJS in Magento 2

## Overview

Magento 2 uses RequireJS for asynchronous module loading and dependency management. This allows for improved performance and modularity in the JavaScript code. Below are the key properties of RequireJS configuration and how they are used in Magento 2:

## Key RequireJS Properties in Magento 2

# 1. `map`
#### Purpose of map in RequireJS
#### 1. `Alias Creation:`
 * `map` allows you to create aliases for module paths.
 * This makes your code cleaner and easier to manage by allowing you to use short and meaningful names for modules. 

```javascript
  var config = {
    map: {
        '*': {
            'maping': 'Development_Maping/js/maping'
        }
    }
};
```
** Here, maping is an alias for the Development_Maping/js/maping module.


#### 2. `Path Override:`
 * You can use map to override existing module paths.
 * This is useful if you want to use a different version of a library or make changes to existing modules.
```javascript
 var config = {
    map: {
        '*': {
            'jquery': 'path/to/your/jquery'
        }
    }
};

```
** This configuration replaces the default jQuery with a custom version.



### Example: Creating a New Module

## Different Different Module create for testing Map 
#### Module Name: 
* 1. `ExampleMapNew`
* 2. `ExampleMapOld`
*Note:* 
<span style="color: red;">Both of these modules depend on each other.</span>

* Blow main module for understanding Map
#### Module Name: `Development_Maping`

- **File: `app/code/Development/Maping/etc/module.xml`**
```xml

<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
    <module name="Development_Maping" setup_version="1.0.0"/>
</config>
```

**File: `app\code\Development\Maping\registration.php`**
```php
<?php
\Magento\Framework\Component\ComponentRegistrar::register(
    \Magento\Framework\Component\ComponentRegistrar::MODULE,
    'Development_Maping',
    __DIR__
);
```

**File: `app\code\Development\Maping\view\frontend\layout\default.xml`**
```xml
<!-- For Phtml file content show in Home Page  -->

<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>
        <referenceContainer name="content">
            <block class="Magento\Framework\View\Element\Template" name="maping_test" template="Development_Maping::test.phtml"/>
        </referenceContainer>
    </body>
</page>
```

**File: `app\code\Development\Maping\view\frontend\templates\test.phtml`**
```phtml
<h1>This is mapping</h1>

<script>
require(['specialModule'], function(specialModule) {
    console.log(specialModule.message);
});
require(['replacementModule'], function(specialModule) {
    console.log(specialModule.message);
});
</script>
```

**File: `app\code\Development\Maping\view\frontend\web\js\original-module.js`**
```javascript
define([], function() {
    return {
       message: 'This is the original module!'
    };
});
```


**File: `app\code\Development\Maping\view\frontend\web\js\replacement-module.js`**
```javascript
define([], function() {
    return {
        message:'Hello from the replacement module!'
    };
});
```


**File: `app\code\Development\Maping\view\frontend\web\js\special-replacement.js`**
```javascript
define(['originalModule'], function(originalModule) {
    return {
        message: 'Hello from the special replacement module! : From By original module ' + originalModule.message
    };
});
```

**File: `app\code\Development\Maping\view\frontend\requirejs-config.js`**
```javascript
// Define the RequireJS configuration
var config = {
    // Define paths for modules
    paths: {
        // Map the alias 'originalModule' to the module file 'original-module' in 'Development_Maping/js'
        'originalModule': 'Development_Maping/js/original-module',  
        
        // Map the alias 'specialModule' to the module file 'special-replacement' in 'Development_Maping/js'
        'specialModule': 'Development_Maping/js/special-replacement',
        
        // Map the alias 'replacementModule' to the module file 'replacement-module' in 'Development_Maping/js'
        'replacementModule': 'Development_Maping/js/replacement-module'
    },
    
    // Define module path overrides
    map: {
        // Map '*' means that the following mappings apply globally to all modules
        '*': {
            // Override 'replacementModule' to use 'original-module' instead
            'replacementModule': 'Development_Maping/js/original-module'
        },
        
        // Specific mapping for 'specialModule'
        // This is not magento madule, this Js module specialModule means : When you use define in a JavaScript file, you are creating a module. This module can include dependencies and 
        // return an object or function.
        'specialModule': {
            // Override 'originalModule' used within 'specialModule' to use 'replacement-module'
            'originalModule': 'Development_Maping/js/replacement-module'
        }
    }
};

```





# 2. `shim`

#### Purpose of shim in RequireJS

#### 1. `Dependencies:`
* The shim configuration allows you to define the dependencies of a library. You can specify which libraries or modules your library depends on using the deps property. This ensures that the required dependencies are loaded before your module, thus maintaining the correct loading order.

#### Example:
### Example: Creating a New Module

#### Module Name: `Development_Shim`

- **File: `app/code/Development/Shim/view/frontend/requirejs-config.js`**
```javascript
var config = {
    paths: {
        'DepsMain': 'Development_Shim/js/deps-main',
        'DependencyOne': 'Development_Shim/js/dependency-one',
        'DependencyTwo': 'Development_Shim/js/dependency-two',
        
    },
    shim: {
        'DepsMain': { // when use DepsMain , Before laod DependencyOne &  DependencyTwo file
            deps: ['DependencyOne','DependencyTwo'], // Specifies the dependencies of the module
        }
    }
};

```

#### 2. `Global Variables:`
* If your library defines global variables (e.g., window.exampleLib), you can use the exports property in the shim configuration to specify the name of the global variable. This ensures that RequireJS correctly identifies and uses the global variable when your module is loaded.

#### Example:
### Example: Creating a New Module

#### Module Name: `Development_Shim`

- **File: `app/code/Development/Shim/view/frontend/requirejs-config.js`**
```javascript
var config = {
    paths: {
        'exampleLib': 'Development_Shim/js/example-lib' // Path to your library
    },
    shim: {
        'exampleLib': {
            deps: ['jquery'], // Dependencies of your library
            exports: 'exampleLib' // The global variable name
            // if exports was not us in requirejs.config.js file then code don't run
        }
    }
};
```
** In this example, RequireJS will use window.exampleLib as the global variable for the module.


- **File: `app/code/Development/Shim/etc/module.xml`**
```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
    <module name="Development_Shim" setup_version="1.0.0"/>
</config>
```

**File: `app\code\Development\Shim\registration.php`**
```php
    <?php
    \Magento\Framework\Component\ComponentRegistrar::register(
        \Magento\Framework\Component\ComponentRegistrar::MODULE,
        'Development_Shim',
        __DIR__
    );
```

**File: `app\code\Development\Shim\view\frontend\layout\default.xml`**

```xml
<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>
        <referenceContainer name="content">
            <block class="Magento\Framework\View\Element\Template" name="shim_test" template="Development_Shim::test.phtml"/>
        </referenceContainer>
    </body>
</page>
```

**File: `app\code\Development\Shim\view\frontend\templates\test.phtml`**
```phtml
    <h1>This is shim</h1>

    <script type="text/javascript">
        require(['exampleLib'], function(exampleLib) {
            console.log('exampleLib loaded:', exampleLib);
            exampleLib.someFunction();
        });
    </script>

```

**File: `app\code\Development\Shim\view\frontend\web\js\example-lib.js`**

```javascript
// this is Synchronous code
window.exampleLib = {
    someFunction: function() {
        console.log('exampleLib function called');
    }
};
```







# 3. `paths`
## Description:
* In RequireJS, the paths configuration is used to define the paths to the JavaScript files for the modules. This allows you to specify the location of modules and provides a way to alias module paths.

#### Purpose of Paths in RequireJS

* 1. Simplify Module Loading: Provides an easy way to define and manage the paths to JavaScript files, avoiding the need to write long relative paths every time you require a module.
* 2. Alias Modules: Allows you to create shortcuts or aliases for module paths, making it easier to manage and reference modules in your project.

#### Example:
###  Creating a New Module

#### Module Name: `Development_ExamplePaths`

- **File: `app/code/Development/ExamplePaths/view/frontend/requirejs-config.js`**

```Javascript
var config = {
    paths: {
        'exampleModule': 'Development_ExamplePaths/js/exampleModule'
    }
};
```

- **File: `app/code/Development/ExamplePaths/view/frontend/web/js/exampleModule.js`**
```Javascript
define([], function() {
    'use strict';
    
    return {
        init: function() {
            console.log('Example Module Initialized');
        }
    };
});

```
- **File: `app/code/Development/ExamplePaths/view/frontend/web/js/initExampleModule.js`**
```Javascript
require(['exampleModule'], function(exampleModule) {
    exampleModule.init();
    console.log("hi");
});

```


- **File: `app/code/Development/ExamplePaths/view/frontend/layout/default.xml`**
```xml
<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <head>
        <script src="Development_ExamplePaths/js/initExampleModule.js"/>
    </head>
    <body>
        <referenceContainer name="content">
            <block class="Magento\Framework\View\Element\Template" name="requirejs_example" template="Development_ExamplePaths::example.phtml"/>
        </referenceContainer>
    </body>
</page>
```

- **File: `app/code/Development/ExamplePaths/view/frontend/templates/example.phtml`**
```phtml
<div>
    <h1>Example Paths Module</h1>
    <button id="example-button">Click Me</button>
</div>
<script type="text/javascript">
    require(['exampleModule'], function(exampleModule) {
        document.getElementById('example-button').addEventListener('click', function() {
            exampleModule.init();
        });
    });
</script>

```


- **File: `app/code/Development/ExamplePaths/etc/module.xml`**
```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
    <module name="Development_ExamplePaths" setup_version="1.0.0"/>
</config>
```

**File: `app\code\Development\ExamplePaths\registration.php`**
```php
    <?php
    \Magento\Framework\Component\ComponentRegistrar::register(
        \Magento\Framework\Component\ComponentRegistrar::MODULE,
        'Development_ExamplePaths',
        __DIR__
    );
```