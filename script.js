const JSONBIN_URL = "https://api.jsonbin.io/v3/b/69cd2f4e856a682189ed5127";
const JSONBIN_KEY = "$2a$10$wOEtVZBYWUFbw8spgNXD.e384k8kMsBVPCz9xMcI0cG6/LszzwTi2";

const membersList = document.getElementById('membersList');
const adminBtn = document.getElementById('adminBtn');

adminBtn.onclick = async () => {
  const pass = prompt("Hasło:");
  const res = await fetch(JSONBIN_URL, {
    headers: { "X-Master-Key": JSONBIN_KEY }
  });
  const data = await res.json();

  if(pass === data.record.password) {
    window.location.href = "admin.html";
  } else {
    alert("Złe hasło");
  }
};

function getRankNumber(role) {
  return parseInt(role.split("|")[0].trim());
}

async function loadMembers() {
  const res = await fetch(JSONBIN_URL, {
    headers: { "X-Master-Key": JSONBIN_KEY }
  });
  const data = await res.json();

  const members = data.record.members;

  // 🔥 SORTOWANIE (10 → 1)
  members.sort((a, b) => getRankNumber(b.role) - getRankNumber(a.role));

  membersList.innerHTML = "";

  members.forEach(m => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${m.name}</h3>
      <p>${m.role}</p>
      <small>ID: ${m.id}</small>
    `;

    membersList.appendChild(div);
  });
}

loadMembers();
