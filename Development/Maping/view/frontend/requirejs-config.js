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

