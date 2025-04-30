var gridList = document.getElementById('gridList');
var mapBox = document.getElementById('mapBox');
var headerLogo = document.getElementById('headerlogo');

var collapsedNavButton = document.getElementById('collapsedNavButton');
var navDropdownContent = document.getElementById('navDropdownContent');
var themeButton = document.getElementById('themeButton');
var quizzesButton = document.getElementById('quizzesButton');
var quizzesLi = document.getElementById('quizzesLi');
var listButton = document.getElementById('listButton');
var listLi = document.getElementById('listLi');

var themeDropdownContent = document.getElementById('themeDropdownContent');
var systemThemeButton = document.getElementById('systemTheme');
var lightThemeButton = document.getElementById('lightTheme');
var darkThemeButton = document.getElementById('darkTheme');

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

// gets the flagGallery json file and creates the grid using its contents
fetch("../json/flagGallery.json").then(function(res) {
    res.json().then(function(json) {
        // Add each country to the grid
        json.countries.forEach(function(el, i) {
            // Create list element
            var gridEntry = document.createElement("li");

            // Create button
            var gridButton = document.createElement("button");
            gridButton.id = el.name; // each buttons id will be its country's name

            // When button is clicked, do displayInfo()
            gridButton.addEventListener("click", function(e) {
                e.preventDefault();
                displayInfo(i, el);
            })

            // Create flag image
            var entryFlag = document.createElement("img");
            entryFlag.src = el.flag;
            entryFlag.alt = el.description;
            entryFlag.title = el.description;
            

            // Create h2 to hold the country's name
            var entryName = document.createElement("h2");
            entryName.innerText = el.name;

            // Make the flag and name contained within the button
            gridButton.appendChild(entryFlag);
            gridButton.appendChild(entryName);

            // Make the button contained into the list element
            gridEntry.appendChild(gridButton);

            // Add list element to the grid
            gridList.appendChild(gridEntry);
        })
    })
})

function displayInfo(index, flagInfo) {    // Adds country info to the map info box
    fetch("../json/countryInfo.json").then(function(res) {
        res.json().then(function(json) {
            var el = json.countries[index];

            // Clear mapBox
            mapBox.innerHTML = "";

            // Create a box to hold the information
            var infoBox = document.createElement("div");
            infoBox.className = "info-box";

            // Create Header 
            var infoBoxHeader = document.createElement("header");
            infoBoxHeader.className = "info-box-header";

            var namesContainer = document.createElement("div");
            namesContainer.className = "names-container";

            var countryName = document.createElement("h2");
            countryName.innerHTML = el.name;

            if (el.name === "Bosnia & Herzegovina")
                countryName.style.maxWidth = "235px";
            else if (el.name === "North Macedonia")
                countryName.style.maxWidth = "200px";
            else
                countryName.style.maxWidth = "calc(100%)";

            var fullNamesContainer = document.createElement("div");
            fullNamesContainer.className = "full-names-container";

            if (el.name === "UK")
                fullNamesContainer.style.maxWidth = "230px";
            else if (el.name === "Vatican City")
                fullNamesContainer.style.width = "150px";
            else
                fullNamesContainer.style.maxWidth = "none";

            namesContainer.appendChild(countryName);
            namesContainer.appendChild(fullNamesContainer);

            if (el["full-names"].length > 2)
            {
                showCollapsedNames(fullNamesContainer, el);
            }
            else{
                el["full-names"].forEach(function(name) {
                    var countryName = document.createElement("p");
                    countryName.innerHTML = name;
                    fullNamesContainer.appendChild(countryName);
                })
            }

            // Create flag
            var flag = document.createElement("img");
            flag.src = flagInfo.flag;
            flag.alt = flagInfo.description;
            flag.title = flagInfo.description;

            infoBoxHeader.appendChild(namesContainer);
            // infoBoxHeader.appendChild(fullNamesContainer);
            infoBoxHeader.appendChild(flag);


            // Create all Info
            var infoAndNav = document.createElement("div");
            infoAndNav.className = "info-and-nav";

            var carousel = document.createElement("div");
            carousel.className = "carousel";

            var infoBody = document.createElement("div");
            infoBody.className = "info-body";

            var bhBody = document.createElement("div");
            bhBody.className = "brief-history-body";

            var qfBody = document.createElement("div");
            qfBody.className = "quick-facts-body";

            var lBody = document.createElement("div");
            lBody.className = "language-body";

            // Brief History
            var briefHistory = document.createElement("article");
            briefHistory.className = "brief-history";
            var bhContent = document.createElement("p");
            bhContent.innerHTML = el["brief-history"];

            // Quick Facts
            var quickFacts = document.createElement("article");
            quickFacts.className = "quick-facts";
            var qfContent = document.createElement("p");
            qfContent.innerHTML = el["quick-facts"];

            // Language(s)
            var language = document.createElement("article");
            language.className = "language";
            var lContent = document.createElement("p");
            lContent.innerHTML = el.language;

            // Adds carousel nav
            var nav = document.createElement("nav");
            var historyButton = document.createElement("button");
            var hbText = document.createElement("h3");
            hbText.innerText = "Brief History";
            historyButton.appendChild(hbText);
            historyButton.addEventListener("click", function(e) {
                e.preventDefault();

                historyButton.className = "selected-nav";
                factsButton.classList.remove("selected-nav");
                langButton.classList.remove("selected-nav");

                infoBody.style.left = "0px"; 
            
            })
            var factsButton = document.createElement("button");
            factsButton.className = "selected-nav";
            var fbText = document.createElement("h3");
            fbText.innerText = "Quick Facts";
            factsButton.appendChild(fbText);
            factsButton.addEventListener("click", function(e) {
                e.preventDefault();

                factsButton.className = "selected-nav";
                historyButton.classList.remove("selected-nav");
                langButton.classList.remove("selected-nav");

                // infoBody.style.left = "-100%";
                infoBody.style.setProperty('left', 'calc(-100% - 25px'); 
            })
            var langButton = document.createElement("button");
            var lbText = document.createElement("h3");
            lbText.innerText = "Language";
            langButton.appendChild(lbText);
            langButton.addEventListener("click", function(e) {
                e.preventDefault();

                langButton.className = "selected-nav";
                factsButton.classList.remove("selected-nav");
                historyButton.classList.remove("selected-nav");

                // infoBody.style.left = "-200%"; 
                infoBody.style.setProperty('left', 'calc(-200% - 50px'); 

            })
            nav.appendChild(historyButton);
            nav.appendChild(factsButton);
            nav.appendChild(langButton);

            // Add to Body Containers
            briefHistory.appendChild(bhContent);
            bhBody.appendChild(briefHistory);

            quickFacts.appendChild(qfContent);
            qfBody.appendChild(quickFacts);

            language.appendChild(lContent);
            lBody.appendChild(language);

            infoBody.appendChild(bhBody);
            infoBody.appendChild(qfBody);
            infoBody.appendChild(lBody);

            carousel.appendChild(infoBody);

            infoAndNav.appendChild(nav);
            infoAndNav.appendChild(carousel);

            infoBox.appendChild(infoBoxHeader);
            infoBox.appendChild(infoAndNav);
            mapBox.appendChild(infoBox);

            globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        })
    })
}

function showCollapsedNames(fullNamesContainer, el) {
    fullNamesContainer.innerHTML = "";

    var countryName = document.createElement("p");
    countryName.innerHTML = el["full-names"][0];
    fullNamesContainer.appendChild(countryName);

    var moreNamesButton = document.createElement("p");
    moreNamesButton.className = "names-button";
    moreNamesButton.innerHTML = "Other names ";
    var caretDown = document.createElement("i");
    caretDown.className = "fa-solid fa-caret-down";
    moreNamesButton.appendChild(caretDown);

    moreNamesButton.addEventListener("click", function(e) {
        e.preventDefault();

        showExpandedNames(fullNamesContainer, el);
    })

    fullNamesContainer.appendChild(moreNamesButton);
}

function showExpandedNames(fullNamesContainer, el) {
    fullNamesContainer.innerHTML = "";

    el["full-names"].forEach(function(name) {
        var countryName = document.createElement("p");
        countryName.innerHTML = name;
        fullNamesContainer.appendChild(countryName);
    })

    var lessNamesButton = document.createElement("p");
    lessNamesButton.className = "names-button";
    lessNamesButton.innerHTML = "Collapse names ";
    var caretUp = document.createElement("i");
    caretUp.className = "fa-solid fa-caret-up";
    lessNamesButton.appendChild(caretUp);

    lessNamesButton.addEventListener("click", function(e) {
        e.preventDefault();

        showCollapsedNames(fullNamesContainer, el);
    })

    fullNamesContainer.appendChild(lessNamesButton);
}

collapsedNavButton.addEventListener("click", function(e) {
    e.preventDefault();
    // Display Nav Menu
    if (navDropdownContent.style.display == "none") {
        navDropdownContent.style.display = "block";
        navDropdownContent.appendChild(quizzesButton);
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
    quizzesLi.appendChild(quizzesButton);
    listLi.appendChild(listButton);
    themeDropdownContent.appendChild(systemThemeButton);
    themeDropdownContent.appendChild(lightThemeButton);
    themeDropdownContent.appendChild(darkThemeButton);
}