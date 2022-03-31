document.addEventListener('DOMContentLoaded', async () => {
  await web();
});

async function web() {
  let response = await fetch('http://localhost:3000/api/shoes');
  let data = await response.json();
  console.log(data);
}
