let names = [];
document.querySelectorAll(".name-uJV0GL").forEach((item) => {
  if (item.children[0].innerText.split(" ").length > 1)
    names.push(item.children[0].innerText);
});
console.log(names);
