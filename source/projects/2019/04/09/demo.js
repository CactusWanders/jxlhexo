function checkBoundingClientHeightForOne(){
    // 元素距离屏幕的高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var typeOne = document.getElementById('type-one');
    var typeOneBoundingClientHeight = typeOne.getBoundingClientRect().top + scrollTop;
    
    return function () {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 屏幕滚动距离小于元素应该在的位置时，取消吸顶
        if(scrollTop < typeOneBoundingClientHeight){
            typeOne.className = typeOne.className.replace(" fix-top", "");
        } else {
            // // 获取距离屏幕顶部的高度，当高度小于2px时候吸顶
            // if(typeOne.getBoundingClientRect().top < 0) typeOne.className += " fix-top";
            typeOne.className.indexOf("fix-top") < 0 && (typeOne.className += " fix-top");
        }
    }
};
window.addEventListener('scroll', checkBoundingClientHeightForOne());