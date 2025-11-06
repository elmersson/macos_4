const username = localStorage.getItem("username");
console.log("localStorage username:", username);
console.log("All localStorage items:");
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, ":", localStorage.getItem(key));
}
