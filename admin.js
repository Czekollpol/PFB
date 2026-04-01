const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');
const editBtn = document.getElementById('editBtn');
const backBtn = document.getElementById('backBtn');

const JSONBIN_URL = "https://api.jsonbin.io/v3/b/69cd2f4e856a682189ed5127";
const JSONBIN_KEY = "$2a$10$wOEtVZBYWUFbw8spgNXD.e384k8kMsBVPCz9xMcI0cG6/LszzwTi2";

backBtn.addEventListener('click', () => window.location.href = "index.html");

function fetchData() {
  return fetch(JSONBIN_URL, { headers: { "X-Master-Key": JSONBIN_KEY } })
    .then(res => res.json())
    .then(res => res.record);
}

function updateData(newData) {
  return fetch(JSONBIN_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": JSONBIN_KEY
    },
    body: JSON.stringify(newData)
  });
}

addBtn.addEventListener('click', async () => {
  const name = document.getElementById('addName').value.trim();
  const role = document.getElementById('addRole').value.trim();
  if(!name || !role) return alert("Wypełnij wszystkie pola!");
  
  const data = await fetchData();
  const newId = data.members.length ? data.members[data.members.length-1].id +1 : 1;
  data.members.push({ id: newId, name, role });
  await updateData(data);
  alert("Dodano członka!");
});

removeBtn.addEventListener('click', async () => {
  const id = parseInt(document.getElementById('removeId').value);
  const data = await fetchData();
  data.members = data.members.filter(m => m.id !== id);
  await updateData(data);
  alert("Usunięto członka!");
});

editBtn.addEventListener('click', async () => {
  const id = parseInt(document.getElementById('editId').value);
  const name = document.getElementById('editName').value.trim();
  const role = document.getElementById('editRole').value.trim();
  const data = await fetchData();
  const member = data.members.find(m => m.id === id);
  if(!member) return alert("Nie znaleziono członka!");
  if(name) member.name = name;
  if(role) member.role = role;
  await updateData(data);
  alert("Dane zmienione!");
});
