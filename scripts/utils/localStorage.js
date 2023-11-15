const storageName = "kevin-website";

function updateLocalStorage(key, value) {
  const storageString = localStorage.getItem(storageName);
  const storage = JSON.parse(storageString);
  let newStorage = { ...storage };
  newStorage[key] = value;
  localStorage.setItem(storageName, JSON.stringify(newStorage));
}

export { updateLocalStorage, storageName };
