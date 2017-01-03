function copyToClipboard(text) {
  const input = document.createElement('textarea');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
};

chrome.runtime.onMessage.addListener(function(msg, sender) {
  if ((msg.from === 'popup') && (msg.subject === 'saveTabsList')) {
    chrome.tabs.query(
      {},
      function(tabsArray) {
        var dump = '';
        tabsArray.forEach(function(tab) {
          dump = dump + '# ' + tab.title + '\n' + tab.url + '\n';
        });
        copyToClipboard(dump);
      });
  }
});
