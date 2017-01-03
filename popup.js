function copyTabs(e) {
  chrome.runtime.sendMessage({
    from:    'popup',
    subject: 'saveTabsList'
  });
  window.close();
}

function loadTabs(e) {
  document.getElementById("menu").style.display = "none";
  document.getElementById("urls").style.display = "block";

  var width  = document.getElementById("urls").offsetWidth;
  var height = document.getElementById("urls").offsetHeight;

  document.body.style.width  = '' + width  + 'px';
  document.body.style.height = '' + height + 'px';

  var input = document.getElementById('urls-str');
  input.focus();
  input.select();
}

function doLoading(e) {
  var text = document.getElementById("urls-str").value;
  var strs = text.split(/\r?\n/);
  strs.forEach(function(str) {
    str = str.trim();
    if (str && !str.startsWith("#")) {
      chrome.tabs.create({ url: str });
    }
  });
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("copy").addEventListener('click', copyTabs);
  document.getElementById("load").addEventListener('click', loadTabs);
  document.getElementById("do-load").addEventListener('click', doLoading);
});
