import Vue from "vue";
import "./btnLoading.css";

Vue.directive("btnLoading", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el, binding) {
    // 聚焦元素
    // el.focus();
    // lazyImg.bindEvent(el, binding.value)
  },
  bind: (el, binding) => {
    el.oldBtnText = el.innerHTML;
    const tempDivWrapper = document.createElement("div");
    tempDivWrapper.className = "btn-loading-wrapper";
    const tempDiv = document.createElement("div");
    tempDiv.className = "btn-loading";
    const cube1 = document.createElement("div");
    const cube2 = document.createElement("div");
    cube1.className = "cube1";
    cube2.className = "cube2";
    tempDiv.appendChild(cube1);
    tempDiv.appendChild(cube2);
    tempDivWrapper.appendChild(tempDiv);
    el.loadingElement = tempDivWrapper;
    /* if (binding.value) {
      const curStyle = window.getComputedStyle(el)
      const position = curStyle.position
      if (position === 'absolute' || position === 'relative') {
        el.style.position = position
      } else {
        el.style.position = 'relative'
      }
      el.appendChild(tempDiv)
    } else {
      if (tempDiv.parentNode !== null) {
        tempDiv.parentNode.removeChild(tempDiv)
      }
    } */
    const curStyle = window.getComputedStyle(el);
    const position = curStyle.position;
    if (position === "absolute" || position === "relative") {
      el.style.position = position;
    } else {
      el.style.position = "relative";
    }
    if (binding.value) {
      el.style.pointerEvents = "none";
      el.innerHTML = "";
      el.appendChild(tempDivWrapper);
    }
  },
  update: (el, binding) => {
    if (binding.value) {
      if (el.loadingElement.parentNode === null) {
        el.style.pointerEvents = "none";
        el.innerHTML = "";
        el.appendChild(el.loadingElement);
      }
    } else {
      if (el === el.loadingElement.parentNode) {
        el.style.pointerEvents = "auto";
        el.removeChild(el.loadingElement);
        el.innerHTML = el.oldBtnText;
      }
    }
  },
  unbind: el => {
    if (el.loadingElement.parentNode === el) {
      el.style.pointerEvents = "auto";
      el.removeChild(el.loadingElement);
      el.innerHTML = el.oldBtnText;
    }
    el.loadingElement = null;
  }
});
