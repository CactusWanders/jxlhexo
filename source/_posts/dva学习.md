---
title: dva+roadhog学习
date: 2019-02-15 15:00:45
tags:
---

项目使用，学习一下。了解下我们用的是什么
[dva](https://dvajs.com/)： 基于React和Redux的轻量级elm-style框架。
[roadhog](https://www.npmjs.com/package/roadhog)：cli 工具，提供 server、 build 和 test 和 mock功能。提供了 JSON 格式的配置方式。

根据官方文档，跑了文档上最简单的demo，而后自己搭建了ikanma项目，边学边做。记录下遇到的问题。
引用antd时 .webpackrc 文件的内容如下，文档中的不能直接使用。
    ```
    {
        "extraBabelPlugins": [
            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
        ]
    }
    ```
## 使用webpack编译
添加webpack.config.js文件，设置entry、module的loader
package.json的"scripts"的build就可以改成 "webpack --config ./webpack.config.js"
## 使用webpack-dev-server启动项目

<!-- 
## 项目中加入less
## 项目中加入eslint
## 项目中加入test
## css module
 -->