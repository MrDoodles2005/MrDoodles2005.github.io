var quizList = document.getElementById('quizList');
var wrapper =document.getElementById('wrapperID');

var collapsedNavButton = document.getElementById('collapsedNavButton');
var navDropdownContent = document.getElementById('navDropdownContent');
var themeButton = document.getElementById('themeButton');

var themeDropdownContent = document.getElementById('themeDropdownContent');

var theme = localStorage.getItem("theme") || "light dark";
setColorScheme(theme);

for (systemThemeButton of document.getElementsByClassName('system-theme')) {
    systemThemeButton.addEventListener("click", function(e) {
        e.preventDefault();
    
        setColorScheme("light dark");
        themeDropdownContent.style.display = "none";
        navDropdownContent.style.display = "none";
    })
}

for (lightThemeButton of document.getElementsByClassName('light-theme')) {
    lightThemeButton.addEventListener("click", function(e) {
        e.preventDefault();
    
        setColorScheme("light");
        themeDropdownContent.style.display = "none";
        navDropdownContent.style.display = "none";
    })
}

for (darkThemeButton of document.getElementsByClassName('dark-theme')) {
    darkThemeButton.addEventListener("click", function(e) {
        e.preventDefault();
    
        setColorScheme("dark");
        themeDropdownContent.style.display = "none";
        navDropdownContent.style.display = "none";
    })
}

// Night Mode Button Functionality
themeButton.addEventListener("click", function(e) {
    e.preventDefault();
    if (themeDropdownContent.style.display == "none") {
        themeDropdownContent.style.display = "block";
        
    }
    else {
        themeDropdownContent.style.display = "none";
    } 
})

function setColorScheme(mode) {
    localStorage.setItem("theme", mode)
    document.documentElement.dataset.colorScheme = mode;
}

collapsedNavButton.addEventListener("click", function(e) {
    e.preventDefault();
    // Display Nav Menu
    if (navDropdownContent.style.display == "none") {
        navDropdownContent.style.display = "grid";
    }
    else {
        navDropdownContent.style.display = "none";
    }

    console.log("Nav Menu");
})

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

        // Create list element
        var listEntry = document.createElement("li");
        listEntry.className = "more-coming"
        
        // Create h2 to hold the quiz name
        var entryTitle = document.createElement("h2");
        entryTitle.innerText = "More Quizzes Coming Soon...";
        
        // Create container for name & desc
        var infoContainer = document.createElement("div");
        infoContainer.className = "info-container";
        
        // Make the name & desc contained within the button
        infoContainer.appendChild(entryTitle);
        listEntry.appendChild(infoContainer);

        // Add list element to the grid
        quizList.appendChild(listEntry);
    })
})