---
title: JS面试题搜罗
tags:
---

## 原始类型有哪几种？null 是对象吗？原始数据类型和复杂数据类型存储有什么区别？
null, undefined, boolean, string, number, symbol
[typeof null 返回的值是 object，但是null是基本类型，不属于对象](https://www.cnblogs.com/wzybnzy/p/7232618.html)
原始类型存储是数据，复杂数据类型存储地址并指向某一存储空间。复制的时候复制其存储，不改变其指向

## typeof 是否正确判断类型? instanceof呢？ instanceof 的实现原理是什么？
typeof判断null为object，判断基本类型ok。复杂类型能判断方法为function，其余为object
instanceof判断是否为某一个对象的实例
原型链实现

## for of , for in 和 forEach,map 的区别。
详见"[js的循环遍历](/2019/04/10/js的循环遍历/)"

## 如何判断一个变量是不是数组
array自带方法：Array.isArray()
实例 [] instanceof Array

## 类数组和数组的区别是什么？
类数组是什么？ let arrayLike = {'0':'JACK','1':'LINDA',length: 2 }
这是个含length属性的对象，数据键值为0序增。不是Array的实例
类数组可以转成数组 Array.from(arrayLike)

## == 和 === 有什么区别？
== 比较值
===比较数据类型和值
==的比较顺序
```
                          类型是否相同
Y|-----------------------------|N
 |                             |
 |                          类型转换
 |-----------------------------|
                        null或undefined
                               |
Y|-----------------------------|N
true                     string或number
                               |
Y|-----------------------------|N
转成number比较           boolean +  任意 
                               |
Y|-----------------------------|N
boolean          object +  string或number或symbol 
转成number                      |
                       object转成基础类型比较
```

## [] == ![]
比较顺序
1.看运算符优先级： !最高，==> [] == false
2.boolean不同类型比较：  ==> [] == 0
3.object不同类型比较：   ==> 0 == 0
返回true

## ES6中的class和ES5的类有什么区别？
ES5的类的表现方式是原型链
ES6中引入的 class 实质上是基于原型的继承的语法糖。类语法不会为JavaScript引入新的面向对象的继承模型。
与函数表达式一样，类语法有两个组成部分：类表达式和类声明。

类的使用是在严格模式下的
函数表达式会有函数提升，即在函数声明前可以调用。类不可以，会抛出ReferenceError
ES6有静态方法的概念，使用静态方法时不需要实例化类。通常用于为一个应用程序创建工具函数。
[值得看一下的示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes#%E7%94%A8%E5%8E%9F%E5%9E%8B%E5%92%8C%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95%E5%8C%85%E8%A3%85)


## ❤️ 数组的哪些API会改变原数组？

## let、const 以及 var 的区别是什么？
var：声明的变量的作用域是整个封闭函数，有变量提升
let：声明一个作用域被限制在块级中的变量、语句或者表达式。与var关键字不同的是，var声明的变量只能是全局或者整个函数块的。不可重复定义
const： 常量是块级作用域。常量的值不能通过重新赋值来改变，并且不能重新声明。不可重复定义、不可以重复赋值

## 在JS中什么是变量提升？什么是暂时性死区？
var存在变量提升，在未定义前就可以使用，值为undefined
let、const没有变量提升，在未定以前使用会报错。所有暂存性死区的问题let、const共有
[暂时性死区](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let#let_%E7%9A%84%E6%9A%82%E5%AD%98%E6%AD%BB%E5%8C%BA%E4%B8%8E%E9%94%99%E8%AF%AF)

## ❤️ 如何正确的判断this? 箭头函数的this是什么？


## Array方法
concat()	连接两个或更多的数组，并返回结果。
```
var a = [1,2,3];
var b = [4,5,6];
a.concat(b); // result [1,2,3,4,5,6]
```
copyWithin()	从数组的指定位置拷贝元素到数组的另一个指定位置中。
```
var a = [1,2,3];
var b = [4,5,6];
a.copyWithin(b); // result [1,2,3,4,5,6]
```
entries()	返回数组的可迭代对象。
every()	检测数值元素的每个元素是否都符合条件。
fill()	使用一个固定值来填充数组。
filter()	检测数值元素，并返回符合条件所有元素的数组。
find()	返回符合传入测试（函数）条件的数组元素。
findIndex()	返回符合传入测试（函数）条件的数组元素索引。
forEach()	数组每个元素都执行一次回调函数。
from()	通过给定的对象中创建一个数组。
includes()	判断一个数组是否包含一个指定的值。
indexOf()	搜索数组中的元素，并返回它所在的位置。
isArray()	判断对象是否为数组。
join()	把数组的所有元素放入一个字符串。
keys()	返回数组的可迭代对象，包含原始数组的键(key)。
lastIndexOf()	返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
map()	通过指定函数处理数组的每个元素，并返回处理后的数组。
pop()	删除数组的最后一个元素并返回删除的元素。
push()	向数组的末尾添加一个或更多元素，并返回新的长度。
reduce()	将数组元素计算为一个值（从左到右）。
reduceRight()	将数组元素计算为一个值（从右到左）。
reverse()	反转数组的元素顺序。
shift()	删除并返回数组的第一个元素。
slice()	选取数组的的一部分，并返回一个新数组。
some()	检测数组元素中是否有元素符合指定条件。
sort()	对数组的元素进行排序。
splice()	从数组中添加或删除元素。
toString()	把数组转换为字符串，并返回结果。
unshift()	向数组的开头添加一个或更多元素，并返回新的长度。
valueOf()

## 参考文章

[【面试篇】寒冬求职季之你必须要懂的原生JS(上)](https://juejin.im/post/5cab0c45f265da2513734390?utm_source=gold_browser_extension#heading-25)
[MDN](https://developer.mozilla.org/zh-CN/)
