let myNotes = []
const colorThemes = document.querySelectorAll('[name="theme"]');
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myNotes") )
const icon = document.getElementById("icon")

if (leadsFromLocalStorage) {
    myNotes = leadsFromLocalStorage
    renderNote()
}

function renderNote(notes) {
    let listItems = ""
    for(let i = 0; i < myNotes.length; i++) {
        listItems += `
            <li>
                <p>
                    ${myNotes[i]}
                </p>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myNotes = []
    renderNote()
})

inputBtn.addEventListener("click", function(){
    myNotes.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myNotes", JSON.stringify(myNotes) )
    renderNote()
})























// store theme
const storeTheme = function (theme) {
  localStorage.setItem("theme", theme);
};

// set theme when visitor returns
const setTheme = function () {
  const activeTheme = localStorage.getItem("theme");
  colorThemes.forEach((themeOption) => {
    if (themeOption.id === activeTheme) {
      themeOption.checked = true;
    }
  });
  // fallback for no :has() support
  document.documentElement.className = activeTheme;
};

colorThemes.forEach((themeOption) => {
  themeOption.addEventListener("click", () => {
    storeTheme(themeOption.id);
    // fallback for no :has() support
    document.documentElement.className = themeOption.id;
  });
});

document.onload = setTheme();