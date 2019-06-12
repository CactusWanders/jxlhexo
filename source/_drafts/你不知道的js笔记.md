---
title: 你不知道的js笔记
tags:
---
## 第一部分 作用域和闭包
### 第1章 作用域是什么
#### 1.1 编译原理
传统编译语言中，源代码执行前三个编译步骤
1.分词/词法分析
2.语法解析
3.生成代码

这个要注意，后面会用到

❓js的编译步骤不一样

    首先，JavaScript 引擎不会有大量的(像其他语言编译器那么多的)时间用来进行优化，因 为与其他语言不同，JavaScript 的编译过程不是发生在构建之前的。
    对于 JavaScript 来说，大部分情况下编译发生在代码执行前的几微秒(甚至更短!)的时 间内。在我们所要讨论的作用域背后，JavaScript 引擎用尽了各种办法(比如 JIT，可以延 迟编译甚至实施重编译)来保证性能最佳。
    简单地说，任何 JavaScript 代码片段在执行前都要进行编译(通常就在执行前)。因此， JavaScript编译器首先会对var a = 2;这段程序进行编译，然后做好执行它的准备，并且 通常马上就会执行它。

❓此处考虑JS的回收机制是不是与JAVA的不一样，以及其编译是否为即时编译，这样的编辑方式会引发什么现象

#### 1.2 理解作用域

• 引擎 从头到尾负责整个 JavaScript 程序的编译及执行过程。
• 编译器 负责语法分析及代码生成。
• 作用域 负责收集并维护由所有声明的标识符(变量)组成的一系列查 询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。

1. 作用域的使用： 
```
var a = 2
```
关于这段代码的解析
```
   引擎                编译器               作用域
  var a   ①------------------------------->|②
                                         是否存在a
                                            |
                                  Y|----------------|N
                                  END    当前作用域声明新变量a
                                            |
                 生成运行时所需代码  ----------|③
                        |
  运行a=2  <-------------|④
     |
     |------------------------------------->|⑤
                                         是否存在a
                                            |
                                  Y|----------------|N
                                  赋值              异常
```
在操作②和⑤中，引擎查询方式影响其查询结果，例子中引擎会为变量a执行LHS查询。新概念了解下：

2. 作用域查询： LHS&RHS
当变量出现在赋值操作的左侧时进行 LHS 查询，右侧时进行 RHS 查询。
讲得更准确一点，RHS是查找某个变量的值，LHS是试图找到变量的容器，从而可以对其赋值。从这个角度说，RHS 并不是真正意义上的“赋 值操作的右侧”，更准确地说是“非左侧”。
概念上最好将其理解为“赋值操作的目标是谁(LHS)”以及“谁是赋值操作的源头(RHS)”。


    关于RHS考虑代码：
    console.log( a );
    这个不是个赋值操作，需要查找a的值，然后传输给console.log(...)

考虑下面的程序，其中既有 LHS 也有 RHS 引用:
```
function foo(a) { // RHS
    console.log( a ); // 2
}
foo( 2 );
```
书中的流程翻译的很有意思，贴出来乐呵乐呵：

    引擎:我说作用域，我需要为 foo 进行 RHS 引用。你见过它吗?
    作用域:别说，我还真见过，编译器那小子刚刚声明了它。它是一个函数，给你。
    引擎:哥们太够意思了!好吧，我来执行一下 foo。
    引擎:作用域，还有个事儿。我需要为 a 进行 LHS 引用，这个你见过吗?
    作用域:这个也见过，编译器最近把它声名为 foo 的一个形式参数了，拿去吧。
    引擎:大恩不言谢，你总是这么棒。现在我要把 2 赋值给 a。
    引擎:哥们，不好意思又来打扰你。我要为 console 进行 RHS 引用，你见过它吗?
    作用域:咱俩谁跟谁啊，再说我就是干这个。这个我也有，console 是个内置对象。 给你。
    引擎:么么哒。我得看看这里面是不是有 log(..)。太好了，找到了，是一个函数。
    引擎:哥们，能帮我再找一下对 a 的 RHS 引用吗?虽然我记得它，但想再确认一次。
    作用域:放心吧，这个变量没有变动过，拿走，不谢。
    引擎:真棒。我来把 a 的值，也就是 2，传递进 log(..)。
    ......

画❤重点 
1.[foo 进行 RHS] 函数声明与普通变量的声明不一样，这里有一个重要的细微差别，编译器可以在代码生成的同时处理声明和值 的定义，比如在引擎执行代码时，并不会有线程专门用来将一个函数值“分 配给”foo。因此，将函数声明理解成前面讨论的 LHS 查询和赋值的形式并 不合适。
2.[a 进行 LHS] 传参的时候是需要进行一次LHS查询的
3.[再找一下对 a 的 RHS 引用] 参数在被使用的时候依然会进行一次查找再操作

😂好久没看见课后作业了---小测验 
检验一下到目前的理解程度。把自己当作引擎，并同作用域进行一次“对话”:
function foo(a) {
    var b = a;
    return a + b;
}
var c = foo( 2 );
1. 找到其中所有的LHS查询。(这里有3处!)
2. 找到其中所有的RHS查询。(这里有4处!)

概念上最好将其理解为“赋值操作的目标是谁(LHS)”以及“谁是赋值操作的源头(RHS)”。或者“查找的目的是对变量进行赋值”(LHS);“目的是获取变量的值”(RHS)。这样理解很容易找出来

#### 1.3 作用域嵌套
当一个块或函数嵌套在另一个块或函数中时，就发生了作用域的嵌套。因此，在当前作用域中无法找到某个变量时，引擎就会在外层嵌套的作用域中继续查找，直到全局作用域为止。

#### 1.4 异常
严格模式禁止自动或隐式地创建全局变量，会报ReferenceError的异常。但在正常模式下，未声明的左查询变量，全局作用域中就会创建一个具有该名称的变量，并将其返还给引擎。右查询的变量依然会报ReferenceError的异常。

### 第2章 词法作用域
第 1 章介绍过，大部分标准语言编译器的第一个工作阶段叫作词法化(也叫单词化)。回忆一下，词法化的过程会对源代码中的字符进行检查，如果是有状态的解析过程，还会赋予单词语义。
词法作用域根据你变量定义及块作用域决定，绝大多数情况下（说是有欺骗词法作用域的方法），处理器不会改变作用域。
```
{                                   // 标识符foo
    function foo(a) {               // 标识符a, b bar
        var b = a * 2;
        function bar(c) {           // 标识符c
            console.log( a, b, c );
        }
        bar( b * 3 );
    }
    foo( 2 );
}
```
{}分成了三个嵌套，创建了各自的标识符。这里的作用域块都是完全包含于父作用域的，作用域查找会逐级向上找，并且会在找到第一个匹配的标识符时停止。
在多层的嵌套作用域中可以定义同名的标识符，这叫作“遮蔽效应”(内部的标识符“遮蔽”了外部的标识符)。这时候是无法调用被遮蔽的标识符的。
全局变量的特殊性。全局变量会变成全局对象的属性，当需要调用被遮蔽的全局变量时可以使用 window.a 就可以被调用了。
函数的特殊性。函数的词法作用域只有函数所在的代码块决定。
词法作用域查找只会查找一级标识符，比如 a、b 和 c。如果代码中引用了 foo.bar.baz，词法作用域查找只会试图查找 foo 标识符，找到这个变量后，对象属性访问规则会分别接管对 bar 和 baz 属性的访问。

eval和with的方法可忽略，因为在严格模式几乎被禁止了，而且由于不知道会是什么代码，所以无法进行静态分析，无法做性能优化。

上面讲到绝大多数情况下（说是有欺骗词法作用域的方法），处理器不会改变作用域。欺骗词法的两种方法：eval， with。重点：欺骗词法作用域会导致性能下降。

eval： eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。
```
{ // 标识符foo, b
    function foo(str, a) { // 标识符str, a
        eval( str ); // 欺骗!
        console.log( a, b );
    }
    var b = 2;
    foo( "var b = 3;", 1 ); // 输出结果1，3
}
```
注意欺骗的部分，这个代码块中并没有b，理应到上层查找值为2。但在非严格模式下，由于执行了`eavl("var b = 3;")`，造成了在foo里创建了变量b，并遮蔽了上层的变量。(严格模式下，eval(..) 在运行时有其自己的词法作用域，意味着其 中的声明无法修改所在的作用域。所以结果是1，2)

with：with 语句用于设置代码在特定对象中的作用域。
```
function foo(obj) {
    with (obj) {
        a = 2;
        b = 3;
        var cccc = 4;
    }
    alert(cccc) // 4
}
var o = { a: 3};
foo( o );
console.log( o ); // {a: 2}
console.log( a );  // ReferenceError: a is not defined
console.log( b );  //  3
console.log( cccc );  // ReferenceError: a is not defined
```
分析代码，with给代码块指定了作用域，a=2 LHS则会给obj作用域的a赋值2。b=3，找不到b，会寻找上层，由于with会处理为完全隔离的词法作用域，即在全局创建了b。


### 第3章 函数作用域和块作用域
产生作用的结构有哪些？首先是函数。反过来说，函数可以创建作用，隐藏变量。隐藏方法大多是从最小特权原则引申出来的。此外还可以避免命名冲突、模块管理。
函数作用域

函数声明`function f1(args){ .. }`和函数表达式`(function f2(args){ .. }(args))`
    区分函数声明和表达式最简单的方法是看 function 关键字出现在声明中的位 置(不仅仅是一行代码，而是整个声明中的位置)。如果 function 是声明中 的第一个词，那么就是一个函数声明，否则就是一个函数表达式。
常见的函数表达式的使用是立即执行函数及函数回调
```
    setTimeout(function() {
        console.log("I waited 1 second!");
    }, 1000 );
```
这个回调函数表达式是匿名的，函数声明则不可无名。一个描述性的名称可以让代码不言自明，建议函数还是起个名字。

代码块里也可以产生作用域，如`if{..}else{..}`, `for(){..}`, `try{}catch(){}`

ES6中定义了let关键字，与var申明的变量作用域不同。let 关键字可以将变量绑定到所在的任意作用域中(通常是 { .. } 内部)。

### 第4章 提升
变量和函数的所有声明都会在任何代码被执行前首先被处理。
变量的提升
```
console.log( a ); // undefined
var a = 2;
```
函数表达式和函数声明的提升
```
foo();
function foo() {
    console.log('somethig'); // somethig
}
```
```
foo1();
var foo1 = function foo1() {
    console.log('somethig');
} // Uncaught TypeError: foo1 is not a function
```
函数声明在变量声明之前
```
foo(); // 1
var foo;
function foo() {
    console.log( 1 );
}
foo = function() {
    console.log( 2 );
};
```
会被理解成
```
function foo() {
    console.log( 1 );
}
foo(); // 1
foo = function() {
    console.log( 2 );
};
```
注意，var foo尽管出现在function foo()...的声明之前，但它是重复的声明(因此被忽略了)，因为函数声明会被提升到普通变量之前。

### 第5章 作用域闭包
闭包是困扰我很久的概念，直到在知乎上看到轮子哥对闭包的解释，我又重新学闭包：
    闭包不是私有啊，闭的意思不是“封闭内部状态”，而是“封闭外部状态”啊。一个函数如何能封闭外部状态呢，当外部状态的scope失效的时候，还有一份留在内部状态里面...
Kyle Simpson说JavaScript中闭包无处不在，你只需要能够识别并拥抱它。闭包是基于词法作用域书写代码时所产生的自然结果，你甚至不需要为了利用它们而有意 识地创建闭包。闭包的创建和使用在你的代码中随处可见。你缺少的是根据你自己的意愿 来识别、拥抱和影响闭包的思维环境。

当函数可以记住并访问所在的词法作用域时，就产生了闭包。
作者书里分了函数和循环的闭包，但是我这边感觉都是块的闭包
```
function foo() {
    var a = 2;
    function bar() { console.log( a );}
    return bar; 
}
var baz = foo();
baz(); // 2 —— 朋友，这就是闭包的效果。
```
在使用全局作用域里是没有a变量的，但是将bar值传递给了baz，baz便能获取到foo作用域的a变量。
当然这也的实例没什么实际作用，典型的闭包：
```
function wait(message) {
    setTimeout( function timer() {
        console.log( message );
    }, 1000 );
}
wait( "Hello, closure!" );
```
内部函数timer传给setTimeout。而timer具有wait(..)的作用域的闭包，因此还能拿到message的引用。
再或者jQuery的
```
function setupBot(name, selector) {
    $( selector ).click( function activator() {
        console.log( "Activating: " + name );
    });
}
setupBot( "Closure Bot 1", "#bot_1" );
setupBot( "Closure Bot 2", "#bot_2" );

```
这个用过jQuery的应该都写过，这里面activator方法保有setupBot的作用域
经典的面试题
```
for (var i=1; i<=5; i++) {
    setTimeout( function timer() {
        console.log( i );
    }, i*1000 );
}
```
都知道这个会打印5个6。为什么呢？因为在n秒后，timer会拿到for的作用域的i，而此时for的作用域的i值为6。
那么怎么让代码符合我们的预期呢？
根据上面写的，需要给他创建作用域，而这个作用域里i的值为对应的1，2，3，4，5
```
for (var i=1; i<=5; i++) {
	(function temp() { // 创建作用域
		var a = i; // 绑定数据
		setTimeout( function timer() {
			console.log( a );
        }, i*1000 );
     })();
}
```
如果没有var a = i;这个赋值会怎么样？5个6，为什么? 作用域会向上查找，如果没有赋值给a，那个temp的作用域是空的，将查找for，其实是没有任何变化的，只是加了个块结构。
作用域的时候说到ES6的变量定义了let，会将作用域固定在当前域里。
```
for (let i=1; i<=5; i++) {
    setTimeout( function timer() {
        console.log( i );
    }, i*1000 );
}
```
我承认，这是我觉得let最好用的时候。
for循环头部的 let 声明还会有一个特殊的行为。这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量。
这相当于
```
for (var i=1; i<=5; i++) {
    let j = i; // 是的，闭包的块作用域!
    setTimeout( function timer() {
        console.log( j );
    }, j*1000 );
}
```
也就是在for作用域里，绑定let j。

说下我对闭包的理解，把数据锁定在一定的作用域里，在其他使用。
闭包使用威力在模块中很明显。
现代的模块机制
```
var MyModules = (function Manager() {
    var modules = {};
    function define(name, deps, impl) {
        for (var i=0; i<deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply( impl, deps );
    }
    function get(name) {
        return modules[name];
    }

    return {
        define: define,
        get: get 
    };
})();

MyModules.define( "bar", [], function() {
    function hello(who) {
        return "Let me introduce: " + who;
    }
    return {
        hello: hello
    };
} );
MyModules.define( "foo", ["bar"], function(bar) {
    var hungry = "hhippo";
    function awesome() {
        console.log( bar.hello( hungry ).toUpperCase() );
    }
    return {
        awesome: awesome
    };
} );
var bar = MyModules.get( "bar" );
var foo = MyModules.get( "foo" );
console.log(
    bar.hello( "hippo" )
); // Let me introduce: hippo 
foo.awesome(); // LET ME INTRODUCE: HIPPO
```
代码很美，但是ES6更美，大家还是愉快的使用ES6的模块吧。
总结下，闭包是代码程序作用域的方式所产生的现象，他不是模式，也不是工作，是有作用域即会有的存在。当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包。

<!--
## 第二部分 this和对象原型
如果你觉得你不是很了解this，那就先抛开你对this所有的认知。
this与词法作用域不一样，他是在运行时才绑定的。与函数声明的位置没有关系，它指向什么完全取决于函数在哪里被调用。

提取下要素：
1. 调用位置
寻找调用位置就是寻找“函数被调用的位置”即哪里调用了他。那就要分析调用栈，也就是函数调用链。分析当前执行函数的前一个调用。
2. 绑定规则
    * 默认绑定
    ```
    function foo() {
        console.log( this.a );
    }
    var a = 2;
    foo(); // 2
    ```
    这里foo并没有调用他的对象，默认为全局调用， this 指向全局对象。严格模式下，全局对象无法使用默认绑定，因此 this 会绑定到undefined。
    * 隐式绑定
    ```
    function foo() {
        console.log( this.a );
    }
    var obj = {
        a: 2,
        foo: foo
    };
    obj.foo(); // 2
    ```
    调用foo的是obj，显然this指向了obj。当函数引用有上下文对象时，会将this隐式绑定在上下文对象。
    看下面两个代码，理解下`分析当前执行函数的前一个调用`。
    ```
    function foo() {
        console.log( this.a );
    }
    var obj2 = {
        a: 42,
        foo: foo
    };
    var obj1 = { 
        a: 2,
        obj2: obj2
    };
    obj1.obj2.foo(); // 42
    ```
    ```
    function foo() {
        console.log( this.a );
    }
    var obj = {
        a: 2,
        foo: foo
    };
    var bar = obj.foo; // 函数别名!
    var a = "oops, global"; // a是全局对象的属性
    bar(); // "oops, global"
    ```
    * 显式绑定
    `call(..)`和`apply(..)`方法。
    ```
    function foo() {
        console.log( this.a );
    }
    var obj = {
        a:2
     };
     foo.call( obj ); // 2
     ```
     书中介绍了“隐式丢失”的概念，个人觉得这个是作用域的概念。解决“隐式丢失”使用了“硬绑定”的概念，是再包装一层，保证任何调用已经做好绑定。个人觉得模块上用得到，个人使用的少，暂不深入研究，可以研究下call，apply，bind的区别。
    * API调用的“上下文”
    ```
    function foo(el) {
        console.log( el, this.id++ );
    }
    var obj = {
        id: 1
    };
    // 调用 foo(..) 时把 this 绑定到 obj 
    [1, 2, 3].forEach( foo, obj );
    console.log( obj.id );
    // 1 1, 2 2, 3 3, 4
    ```
    可以看到这里没有做任何显示绑定，但是obj确实被绑定到了forEach方法作用域里。实际上这些函数就是通过call或apply做了显示绑定。
    * new绑定
    需要定义下JavaScript 中的“构造函数”，构造函数只是使用new操作符被调用的函数，与一般面向对象的构造函数不一样，不会实例化类。
    ```
    function foo(a) {
        this.a = a;
    }
    var bar = new foo(2);
    console.log( bar.a ); // 2
    ```
3. 优先级
    new绑定 > 显式绑定 > 隐式绑定 > 默认绑定








 -->
