
function ampResizer(window) {
  var resizeIframe = function() {
    return window.parent.postMessage({
      sentinel: 'amp',
      type: 'embed-size',
      height: window.document.body.offsetHeight
    }, '*');
  };
  window.onload = resizeIframe;
  window.onresize = resizeIframe;
}

export const RESIZE_SCRIPT = `(${ampResizer.toString()})(window)`;
