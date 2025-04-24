var list = document.getElementById('list');

var collapsedNavButton = document.getElementById('collapsedNavButton');
var navDropdownContent = document.getElementById('navDropdownContent');
var themeButton = document.getElementById('themeButton');
var quizzesButton = document.getElementById('quizzesButton');
var quizzesLi = document.getElementById('quizzesLi');
var homeButton = document.getElementById('homeButton');
var homeLi = document.getElementById('homeLi');

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
fetch("../json/flagGallery.json").then(function(res) {
    res.json().then(function(json) {
        // Add each country to the grid
        json.countries.forEach(function(el, i) {
            // Create list element
            var listEntry = document.createElement("li");
            listEntry.id = el.name; // each list entry id will be its country's name

            var collapsed = true;

            // Create button
            var listButton = document.createElement("button");

            var infoContent = document.createElement("div");
            infoContent.className = "info-content"

            
            // Create flag image
            var entryFlag = document.createElement("img");
            entryFlag.src = el.flag;
            entryFlag.alt = el.description;
            entryFlag.title = el.description;
            
            // Create h2 to hold the country's name
            var entryName = document.createElement("h2");
            entryName.innerText = el.name;
            
            // Create container for name & flag
            var countryContainer = document.createElement("div");
            countryContainer.className = "country-container";
            
            // Make the flag and name contained within the button
            countryContainer.appendChild(entryFlag);
            countryContainer.appendChild(entryName);
            
            var chevron = document.createElement("i");
            chevron.className = "fa-solid fa-chevron-down";

            // When button is clicked, do displayInfo()
            listButton.addEventListener("click", function(e) {
                e.preventDefault();
    
                if (collapsed)
                    displayDropDown(i, infoContent, chevron);
                else
                    collapseDropDown(i, infoContent, chevron);
    
                collapsed = !collapsed;
            })
        
            listButton.appendChild(countryContainer);
            listButton.appendChild(chevron);

            // Make the button contained into the list element
            listEntry.appendChild(listButton);

            listEntry.appendChild(infoContent);

            // Add list element to the grid
            list.appendChild(listEntry);
        })
    })
})

function displayDropDown(index, content, chevron){
    chevron.className = "fa-solid fa-chevron-up";

    fetch("../json/countryInfo.json").then(function(res) {
        res.json().then(function(json) {
            var el = json.countries[index];

            // Clear mapBox
            content.innerHTML = "";

            var fullNames = document.createElement("div");
            fullNames.className = "full-names";

            el["full-names"].forEach(function(name) {
                var countryName = document.createElement("p");
                countryName.innerHTML = name;
                fullNames.appendChild(countryName);
            })

            // Create Quick Facts
            var quickFacts = document.createElement("article");
            quickFacts.className = "quick-facts";
            var qfHeader = document.createElement("h3");
            qfHeader.innerHTML = "Quick Facts";
            var qfContent = document.createElement("p");
            qfContent.innerHTML = el["quick-facts"];

            quickFacts.appendChild(qfHeader);
            quickFacts.appendChild(qfContent);

            // Create Language
            var language = document.createElement("article");
            language.className = "language";
            var langHeader = document.createElement("h3");
            langHeader.innerHTML = "Language";
            var langContent = document.createElement("p");
            langContent.innerHTML = el.language;

            language.appendChild(langHeader);
            language.appendChild(langContent);

            // Create History
            var history = document.createElement("article");
            history.className = "history";
            var hHeader = document.createElement("h3");
            hHeader.innerHTML = "History";
            var hContent = document.createElement("p");
            hContent.innerHTML = el["brief-history"];

            history.appendChild(hHeader);
            history.appendChild(hContent);

            // Adds info to content
            content.appendChild(fullNames);
            content.appendChild(quickFacts);
            content.appendChild(language);
            content.appendChild(history);
        })
    })
}

function collapseDropDown(index, content, chevron){
    chevron.className = "fa-solid fa-chevron-down";
    content.innerHTML = "";

}

collapsedNavButton.addEventListener("click", function(e) {
    e.preventDefault();
    // Display Nav Menu
    if (navDropdownContent.style.display == "none") {
        navDropdownContent.style.display = "block";
        navDropdownContent.appendChild(homeButton);
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
    quizzesLi.appendChild(quizzesButton);
    themeDropdownContent.appendChild(systemThemeButton);
    themeDropdownContent.appendChild(lightThemeButton);
    themeDropdownContent.appendChild(darkThemeButton);
}