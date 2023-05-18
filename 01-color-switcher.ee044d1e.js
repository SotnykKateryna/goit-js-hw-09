const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let a=null;t.addEventListener("click",(()=>{a||(a=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3))})),e.addEventListener("click",(()=>{a=clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.ee044d1e.js.map
