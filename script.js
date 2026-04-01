const membersList = document.getElementById('membersList');
const adminBtn = document.getElementById('adminBtn');

const JSONBIN_URL = "https://api.jsonbin.io/v3/b/69cd2f4e856a682189ed5127";
const JSONBIN_KEY = "$2a$10$wOEtVZBYWUFbw8spgNXD.e384k8kMsBVPCz9xMcI0cG6/LszzwTi2";

adminBtn.addEventListener('click', () => {
  const password = prompt("Podaj hasło admina:");
  fetch(JSONBIN_URL, {
    headers: { "X-Master-Key": JSONBIN_KEY }
  })
    .then(res => res.json())
    .then(data => {
      if(password === data.record.password) {
        window.location.href = "admin.html";
      } else {
        alert("Nieprawidłowe hasło!");
      }
    });
});

function loadMembers() {
  fetch(JSONBIN_URL, { headers: { "X-Master-Key": JSONBIN_KEY } })
    .then(res => res.json())
    .then(data => {
      membersList.innerHTML = "";
      data.record.members.forEach(m => {
        const card = document.createElement('div');
        card.className = "card";
        card.innerHTML = `<h3>${m.name}</h3><p>${m.role}</p><p>ID: ${m.id}</p>`;
        membersList.appendChild(card);
      });
    });
}

loadMembers();
