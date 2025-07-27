const SHEET_ID = '1_YxNUhVHCHXAi6o20JVKXsrmWGVnuq7aN25n7rTI7x4';
const API_KEY = 'AIzaSyAXwxYHRIaFsO9imQomvwFqz_hkqzGdCr8';
const RANGE = 'Página1!A:F';

function carregarDados() {
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#tabela tbody');
      tbody.innerHTML = '';
      data.values.slice(1).forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
          const td = document.createElement('td');
          td.textContent = cell;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    });
}

document.getElementById('formulario').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const novaLinha = [
    new Date().toLocaleString('pt-BR'),
    form.data.value,
    form.codigo.value,
    form.descricao.value,
    form.credito.value || '',
    form.debito.value || ''
  ];

  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [novaLinha] })
  })
  .then(res => res.json())
  .then(() => {
    form.reset();
    carregarDados();
  });
});

window.onload = carregarDados;
