---
title: bug记录
date: 2019-04-03 16:33:50
tags:
---
## autocomplete
使用用户名密码登录，浏览器会将用户名密码记住。退出后再登录需要使用验证码，会发现验证码也自动填充了用户名。为了修改该bug，查询了autocomplete的使用。
autocomplete设置是为了让浏览器自动填充，autocomplete的属性值用于记录自动填充到哪个位置。
解决代码：
```
    <form>
        <input type="text" id="username" autocomplete=“username”>
        <input type="password" id="password" autocomplete=password>
        <button type="submit" onclick=>确定</button>
    <form>
```

其他属性值参考：[The HTML autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
QQ浏览器无法记录自动填充数据的问题待验证