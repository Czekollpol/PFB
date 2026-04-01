const JSONBIN_URL = "https://api.jsonbin.io/v3/b/69cd2f4e856a682189ed5127";
const JSONBIN_KEY = "$2a$10$wOEtVZBYWUFbw8spgNXD.e384k8kMsBVPCz9xMcI0cG6/LszzwTi2";

async function getData() {
  const res = await fetch(URL, {
    headers: { "X-Master-Key": KEY }
  });
  return (await res.json()).record;
}

async function saveData(data) {
  await fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": KEY
    },
    body: JSON.stringify(data)
  });
}

// ➕ DODAJ
document.getElementById("addBtn").onclick = async () => {
  const id = parseInt(addId.value);
  const name = addName.value;
  const role = addRole.value;

  const data = await getData();

  if(data.members.find(m => m.id === id)) {
    return alert("ID istnieje");
  }

  data.members.push({ id, name, role });
  await saveData(data);
  alert("Dodano");
};

// ❌ USUŃ
removeBtn.onclick = async () => {
  const id = parseInt(removeId.value);
  const data = await getData();

  data.members = data.members.filter(m => m.id !== id);
  await saveData(data);

  alert("Usunięto");
};

// ✏️ EDYTUJ
editBtn.onclick = async () => {
  const id = parseInt(editId.value);
  const data = await getData();

  const m = data.members.find(m => m.id === id);
  if(!m) return alert("Brak");

  if(editName.value) m.name = editName.value;
  if(editRole.value) m.role = editRole.value;

  await saveData(data);
  alert("Zmieniono");
};
