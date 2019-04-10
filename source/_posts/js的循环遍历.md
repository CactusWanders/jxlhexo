---
title: js的循环遍历
date: 2019-04-10 16:48:37
tags:
---


## while
当符合while条件的时候执行，语句可能不会执行
```
    var a = 2;
    while(a<10) {
        console.log(a);
        a+=1;
    }
```
## do...while
先执行，再检查while条件是否符合。语句至少会被执行一次
```
    var a = 2;
    do {
        console.log(a);
        a+=1;
    } while(a<2) 
```
## for
```
    for(var a = 2; a<10; a+=2) {
        console.log(a);
        a+=1; 
    }
```
## for...in
遍历对象所有可枚举的属性。
```
    var obj = [111, 222, 333]; //此处可以是数组，对象，字符串
    obj.test="tttest";
    for(v in obj) {
        console.log(v);//返回1, 2, 3, test
    }

```
## for...of
遍历迭代器，Iterator 接口主要供for...of消费。
原生具备 Iterator 接口的数据结构如下。
Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象
```
    var obj = [111, 222, 333]; //此处可以是数组，对象，字符串
    obj.test="tttest";
    for(v of obj) {
        console.log(v);//返回111,222,333, 注意没有tttest
    }

```
## Array.map
遍历数组，不可中断
```
    var obj = [111, 222, 333]; //此处可以是数组，对象，字符串
    obj.test="tttest";
    var res = obj.map((item, index) => item+1); // res [ 112, 223, 334 ]
```
## Array.forEach
遍历数组，不可中断
```
    var obj = [111, 222, 333]; //此处可以是数组，对象，字符串
    obj.test="tttest";
    obj.forEach((item, index) => console.log(item)); // res [ 112, 223, 334 ]
```
## Array.filter
遍历数组，不可中断
```
    var obj = [111, 222, 333]; //此处可以是数组，对象，字符串
    obj.test=555;
    var res = obj.filter((item, index) => item>222); // res [ 333 ]
```
## Array.some
遍历数组
```
    var obj = [111, 222, 333]; //此处可以是数组，对象，字符串
    obj.test=555;
    var res = obj.some((item, index) => item>222); // res true
```
## Array.every
遍历数组
```
    var obj = [111, 222, 333]; //此处可以是数组，对象，字符串
    obj.test=555;
    var res = obj.every((item, index) => item>222); // res false
```
## Array.reduce
遍历数组
```
    var obj = [111, 222, 333]; //此处可以是数组，对象，字符串
    obj.test=555;
    var res = obj.reduce((val1, val2) => {
        if (val1 + val2 > 400) {
            return '大于400';
        } else {
            return val1 + val2
        }
    }); // res 大于400，没有if条件，结果666
```
## Array.reduceRight
遍历数组，相较于Array.reduce，从右向左计算
```
    var obj = [111, 222, 333]; //此处可以是数组，对象，字符串
    obj.test=555;
    var res = obj.reduceRight((val1, val2) => val1 + val2); // res 666
```
## Object.keys
遍历对象
```
    var obj = [111, 222, 333]; //此处可以是数组，对象，字符串
    obj.test=555;
    var res = Object.keys(obj); // res [ '0', '1', '2', 'test' ]
```
## Object.getOwnPropertyNames
遍历对象
```
    var obj = {}; //此处可以是数组，对象，字符串
    obj.test=555;
    var res = Object.getOwnPropertyNames(obj); // res [ '0', '1', '2', 'length', 'test' ]因数组有个属性length
```
## 编外知识点
#### label, break, continue
例子不是很好，领会意图就好😅
```
    // 不使用label 
    for (var i=1; i < 10 ; i++){
        for (j = i; j < 10 ; j++){
            console.log(`${i} * ${j} = ${i * j}`);
        }
    }

    //label与break实现99乘法表
    var i=1;
    outPoint:
    for (; i < 10 ; i++){
        for (j = 1; j < 10 ; j++){
            if (i < j) {
                continue outPoint;
            } else {
                console.log(`${i} * ${j} = ${i * j}`);
            }
        }
    }

    //label与continue实现99乘法表
    for (var i=1; i < 10 ; i++){
        outPoint:
        for (j = i; j < 10 ; j++){
            if (i > j) {
                break outPoint;
            } else {
                console.log(`${i} * ${j} = ${i * j}`);
            }
        }
    }
```


