var quizList = document.getElementById('quizList');
var wrapper =document.getElementById('wrapperID');

var collapsedNavButton = document.getElementById('collapsedNavButton');
var navDropdownContent = document.getElementById('navDropdownContent');
var themeButton = document.getElementById('themeButton');
var homeButton = document.getElementById('homeButton');
var homeLi = document.getElementById('homeLi');
var listButton = document.getElementById('listButton');
var listLi = document.getElementById('listLi');

var themeDropdownContent = document.getElementById('themeDropdownContent');
var systemThemeButton = document.getElementById('systemTheme');
var lightThemeButton = document.getElementById('lightTheme');
var darkThemeButton = document.getElementById('darkTheme');

// Night Mode Button Functionality
themeButton.addEventListener("click", function(e) {
    e.preventDefault();
    if (themeDropdownContent.style.display == "none")
        themeDropdownContent.style.display = "block";
    else
        themeDropdownContent.style.display = "none";
})

systemThemeButton.addEventListener("click", function(e) {
    e.preventDefault();
    setColorScheme("light dark");
    themeDropdownContent.style.display = "none";
    closeNav();
})

lightThemeButton.addEventListener("click", function(e) {
    e.preventDefault();
    setColorScheme("light");
    themeDropdownContent.style.display = "none";
    closeNav();
})

darkThemeButton.addEventListener("click", function(e) {
    e.preventDefault();
    setColorScheme("dark");
    themeDropdownContent.style.display = "none";
    closeNav();
})

function setColorScheme(mode) {
    document.documentElement.dataset.colorScheme = mode;
}

// gets the flagGallery json file and creates the list using its contents
fetch("../json/quizInfo.json").then(function(res) {
    res.json().then(function(json) {
        // Add each country to the grid
        json.quizzes.forEach(function(el, i) {
            // Create list element
            var listEntry = document.createElement("li");
            listEntry.id = el["ID"]; // each list entry id will be its country's name

            // Create button
            var listAnchor = document.createElement("a");
            listAnchor.href = el.link;

            // Create image
            var entryImg = document.createElement("img");
            entryImg.src = el.image;
            entryImg.alt = el["image-desc"];
            entryImg.title = el["image-desc"];
            
            // Create h2 to hold the quiz name
            var entryTitle = document.createElement("h2");
            entryTitle.innerText = el.title;

            var entryDesc = document.createElement("p");
            entryDesc.innerText = el["quiz-desc"];
            
            // Create container for name & desc
            var infoContainer = document.createElement("div");
            infoContainer.className = "info-container";
            
            // Make the name & desc contained within the button
            infoContainer.appendChild(entryTitle);
            infoContainer.appendChild(entryDesc);

            listAnchor.appendChild(entryImg);
            listAnchor.appendChild(infoContainer);

            // Make the button contained into the list element
            listEntry.appendChild(listAnchor);

            // Add list element to the grid
            quizList.appendChild(listEntry);
        })
    })
})

collapsedNavButton.addEventListener("click", function(e) {
    e.preventDefault();
    // Display Nav Menu
    if (navDropdownContent.style.display == "none") {
        navDropdownContent.style.display = "block";
        navDropdownContent.appendChild(homeButton);
        navDropdownContent.appendChild(listButton);
        navDropdownContent.appendChild(systemThemeButton);
        navDropdownContent.appendChild(lightThemeButton);
        navDropdownContent.appendChild(darkThemeButton);
    }
    else {
        closeNav();
    }

    console.log("Nav Menu");
})

function closeNav() {
    navDropdownContent.style.display = "none";
    homeLi.appendChild(homeButton);
    listLi.appendChild(listButton);
    themeDropdownContent.appendChild(systemThemeButton);
    themeDropdownContent.appendChild(lightThemeButton);
    themeDropdownContent.appendChild(darkThemeButton);
}