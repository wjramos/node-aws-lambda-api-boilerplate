export const RESIZE_SCRIPT = '\n\
  \tvar resizeIframe = function() {\n\
  \t\treturn window.parent.postMessage({\n\
  \t\t\tsentinel: "amp",\n\
  \t\t\ttype: "embed-size",\n\
  \t\t\theight: document.body.offsetHeight\n\
  \t\t}, "*");\n\
  \t};\n\
  \twindow.onload = resizeIframe;\n\
  \twindow.onresize = resizeIframe;\n\
';
