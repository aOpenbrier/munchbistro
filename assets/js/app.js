"use strict";function openMenu(){document.getElementById("nav-collapse").classList.toggle("open")}function openTab(e,t){var l,o;l=document.getElementsByClassName("tabcontent");for(var n=0;n<l.length;n++)l[n].style.display="none";o=document.getElementsByClassName("tablinks");for(var s=0;s<o.length;s++)o[s].className=o[s].className.replace(" active","");document.getElementById(t).style.display="block",e.currentTarget.className+=" active"}function thenUpdateArrows(){document.addEventListener("mouseup",updateArrows)}function updateArrows(){document.removeEventListener("mouseup",updateArrows);var e=document.getElementById("menutabs"),t=e.scrollWidth-e.clientWidth;console.log("left scroll max: "+e.scrollLeft+" of "+t),e.scrollLeft<t-1?document.getElementById("indicator-right").style.display="block":document.getElementById("indicator-right").style.display="none",1<e.scrollLeft?document.getElementById("indicator-left").style.display="block":document.getElementById("indicator-left").style.display="none"}function arrowLeft(){var e=document.getElementById("menutabs");e.style.scrollBehavior="smooth",e.scrollWidth>2*e.clientWidth?e.scrollLeft-=.7*e.clientWidth:e.scrollLeft=0,e.style.scrollBehavior="auto",setTimeout(updateArrows,500)}function arrowRight(){var e=document.getElementById("menutabs");e.style.scrollBehavior="smooth",e.scrollWidth>2*e.clientWidth?e.scrollLeft+=.7*e.clientWidth:e.scrollLeft+=e.scrollWidth,e.style.scrollBehavior="auto",setTimeout(updateArrows,500)}window.onclick=function(e){e.target.matches("#navtrigger")||document.getElementById("nav-collapse").classList.remove("open")},document.getElementById("defaultOpen").click(),updateArrows();