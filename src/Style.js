const bannernft = document.getElementByClassName('bannernft')[0];
      const blocksnft = document.getElementByClassName('blocksnft');

      for (var i = 1; i < 400; i++){
          bannernft.innerHTML += "<div class='blocksnft'></div>";
          blocksnft[i].style.animation = `${i * 0.05}s`;
      }