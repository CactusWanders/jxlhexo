---
title: LESS从学习到入门
date: 2018-08-01 12:00:39
tags:
---
学习网站： <https://less.bootcss.com/>

Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。
Less 可以运行在 Node 或浏览器端。

## 变量（Variables）

```bash
    // 变量定义，作为参数值，可进行计算
    @nice-blue: #5B83AD; 
    @light-blue: @nice-blue + #111;
    // 变量定义，作为选择器 || URLs ||属性名
    @my-selector: banner;
    @img: "../img";
    @property: line-height;
    // 变量定义，作为变量的变量
    @primary: green;
    @color: primary;

    // 变量使用
    #header {
        color: @light-blue;
    }
    .@{my-selector} {
        @{property}: 40px;
        background: url("@{img}/demo.png");
    }
    .element {
        color: @@color;
    }
```
由于Less的变量是延迟求值的，所以并不是需要定义在使用前。当多次定义时，取当前作用域最后一次定义的值，如果当前作用域没有，向上搜索。
在v3.0.0后，可以使用$prop方式，将属性当成参数使用，作用域与变量是一致的。
如
```bash
    .block {
        color: red;
        .inner {
            background-color: $color;
        }
        color: blue;
    }
```
实现结果是：
```bash
.block {
  color: red;
  color: blue;
}
.block .inner {
  background-color: blue;
}
```

## 混合（Mixins）
定义mixin, 可以将已有的样式表当做变量使用
```bash
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```
使用方法
```bash
#menu a {
  color: #111;
  .bordered;
}
```

## 父选择器（&）
&代表所有父层样式名，若&的父层样式名为”.a .b"，对等关系如下：
```bash
    & + &    ==   .a .b + .a .b
    & &      ==   .a .b.a .b
    &&       ==   .a .b.a .b
    &, &ish  ==   .a .b, .a .bish
```
& 也可以使用在后面，更改代表的顺序
```bash
.header {
  .menu { 
    border-radius: 5px;
    .no-borderradius & {
      background-color: red; 
    } 
  } 
}
```
结果为 
```bash
.header .menu {
  border-radius: 5px; 
} 
.no-borderradius .header .menu {
  background-image: background-color: red; 
}
```
当父节点中的样式是“,”分割的时候，&便可展开成多种可能性。：
```bash
// 父节点为p, a, ul, li， & + & 有以下结果
    p + p
    p + a
    p + ul
    p + li
    a + p
    a + a
    a + ul
    a + li
    ul + p
    ul + a
    ul + ul
    ul + li
    li + p
    li + a
    li + ul
    li + li
```
## 嵌套（Extend）
使用&:extend(selector, selector)将指定的样式表应用于当前的样式
```bash
nav ul { 
  &:extend(.inline); 
  background: blue; 
}
.inline { 
  color: red; 
}
```
等价于
```bash
nav ul { 
  .inline
  background: blue; 
} 
.inline { 
  color: red; 
}
```
扩展所有相关样式的写法如下：
.c:extend(.d all) { 
  // extends all instances of ".d" e.g. ".x.d" or ".d.x”
}
## 合并（Merge）
属性值之间的换算
```bash
.mixin() { 
  box-shadow+: inset 0 0 10px #555;
  transform+_: scale(2); 
} 
.myclass { 
  .mixin(); 
  box-shadow+: 0 0 20px black;
  transform+_: rotate(15deg); 
}
```
结果为
```bash
.myclass { 
  box-shadow: inset 0 0 10px #555, 0 0 20px black; 
  transform: scale(2) rotate(15deg); 
}
```
+_或者+用于区分是不是需要合并，防止合并上不需要合并的样式。LESS会判断选择使用逗号还是空格来分隔样式
## 混合（Mixins）
可以将已有的样式表定义名称后，在其他样式表中调用
### 选择器调用
```bash
.a, #b { 
  color: red;   
  &:hover {
    border: 1px solid red; 
  } 
} 
.mixin-class { 
  .a(); 
} 
.mixin-id { 
  #b(); 
}
```
结果为
```bash
.a, #b { 
  color: red;   
  &:hover { border: 1px solid red; } 
} 
.mixin-class { 
  color: red;   
  &:hover {border: 1px solid red; } 
} 
.mixin-id { 
  color: red;   
  &:hover { border: 1px solid red; } 
}
```
如上可见，伪类的样式会被继承。同时会被继承的是：
* guard namespaces
* !important 关键词
* 带参数的混合（多参数混合时，继承可以被解析的部分）

当需要混合使用已有样式中某个样式时，可以如下使用，效果一样。
```bash
    // 代表同样的意义
    #outer > .inner; 
    #outer > .inner(); 
    #outer .inner; 
    #outer .inner(); 
    #outer.inner; 
    #outer.inner();
```
### 参数
如果定义的样式接受可变数量的参数，可以使用... 作为统一样式的参数。样式表里，使用@argument代表所有参数。使用@rest代表前面已经定义的参数外的其它参数。
```bash
// 定义
.mixin(...) { // matches 0-N arguments
.mixin() { // matches exactly 0 arguments
.mixin(@a: 1) { // matches 0-1 arguments
.mixin(@a: 1; ...) { // matches 0-N arguments
.mixin(@a; ...) {
// 使用
.mixin(@a; @rest...) { 
// @rest is bound to arguments after @a 
// @arguments is bound to all arguments
}
```
### 模式匹配

```bash
// 定义一下mixins
.mixin(dark; @color) { 
  color: darken(@color, 10%); 
} 
.mixin(light; @color) { 
  color: lighten(@color, 10%); 
} 
.mixin(@_; @color) { 
  display: block; 
}
// 调用
@switch: light; 
.class { 
  .mixin(@switch; #888); 
}
// 结果
.class { 
  color: #a2a2a2; 
  display: block; 
}
```
混合模式可以用来返回属性的定义。通过这样的方法，可以定义方法，方法可以套用
```bash
// 定义一下mixins
.average(@x, @y) { 
  @average: ((@x + @y) / 2); 
} 
// 调用
div { 
  .average(16px, 50px); // "call" the mixin 
  padding: @average; // use its "return" value
}
// 结果
div { 
  padding: 33px; 
}
```
## @import options
在项目里面，我们可以定义很多mixins，类似于js的全局方法，但需要视情况在产出时包括这些mixins

| 参数 | 意义 |
| --------- | :--------------------------------------------------------------- |
| reference | 该文件不被产出，只当做样式库使用。通过extend和mixins的方式引用该样式库的内容 |
| inline | 不经过编译直接产出到产出文件里|
| less | 指明引入的文件为less文件，忽略文件后缀。|
| css | 指明引入的文件为css文件，忽略文件后缀。|
| once | 默认使用该配置项，表示对同一个资源仅引入一次。|
| multiple | 表示对同一资源可引入多次。 |
| optional | 文件找不到时依旧继续编译|