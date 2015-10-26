"use strict";

var videoPlayback = document.getElementById("video-playback");

var search = processSearch();
var channel = search.channel || videoPlayback.getAttribute("data-channel");

if(channel) {
  addChat(channel);
}

addStyleSheet();

function addChat(channel) {

  var chatFrame = document.createElement("iframe");
  chatFrame.src = `http://www.twitch.tv/${channel}/chat?popout=`;
  chatFrame.classList.add("tpwc-chat-frame");

  document.body.appendChild(chatFrame);

  function resize() {
    const ratio = 9/16;
    var height = (ratio * window.innerWidth);

    if(height + 200 < window.innerHeight) {
      chatFrame.style.display = "";
      videoPlayback.style.height = height + "px";
      chatFrame.style.top = height + "px";
      chatFrame.style.height = window.innerHeight - height + "px";
    } else {
      videoPlayback.style.height = "";
      chatFrame.style.display = "none";
    }

  }

  window.addEventListener("resize", resize);
  resize();
}

function processSearch() {
  var searchSplit = location.search.split('&');
  searchSplit[0] = searchSplit[0].substr(1);

  var searchObj = { };

  for(var i=0; searchSplit.length > i; i++) {
    var searchKeyValSplit = searchSplit[i].split('=');
    var key = searchKeyValSplit[0];
    var val = searchKeyValSplit[1];
    searchObj[key] = val;
  }

  return searchObj;
}

function addStyleSheet() {
  var cssStyleUrl = chrome.extension.getURL("/css/chat-style.css");
  var styleEl = document.createElement("link");
  styleEl.rel = "stylesheet";
  styleEl.href = cssStyleUrl;

  document.head.appendChild(styleEl);
}
