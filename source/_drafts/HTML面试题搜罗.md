---
title: HTML面试题搜罗
date: 2019-04-11 09:41:15
tags:
---
    就不详细写代码了，可以看开发者工具查看代码

## 怎么让一个 div 水平垂直居中
<div class="interview1">
    <span>使用定位，相对于父节点50%，margin设置为自身高度或宽度的负50%，或者移动-50%</span>
    <div class="parent"><div class="child child1"></div></div>
    <span>父节点使用flex，使用justify-content水平居中，align-items垂直居中</span>
    <div class="parent parent2"><div class="child"></div></div>
    <span>父节点使用flex，子节点使用margin: auto</span>
    <div class="parent parent3"><div class="child child3"></div></div>
    <span>了解下网格布局grid, 不考虑兼容性的情况可以使用。grid方法也同上两种。</span>
    <div class="parent parent4"><div class="child"></div></div>
    <span>还有小伙伴会使用table及table-cell，没有使用过，暂不学习</span>
</div>

<style>
    .interview1 div.parent {
        background: #cee;
        width: 250px;
        height: 50px;
        border: 1px solid #fff;
    }
    .interview1 div.child {
        background: white;
        width: 20px;
        height: 20px;
    }
    .interview1 div.child1 {
        position: relative;
        top: 50%;
        margin: auto;
        margin-top: -10px;
    }
    .interview1 div.parent2 {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .interview1 div.parent3 {
        display: flex;
    }
    .interview1 div.child3 {
        margin: auto;
    }
    .interview1 div.parent4 {
        display: grid;
        justify-content: center;
        align-items: center;
    }
</style>

## 左右定宽，中间自适应
<div class="interview2">
    <span>左右定宽absolute,中间以padding空出相应部分 圣杯模型</span>
    <div class="parent1"><div class="child toLeft"></div><div class="child center"></div><div class="child toRight"></div></div>
    <span>左右定宽float: left,中间在最左侧，使用margin-left：-100%将下移的部分转上去 双飞翼模型</span>
    <div class="parent11"><div class="child center"></div><div class="child toLeft"></div><div class="child toRight"></div></div>
    <span>grid布局</span>
    <div class="parent2"><div class="child toLeft"></div><div class="child center"></div><div class="child toRight"></div></div>
    <span>左右定宽float在两侧，中间absolute拉伸展开</span>
    <div class="parent3"><div class="child toLeft"></div><div class="child center"></div><div class="child toRight"></div></div>
    <span>左右定宽float在两侧,中间在最后  比较 双飞翼模型</span>
    <div class="parent4"><div class="child toLeft"></div><div class="child toRight"></div><div class="child center"></div></div>
</div>

<style>
    .interview2 div.parent1 {
        position: relative;
        background: #fff;
        width: 500px;
        height: 50px;
    }
    .interview2 div.parent1 div.toLeft {
        position: absolute;
        left: 0;
        top: 0;
        background: #ceecff;
        width: 100px;
        height: 100%;
    }
    .interview2 div.parent1 div.center {
        background: #cee;
        padding: 0 50px 0 100px;
        height: 100%;
    }
    .interview2 div.parent1 div.toRight {
        position: absolute;
        right: 0;
        top: 0;
        background: #ceecff;
        width: 50px;
        height: 100%;
    }
    .interview2 div.parent11 {
        background: #fff;
        width: 500px;
        height: 50px;
    }
    .interview2 div.parent11 div.toLeft {
        background: #ceecff;
        width: 100px;
        height: 100%;
        float: left;
        margin-left: -100%;
    }
    .interview2 div.parent11 div.center {
        background: #cee;
        height: 100%;
        width: 100%;
        float: left;
    }
    .interview2 div.parent11 div.toRight {
        background: #ceecff;
        width: 50px;
        height: 100%;
        float: right;
        margin-left: -100%;
    }
    .interview2 div.parent2 {
        display: grid;
        grid-template-columns: 100px auto 50px;
        background: #fff;
        width: 500px;
        height: 50px;
    }
    .interview2 div.parent2 div.toLeft {
        background: #ceecff;
    }
    .interview2 div.parent2 div.center {
        background: #cee;
    }
    .interview2 div.parent2 div.toRight {
        background: #ceecff;
    }
    .interview2 div.parent3 {
        position: relative;
        background: #fff;
        width: 500px;
        height: 50px;
    }
    .interview2 div.parent3 div.toLeft {
        background: #ceecff;
        width: 100px;
        height: 100%;
        float: left;
    }
    .interview2 div.parent3 div.center {
        background: #cee;
        height: 100%;
        position: absolute;
        left: 100px;
        right: 50px;
    }
    .interview2 div.parent3 div.toRight {
        background: #ceecff;
        width: 50px;
        height: 100%;
        float: right;
    }
    .interview2 div.parent4 {
        background: #fff;
        width: 500px;
        height: 50px;
    }
    .interview2 div.parent4 div.toLeft {
        background: #ceecff;
        width: 100px;
        height: 100%;
        float: left;
    }
    .interview2 div.parent4 div.center {
        background: #cee;
        height: 100%;
    }
    .interview2 div.parent4 div.toRight {
        background: #ceecff;
        width: 50px;
        height: 100%;
        float: right;
    }
</style>

## div 等分