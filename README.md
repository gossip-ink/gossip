# uIdea

一种基于 json 的快速创建 ppt 的语法，同时提供一个用户界面。

## JSON 语法

下面是一个简单的小例子。

```json
{
    "filename":"example",
    "globalVariables":{
        "fontColor": "black",
        "fontSize":25,
        "slideWidth":1000,
        "slideHeight":800
        //...
    },
    "userAttrVariables":[
        {
            "type":"Color",
            "value":"white",
            "name":"fontColor"
        },
        {
            "type":"Number",
            "value": 28,
            "name":"fontSize"
        }
        //...
    ],
    "structure":{
        "name": "h1",
        "id": 1,
        "children":[
            {
                "name": "h2",
                "id": 2,
            },
            {
                "name": "h2",
                "children":[
                    {
                         "name": "h3",
                         "id":3
                    },
                    {
                        "name": "h3",
                        "id":4
                    }
                ]
            }
        ]
    },
    "components":[
        {
            "type": "slide",
            "content": 1,
            "attrs":{
                "width":"_slideWidth",
                "height":"_slideHeight",
                "background":"$background",
                "childrenLayout":"col"
            },
            "children":[
                {
                    "type": "text",
                    "span": 1,
                    "attrs":{
                        "fontSize":"_fontSize",
                        "fontColor":"_fontColor",
                    }
                }
                ,
                {
                    "type":"panel",
                    "span":2,
                    "attrs":{
                        "background":"$background",
                    },
                    "childrenLayout":"col",
                    "children":[
                        {
                            "type":"canvas",
                            "span":1,
                            "content":"#2",
                        },
                        {
                            "type":"images",
                            "span":1,
                            "content":"#1",
                        }
                    ]
                }
            ]
        },
        //...
    ],
    "assets":[
        {
            "id":1,
            "content":"www.baidu.com/logo.png",
        },
        {
            "id":2,
            "content":"function draw(){}"
        }
    ]
}
```
