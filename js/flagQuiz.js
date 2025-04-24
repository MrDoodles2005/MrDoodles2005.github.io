var quizHeader = document.getElementById("quizHeader");
var flagGrid = document.getElementById("flagGrid");
var country = document.getElementById("country");
var score = document.getElementById("score");
var completedText = document.getElementById("completedText");
var flagArray = [];
var globalIndex = 0;
var scoreInt = 0;

var collapsedNavButton = document.getElementById('collapsedNavButton');
var navDropdownContent = document.getElementById('navDropdownContent');
var themeButton = document.getElementById('themeButton');
var homeButton = document.getElementById('homeButton');
var homeLi = document.getElementById('homeLi');
var listButton = document.getElementById('listButton');
var listLi = document.getElementById('listLi');
var quizzesButton = document.getElementById('quizzesButton');
var quizzesLi = document.getElementById('quizzesLi');

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
        var el = json.quizzes[0];

        // Create image
        var img = document.createElement("img");
        img.src = "../" + el.image;
        img.alt = el["image-desc"];
        img.title = el["image-desc"];
            
        // Create h2 to hold the quiz name
        var title = document.createElement("h2");
        title.innerText = el.title;

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

        var emptyFlag = document.createElement("button");
        emptyFlag.className = "empty-flag";
        flagGrid.appendChild(emptyFlag);

        updateTop();
    })
})

function updateTop() {
    fetch("../json/flagGallery.json").then(function(res) {
        res.json().then(function(json) {
            if (globalIndex < 50) {
                var el = json.countries[globalIndex];
                country.innerText = el.name;
                score.innerHTML = scoreInt;
            }
            else {
                globalIndex = 50;
                completedText.innerText = "COMPLETED";
            }
        })
    })

}

collapsedNavButton.addEventListener("click", function(e) {
    e.preventDefault();
    // Display Nav Menu
    if (navDropdownContent.style.display == "none") {
        navDropdownContent.style.display = "block";
        navDropdownContent.appendChild(homeButton);
        navDropdownContent.appendChild(listButton);
        navDropdownContent.appendChild(quizzesButton);
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
    quizzesLi.appendChild(quizzesButton);
    themeDropdownContent.appendChild(systemThemeButton);
    themeDropdownContent.appendChild(lightThemeButton);
    themeDropdownContent.appendChild(darkThemeButton);
}