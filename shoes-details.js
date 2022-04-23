document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location);
  const shoeId = urlParams.get('id');

  var wait = document.getElementById('shoebox');
  var letterWait = document.createElement('h2');
  wait.appendChild(letterWait);
  letterWait.innerText = 'Loading...';

  var url = 'http://localhost:3000/api/shoes/' + shoeId;
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      wait.removeChild(letterWait);
      showDetails(data);
    });
  function showDetails(data) {
    var box = document.getElementById('shoebox');
    var detail = document.createElement('div');
    detail.classList.add('details');
    box.appendChild(detail);
    detail.innerText = data.brand;
  }
});
