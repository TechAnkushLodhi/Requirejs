# Requirejs

# RequireJS in Magento 2

## Overview

Magento 2 uses RequireJS for asynchronous module loading and dependency management. This allows for improved performance and modularity in the JavaScript code. Below are the key properties of RequireJS configuration and how they are used in Magento 2:

## Key RequireJS Properties in Magento 2

### 1. `map`
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
