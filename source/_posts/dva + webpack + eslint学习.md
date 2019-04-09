---
title: dva + webpack + eslint + less学习
date: 2019-02-23 07:19:35
tags:
---

```
module.exports = {
    stats: { children: false },
    entry: path.resolve(__dirname, './src/index.js'), //指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.js$/, use: 'babel-loader' }
        ]
    },
    devServer: {
        historyApiFallback: true,
        inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
    },
    plugins:[
        new HtmlWebpackPlugin(), // Generates default index.html
        new HtmlWebpackPlugin({  // Also generate a test.html
          filename: 'index.html',
          template: './public/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
```
开发中启动，发现打开的是编译后的，不方便debug。设置区分pro和dev环境。增加mode: "development"

## eslint报错问题

    ## 1. 非button加onClick事件
    #### Visible, non-interactive elements with click handlers must have at least one keyboard listener.eslint(jsx-a11y/click-events-have-key-events)
        由于ESLint检查强制非Button的 onClick 事件需要至少一个键盘事件。
        键盘事件：onKeyUp, onKeyDown, onKeyPress
    ####  Static HTML elements with event handlers require a role. (jsx-a11y/no-static-element-interactions
        增加 role="button"
    #### Elements with the 'button' interactive role must be focusable. (jsx-a11y/interactive-supports-focus)
        增加 tabIndex="0" 属性
    ```
        <div
          role="button"
          tabIndex="0"
          onKeyUp={this.onKeyUp}
          onClick={() => {}}
        />
    ```
## react报错
    ##1.[React/Error: Minified React error #130]
    React定义方法的时候只有首字母必须大写，不能是驼峰原则！修改ToDoAPP类改为Todoapp
<!-- 
父组件数据，子组件数据，组件交叉数据

 -->