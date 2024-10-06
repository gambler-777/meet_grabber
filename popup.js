const showBtn = document.getElementById("show_stats"); // натискання на кнопку віводу статистики
let url = chrome.runtime.getURL("stats.html");
showBtn.addEventListener("click",() => {  // обробка натискання на кнопку "Показати статистику"
    
    chrome.tabs.query({}, function(tabs){
      let tabExist = false; // флаг існування відкритої сторінки у вкладці

      for (let tab of tabs) {
        if (tab.title.includes("Meet Stats")) { // перевірка чи існує вкладка з заданим тітлом
          //alert("The tab will be ativated now...");
          tabExist = true;
          chrome.windows.update(tab.windowId, {focused: true}, function() { //активація вікна
            chrome.tabs.update(tab.id, {active: true}, function(updatedTab){ // активація вкладки     
              //console.log("Stats are here", updatedTab);
              //alert("Stats are here");
            });
          });
          break;  // Припиняємо цикл, якщо вкладку знайдено
        }       
      }

      if (!tabExist){
        chrome.tabs.create({url}); // якщо вкладки немає, то створюємо
      };   

    }); 
});

document.addEventListener('DOMContentLoaded', function() { // натискання на кнопку запуску збору статистики
    const button = document.getElementById('start_grab');
  
    button.addEventListener('click', async function() {  
      
      chrome.tabs.query({url: '*://meet.google.com/*'}, function(tabs) {
        if (tabs.length === 1) {
          let targetTab = tabs[0]; // берем первую найденную вкладку
          chrome.scripting.executeScript({
            target: {tabId: targetTab.id},
            func: interactWithPage
          });
        }
        else if (tabs.length === 0) {
          alert("There Is No GoogleMeet Running");
        }
        else if (tabs.length > 1) {
          alert("Google Meet is open in more than one tab. Please close the unnecessary tabs, keeping only one tab with the conference");
        }
      });
    
      });
    });
 
    function interactWithPage() {
      // Этот код будет выполняться на странице
      // alert('This is a message from the extension!');
      // Здесь можно выполнить любой скрипт
      document.body.style.backgroundColor = 'yellow'; // Пример изменения страницы

      if (confirm('Are you sure to start collecting statistics?\nAll previous data will be lost!')) {
        // Save it!
        console.log('Thing was saved to the database.');
      } else {
        // Do nothing!
        console.log('Thing was not saved to the database.');
      }

        //************INTERACTING__CODE****************/
       // memberElement = document.querySelector('[aria-label="Учасники"]');
       const elements = document.querySelectorAll('.zWGUib');
    
    if (elements.length > 0) {
      // Перебор всех найденных элементов и изменение их цвета
      elements.forEach((element, index) => {
        element.style.backgroundColor = 'red';  // Меняем цвет фона на красный
        console.log(`Element ${index + 1} color changed to red.`);
      });
    } else {
      console.log('Elements with class "zWGUib" not found.');
    }

    };

