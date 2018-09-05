##定义
```
//创建
var module = (function(){
                var privateName = 'inner';            //私有变量
                var privateFunc = function(){        //私有函数
                    console.log('私有函数')
                }

                return {                            
                    name: 'rouwan',                    //公有属性
                    sayName:function(){                //公有函数
                        console.log(this.name)
                    }
                }
            })()
//使用
module.sayName();    //'rouwan'

```
