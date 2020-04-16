var XMLParser=Editor.Parser=function(){var n={autoSelfClosers:{br:!0,img:!0,hr:!0,link:!0,input:!0,meta:!0,col:!0,frame:!0,base:!0,area:!0},doNotIndent:{pre:!0,"!cdata":!0}},t={autoSelfClosers:{},doNotIndent:{"!cdata":!0}},e=n,r=!1,o=function(){function n(n,r){var o=n.next();if("<"==o)return n.equals("!")?(n.next(),n.equals("[")?n.lookAhead("[CDATA[",!0)?(r(e("xml-cdata","]]>")),null):"xml-text":n.lookAhead("--",!0)?(r(e("xml-comment","--\x3e")),null):"xml-text"):n.equals("?")?(n.next(),n.nextWhileMatches(/[\w\._\-]/),r(e("xml-processing","?>")),"xml-processing"):(n.equals("/")&&n.next(),r(t),"xml-punctuation");if("&"==o){for(;!n.endOfLine()&&";"!=n.next(););return"xml-entity"}return n.nextWhileMatches(/[^&<\n]/),"xml-text"}function t(e,r){var o,a=e.next();return">"==a?(r(n),"xml-punctuation"):/[?\/]/.test(a)&&e.equals(">")?(e.next(),r(n),"xml-punctuation"):"="==a?"xml-punctuation":/[\'\"]/.test(a)?(r((o=a,function(n,e){for(;!n.endOfLine();)if(n.next()==o){e(t);break}return"xml-attribute"})),null):(e.nextWhileMatches(/[^\s\u00a0=<>\"\'\/?]/),"xml-name")}function e(t,e){return function(r,o){for(;!r.endOfLine();){if(r.lookAhead(e,!0)){o(n);break}r.next()}return t}}return function(t,e){return tokenizer(t,e||n)}}();return{make:function(n){var t,a,u=o(n),l=[function n(){return d(y,n)}],i=0,c=0,f=null,m=null;function s(n){for(var t=n.length-1;t>=0;t--)l.push(n[t])}function x(){s(arguments),t=!0}function d(){s(arguments),t=!1}function p(n){a=n}function h(n,t){var r=e.doNotIndent.hasOwnProperty(n)||m&&m.noIndent;m={prev:m,name:n,indent:c,startOfLine:t,noIndent:r}}function v(){m=m.prev}var g={"xml-text":!0,"xml-entity":!0,"xml-comment":!0,"xml-processing":!0};function y(n,t){var e;"<"==t?x(A,k,L(1==i)):"</"==t?x(C,(e=">",function(n,t){t==e?x():p("xml-error")||x(arguments.callee)})):"xml-cdata"==n?(m&&"!cdata"==m.name||h("!cdata"),/\]\]>$/.test(t)&&v(),x()):g.hasOwnProperty(n)?x():p("xml-error")||x()}function A(n,t){"xml-name"==n?(f=t.toLowerCase(),p("xml-tagname"),x()):(f=null,d())}function C(n,t){"xml-name"==n&&m&&t.toLowerCase()==m.name?(v(),p("xml-tagname")):p("xml-error"),x()}function L(n){return function(t,r){"/>"==r||">"==r&&e.autoSelfClosers.hasOwnProperty(f)?x():">"==r?h(f,n)||x():p("xml-error")||x(arguments.callee)}}function k(n){"xml-name"==n?p("xml-attname")||x(w,k):d()}function w(n,t){"="==t?x(O):">"==t||"/>"==t?d(L):d()}function O(n){"xml-attribute"==n?x(O):d()}return{indentation:function(){return c},next:function(){var n,e=u.next();if("whitespace"==e.style&&0==i?c=e.value.length:i++,"\n"==e.content&&(c=i=0,e.indentation=(n=m,function(t,e){var o=n;if(o&&o.noIndent)return e;if(r&&/<!\[CDATA\[/.test(t))return 0;for(o&&/^<\//.test(t)&&(o=o.prev);o&&!o.startOfLine;)o=o.prev;return o?o.indent+indentUnit:0})),"whitespace"==e.style||"xml-comment"==e.type)return e;for(;;)if(t=a=!1,l.pop()(e.style,e.content),t)return a&&(e.style=a),e},copy:function(){var n=l.concat([]),t=u.state,e=m,r=this;return function(a){return l=n.concat([]),i=c=0,m=e,u=o(a,t),r}}}},electricChars:"/",configure:function(o){null!=o.useHTMLKludges&&(e=o.useHTMLKludges?n:t),o.alignCDATA&&(r=o.alignCDATA)}}}();