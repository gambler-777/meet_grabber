chrome.tabs.query({url: '*://meet.google.com/*'}, function(tabs) {
    if (tabs.length > 0) {
      let targetTab = tabs[0]; // берем первую найденную вкладку
      chrome.scripting.executeScript({
        target: {tabId: targetTab.id},
        func: InterActFunc
      });
    }
  });

  function InterActFunc (){
    // Код, который будет выполнен на целевой вкладке
    document.body.style.backgroundColor = 'lightblue';
};