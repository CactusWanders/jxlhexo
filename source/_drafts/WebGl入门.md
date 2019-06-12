---
title: WebGl入门
tags:
---

我要学webGl了，为啥呢？因为听着很酷😎。还有就是现在在温故js基础，长时间浸在一个知识点里，有点疲劳，结合下，放松放松。
找了个[WebGl中文网](http://www.hewebgl.com/)，第一步来学习下three.js吧。
Threejs能做在浏览器上写出可运行的3D程序。这是github上的开源项目https://github.com/mrdoob/three.js

## 第一个实例： 嘚瑟的小方方
瞧瞧小方方里都有啥。代码不长，贴出来理解下
```
    <script>
        // 大布景，大概就是小方方的生存环境了
        var scene = new THREE.Scene();
        // 透视相机，这个是观察小方方嘚瑟的角度
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        // 渲染器，这个是画小方方的画笔了吧
        var renderer = new THREE.WebGLRenderer();
        // 确认下可渲染的范围，不知道这个重叠起来会怎么样
        renderer.setSize(window.innerWidth, window.innerHeight);
        // 到底是在浏览器里，还是要在大body里的
        document.body.appendChild(renderer.domElement);

        // 小方方的骨架
        var geometry = new THREE.CubeGeometry(1,1,1);
        // 小方方的皮相
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        // 小方方的诞生啦
        var cube = new THREE.Mesh(geometry, material);
        // 小方方的出现在大布景里了
        scene.add(cube);
        // 放好相机，怎么放得呀，没看明白，反正说这么放能看着，我就这么放吧
        camera.position.z = 5;
        // 小方方嘚瑟的姿态
        function render() {
            requestAnimationFrame(render);
            cube.rotation.x += 0.1;
            cube.rotation.y += 0.1;
            cube.rotation.z += 0.1;
            renderer.render(scene, camera);
        }
        // 起来嘚瑟吧
        render();
    </script>
```
然后，然后，作者贴了个模板，画了条线。。。
by the way 由于版本问题，需要修改
var line = new THREE.Line( geometry, material, THREE.LineSegments );
camera.lookAt(0, 0, 0);
才能正常显示

然后我就开小差去了，去看了一个[点线面的例子](https://codepen.io/luigimannoni/pen/NPgGpX)。惊艳有没有，表面那亮晶晶的，我也要画那个。我就是这么俗。看代码？没有的事，我还是乖乖学基础去。。。

## 画个点线面好不好
那个模板，对画线的那个模板，拿出来瞧瞧吧，应该有画点和线的操作。
将模板的方法修改，画出一根袅袅的线，还好，修改模板的基础上，我大概知道怎么划线了。
function initObject() {
    // 定义一个几何体
    var geometry = new THREE.Geometry();
    // 几何体材质属性
    var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );
    for (let index = 0; index < 10; index++) {
        // 初始化颜色和位置，并放入几何体中
        geometry.colors.push(new THREE.Color( 0xFF0000 + Math.pow(100,index) ));
        geometry.vertices.push(new THREE.Vector3( Math.pow(2,index)*Math.pow(-1,index), 100 * index, 10*index));
    }
    //  确定是线条啦
    var line = new THREE.Line( geometry, material, THREE.LineSegments );
    // 好了，放进去吧
    scene.add(line);
}
到目前为止，还是满满的舒服的。接下来文档告诉我画个网格，网格。。。我还是先自己试试吧。
好吧，我失败了，我不习惯视角在y轴，也不知道调整到z轴camera该怎么放。为啥我无论哪个轴旋转90度都竖不起来。
。。。先存疑吧。。。但愿影响不大

## 让场景动起来
由于上节课没看明白，所以这节课有情绪。简单说下
render()方法里有requestAnimationFrame这个方法，是重复调用render方法，那么在render方法对小方方坐标轴运动方向，它就动了，是的，他会动的。相对论的参照物说，动camera或者几何体都会动。
然后用了[Stats.js](https://github.com/mrdoob/stats.js/blob/master/build/stats.js)我没细看，不明白这个监控了个啥，先贴上来吧。
然后又讲了动画插件[tween.js](https://github.com/tweenjs/tween.js),不看不看，我又不是电脑，录入了就会了的。不看不看，脑袋会炸。

## 三维空间的观察
这是节理论课。

正投影和透视投影的区别是：透视投影有一个基本点，就是远处的物体比近处的物体小。

正投影相机：构造函数如下
THREE.OrthographicCamera( left, right, top, bottom, near, far )

透视投影相机的构造函数如下所示：
PerspectiveCamera( fov, aspect, near, far )
视角fov： 视角的大小。数字越小越近，也越大
纵横比aspect： 实际窗口的纵横比，即宽度除以高度。这个值越大，说明你宽度越大
近平面near： 表示你近处的裁面的距离。补充一下，也可以认为是眼睛距离近处的距离，假设为10米远，请不要设置为负值，Three.js就傻了,不知道怎么算了,
远平面far：表示你远处的裁面,

## 五彩的光源

