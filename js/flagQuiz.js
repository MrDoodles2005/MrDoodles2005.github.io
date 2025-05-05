var quizHeader = document.getElementById("quizHeader");
var flagGrid = document.getElementById("flagGrid");
var country = document.getElementById("country");
var score = document.getElementById("score");
var completedText = document.getElementById("completedText");
var flagArray = [];
var globalIndex = 0;
var scoreInt = 0;
var thisQuizTitle = "";

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
        var el = json.quizzes[0];

        // Create image
        var img = document.createElement("img");
        img.src = "../" + el.image;
        img.alt = el["image-desc"];
        img.title = el["image-desc"];
            
        // Create h2 to hold the quiz name
        var title = document.createElement("h2");
        title.innerText = el.title;
        thisQuizTitle = el.title;

        var description = document.createElement("p");
        description.innerText = el["quiz-desc"];
            
        // Create container for name & desc
        var infoContainer = document.createElement("div");
        infoContainer.className = "info-container";
            
        // Make the name & desc contained within the button
        infoContainer.appendChild(title);
        infoContainer.appendChild(description);

        quizHeader.appendChild(img);
        quizHeader.appendChild(infoContainer);
    })
})

fetch("../json/flagGallery.json").then(function(res) {
    res.json().then(function(json) {
        json.countries.forEach(function(el) {
            var arrayEntry = [el.name, "../" +  el.flag];
            flagArray.push(arrayEntry)
        })
        
        flagArray.sort(() => Math.random() - 0.5);

        flagArray.forEach(function(el) {
            var flagBox = document.createElement("button");
            flagBox.className = el[0];
            flagBox.dataset.done = false;

            flagBox.addEventListener("click", function(e) {
                e.preventDefault();
                
                if (flagBox.dataset.done == "false") {
                    if (country.innerText === flagBox.className) {
                        scoreInt++;
                        flagBox.style.backgroundColor = "rgba(21, 255, 0, 0.3)";
                        flagBox.dataset.done = true;
                    }
                    else {
                        var children = flagGrid.children;
                        for (var i = 0; i < children.length; i++) {
                            if (country.innerText === children[i].className) {
                                children[i].style.backgroundColor = "rgba(255, 0, 0, 0.3)";
                                children[i].dataset.done = true;
                            }
                        }
                    }
                
                    globalIndex++;
                }

                updateTop();
            })

            var flag = document.createElement("img");
            flag.src = el[1];
            flag.alt = "Country Flag";
            flag.title = "Country Flag";

            flagBox.appendChild(flag);

            flagGrid.appendChild(flagBox);
        })

        updateTop();
    })
})

function updateTop() {
    fetch("../json/flagGallery.json").then(function(res) {
        res.json().then(function(json) {
            if (globalIndex < 50) {
                var el = json.countries[globalIndex];
                country.innerText = el.name;
            }
            else {
                globalIndex = 50;
                completedText.innerText = "COMPLETED";
            }
            score.innerHTML = scoreInt;
        })
    })

}

// gets the flagGallery json file and creates the list using its contents
fetch("../json/quizInfo.json").then(function(res) {
    res.json().then(function(json) {
        // Add each country to the grid
        json.quizzes.forEach(function(el, i) {
            if (thisQuizTitle != el.title) {
                // Create list element
                var listEntry = document.createElement("li");
                listEntry.id = el["ID"]; // each list entry id will be its country's name

                // Create button
                var listAnchor = document.createElement("a");
                listAnchor.href = el.link;

                // Create image
                var entryImg = document.createElement("img");
                entryImg.src = "../" + el.image;
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
            }
        })
        
        // Create list element
        var listEntry = document.createElement("li");
        listEntry.className = "sporcle-link";

        // Create button
        var listAnchor = document.createElement("a");
        listAnchor.href = "https://www.sporcle.com/games/category/geography";

        // Create image
        var entryImg = document.createElement("img");
        entryImg.src = "../img/Sporcle.png";
        entryImg.alt = "Sporcle Logo";
        entryImg.title = "Sporcle Logo";
        
        // Create h2 to hold the quiz name
        var entryTitle = document.createElement("h2");
        entryTitle.innerText = "Already played all our quizzes?";

        var entryDesc = document.createElement("p");
        entryDesc.innerText = "Try Sporcle's";
        
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