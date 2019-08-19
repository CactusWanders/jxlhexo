---
title: angularjs简学
date: 2019-08-19 13:39:05
tags:
---
项目需要使用H3BPM，这个项目是2004的项目，使用的前端代码框架有原生js，大量依赖jQuery和angularjs，小部分使用vue。由于完全不曾接触过angular，先试用写个demo
## angular的概要
2012年发布，成熟的MVC框架，DOM操作偏向jQuery，view层偏向vue（其实是vue借鉴angular，因为较熟悉vue才这样说）。
AngularJS 应用组成如下：
    View(视图), 即 HTML。
    Model(模型), 当前视图中可用的数据。
    Controller(控制器), 即 JavaScript 函数，可以添加或修改属性。

## [指令](https://www.runoob.com/angularjs/angularjs-reference.html)
AngularJS 通过 ng-directives 扩展了 HTML。
ng-app 指令定义一个 AngularJS 应用程序。
ng-model 指令把元素值（比如输入域的值）绑定到应用程序。
ng-bind 指令把应用程序数据绑定到 HTML 视图。
ng-init 指令初始化 AngularJS 应用程序变量。
ng-options  创建一个下拉列表,选项是一个对象
ng-repeat   for循环
ng-disabled 指令直接绑定应用程序数据到 HTML 的 disabled 属性。
ng-show  隐藏或显示一个 HTML 元素。
ng-hide 指令用于隐藏或显示 HTML 元素。
ng-click 指令定义了 AngularJS 点击事件。
ng-model 指令来实现数据绑定。
ng-include 指令来包含 HTML 内容,嵌套html
[指令参考手册](https://www.runoob.com/angularjs/angularjs-reference.html)
## 表达式
AngularJS 表达式写在双大括号内：{{ expression }}。
AngularJS 表达式把数据绑定到 HTML，这与 ng-bind 指令有异曲同工之妙。
类似于 JavaScript 表达式，AngularJS 表达式可以包含字母，操作符，变量。
与 JavaScript 表达式不同，AngularJS 表达式可以写在 HTML 中,支持过滤器,表达式不支持条件判断，循环及异常。
## 应用
AngularJS 模块（Module） 定义了 AngularJS 应用。
AngularJS 控制器（Controller） 用于控制 AngularJS 应用。
ng-app指令指明了应用, ng-controller 指明了控制器。
### 作用域
Scope 是一个对象，有可用的方法和属性。
Scope(作用域) 是应用在 HTML (视图) 和 JavaScript (控制器)之间的纽带。Scope 可应用在视图和控制器上。
```
    <div ng-app="myApp" ng-controller="myCtrl">
        <input ng-model="name">
        <h1>{{greeting}}</h1>
        <button ng-click='sayHello()'>点我</button>    
    </div>
    
    <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.name = "Runoob";
        $scope.sayHello = function() {
            $scope.greeting = 'Hello ' + $scope.name + '!';
        };
    });
    </script>
```
所有的应用都有一个 $rootScope，它可以作用在 ng-app 指令包含的所有 HTML 元素中。
### 控制器
AngularJS 控制器是常规的 JavaScript 对象。
AngularJS 控制器 控制 AngularJS 应用程序的数据。
### 过滤器
    ---
    currency	格式化数字为货币格式。
    lowercase	格式化字符串为小写。
    orderBy		根据某个表达式排列数组。
    uppercase	格式化字符串为大写。
    filter		从数组项中选择一个子集。
    ---
除filter以外是给数据做个转换，使用方法
```
  // 使用
  <li ng-repeat="x in names | filter:test | orderBy:'country'">
    {{ (x.name | uppercase) + ', ' + x.country }}
  </li>
  // 自定义
  app.filter('reverse', function() { //可以注入依赖
    return function(text) {
        return text.split("").reverse().join("");
    }
  });
```
### 服务
angular有自己的生命周期，为让js服务更好的适用于ng，ng封装了30+个服务。这些服务可以适用生命周期，并且与$watch结合。
如原生js的$location, $http, $timeout, $interval, $http。
也可以自定义
```
app.service('hexafy', function() {
    this.myFunc = function (x) {
        return x.toString(16);
    }
});
app.controller('myCtrl', function($scope, hexafy) {
    $scope.hex = hexafy.myFunc(255);
});
```
### 模块
通过 AngularJS 的 angular.module 函数来创建模块：
### 自定义指令传值
### 控制器间数据使用
### 可不可以多个angular.module
## 全局 API
## Bootstrap
AngularJS Bootstrap
AngularJS 的首选样式表是 Twitter Bootstrap， Twitter Bootstrap 是目前最受欢迎的前端框架。
查看 [Bootstrap教程](https://www.runoob.com/bootstrap/bootstrap-tutorial.html)。
## [什么是依赖注入](https://www.runoob.com/angularjs/angularjs-dependency-injection.html)
wiki 上的解释是：依赖注入（Dependency Injection，简称DI）是一种软件设计模式，在这种模式下，一个或更多的依赖（或服务）被注入（或者通过引用传递）到一个独立的对象（或客户端）中，然后成为了该客户端状态的一部分。
该模式分离了客户端依赖本身行为的创建，这使得程序设计变得松耦合，并遵循了依赖反转和单一职责原则。与服务定位器模式形成直接对比的是，它允许客户端了解客户端如何使用该系统找到依赖
```
一句话 --- 没事你不要来找我，有事我会去找你。
```
AngularJS 提供很好的依赖注入机制。以下5个核心组件用来作为依赖注入：
value 是一个简单的 javascript 对象，用于向控制器传递值（配置阶段）：
factory 是一个函数用于返回值。在 service 和 controller 需要时创建。
service
provider 通过 provider 创建一个 service、factory等(配置阶段)。 Provider 中提供了一个 factory 方法 get()，它用于返回 value/service/factory。
constant constant(常量)用来在配置阶段传递数值，注意这个常量在配置阶段是不可用的。
注意这些使用的生命周期阶段
## [路由](https://www.runoob.com/angularjs/angularjs-routing.html)
ng可以实现单页面应用，路由格式是：
http://runoob.com/#!/mypagerouter
当我们点击链接时，向服务端请的地址都是一样的 (http://runoob.com/)。 因为 #! 号之后的内容在向服务端请求时会被浏览器忽略掉。 所以我们就需要在客户端实现 #! 号后面内容的功能实现。 AngularJS 路由就通过 #! + 标记 帮助我们区分不同的逻辑页面并将不同的页面绑定到对应的控制器上
## [实例](https://www.runoob.com/angularjs/angularjs-examples.html)
## [api](https://www.runoob.com/angularjs/angularjs-reference.html)