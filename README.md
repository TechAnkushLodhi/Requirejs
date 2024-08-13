# Requirejs

# RequireJS in Magento 2

## Overview

Magento 2 uses RequireJS for asynchronous module loading and dependency management. This allows for improved performance and modularity in the JavaScript code. Below are the key properties of RequireJS configuration and how they are used in Magento 2:

## Key RequireJS Properties in Magento 2

### 1. `map`
- **Purpose**: This property is used to map module IDs to different paths. It helps in redirecting module requests to alternative locations.
- **Usage**:
  ```javascript
  map: {
      '*': {
          'oldModule': 'newModule'
      }
  }

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
``` xml
<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>
        <referenceContainer name="content">
            <block class="Magento\Framework\View\Element\Template" name="maping_test" template="Development_Maping::test.phtml"/>
        </referenceContainer>
    </body>
</page>


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


**File: `app\code\Development\Maping\view\frontend\web\js\original-module.js`**
```javascript
define([], function() {
    return {
        greet: function() {
            console.log('Hello from the original module!');
        }
    };
});



**File: `app\code\Development\Maping\view\frontend\web\js\replacement-module.js`**
```javascript
define([], function() {
    return {
        greet: function() {
            console.log('Hello from the replacement module!');
        }
    };
});



**File: `app\code\Development\Maping\view\frontend\web\js\special-replacement.js`**
```javascript
define(['originalModule'], function(or) {
    return {
        greet: function() {
            console.log('Hello from the special replacement module!');
        }
    };
});


**File: `app\code\Development\Maping\view\frontend\requirejs-config.js`**
```javascript
var config = {
    paths:{
        'originalModule':'Development_Maping/js/original-module',  
        'specialModule':'Development_Maping/js/special-replacement',
        'replacementModule':'Development_Maping/js/replacement-module'
    },
    map: {
        '*': {
            'replacementModule': 'Development_Maping/js/original-module'
        },
        'specialModule': {
            'originalModule': 'Development_Maping/js/replacement-module'
        }
    }
};

