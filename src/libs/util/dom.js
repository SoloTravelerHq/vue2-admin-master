

/**
 * 获取浏览器滚动条的宽度
 */
export function getScrollWidth () {
  let noScroll,
    scroll,
    oDiv = document.createElement("DIV");
  oDiv.style.cssText =
    "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
  noScroll = document.body.appendChild(oDiv).clientWidth;
  oDiv.style.overflowY = "scroll";
  scroll = oDiv.clientWidth;
  document.body.removeChild(oDiv);
  return noScroll - scroll;
}

/**
 * 获取设备浏览器显示区域宽度
 */
export function getClientWidth () {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
}

/**
 * 获取设备浏览器显示区域高度
 */
export function getClientHeight () {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  );
}

export function getClientSize () {
  return { width: getClientWidth(), height: getClientHeight() };
}

export function getDomWidth (dom) {
  return dom.clientWidth || dom.offsetWidth;
}

export function getDomHeight (dom) {
  return dom.clientHeight || dom.offsetHeight;
}

export function getDomSize (dom) {
  return { width: getDomWidth(dom), height: getDomHeight(dom) };
}

export function getDomChilds (parenNode, className) {
  let result = [],
    childs = parenNode.children || parenNode.childNodes || [];
  for (let i = 0, len = childs.length; i < len; i++) {
    let child = childs[i];
    if (
      child.nodeType === 1 &&
      (!className || (className && child.indexOf(className) > -1))
    ) {
      result.push(child);
    }
  }
  return result;
}

export function getOffsetForBody (dom, left = 0, top = 0) {
  left += dom.offsetLeft;
  top += dom.offsetTop;
  if (dom.offsetParent) {
    return getOffsetForBody(dom.offsetParent, left, top);
  } else {
    return { left, top };
  }
}

export function setStyle (target, style) {
  for (let key in style) {
    target.style[key] = style[key];
  }
}
