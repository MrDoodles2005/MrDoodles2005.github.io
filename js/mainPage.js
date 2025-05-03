var gridList = document.getElementById('gridList');
var mapBox = document.getElementById('mapBox');
var headerLogo = document.getElementById('headerlogo');

var map = document.getElementById('interactiveMap');
var newX = 0, newY = 0, startX = 0, startY = 0;

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

map.addEventListener('mousedown', mouseDown);
map.addEventListener('touchstart', touchStart);

function mouseDown(e) {
    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}

function mouseMove(e) {
    newX = startX - e.clientX ;
    newY = startY - e.clientY ;
  
    startX = e.clientX;
    startY = e.clientY;

    // map.style.top = (map.offsetTop - newY) + 'px';
    // map.style.left = (map.offsetLeft - newX) + 'px';

    map.style.top = 'clamp(' + (-402 - (1000 - mapBox.offsetHeight)) + 'px, ' + (map.offsetTop - newY) + 'px, 0px)';
    map.style.left = 'clamp(' + (-22 - (1180 - mapBox.offsetWidth)) + 'px, ' + (map.offsetLeft - newX) + 'px, 0px)';
}

function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove);
}

function touchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;

    document.addEventListener('touchmove', touchMove);
    document.addEventListener('touchend', touchEnd);
}

function touchMove(e) {
    newX = startX - e.touches[0].clientX;
    newY = startY - e.touches[0].clientY;

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;

    map.style.top = 'clamp(' + (-402 - (1000 - mapBox.offsetHeight)) + 'px, ' + (map.offsetTop - newY) + 'px, 0px)';
    map.style.left = 'clamp(' + (-22 - (1180 - mapBox.offsetWidth)) + 'px, ' + (map.offsetLeft - newX) + 'px, 0px)';
}

function touchEnd(e) {
    document.removeEventListener('touchmove', touchMove);
    document.removeEventListener('touchend', touchEnd);
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
                displayInfo(i);
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

fetch("../json/svgs.json").then(function(res) {
    res.json().then(function(json) {
        json.countries.forEach(function(el) {
            var countrySVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            countrySVG.setAttribute('class', 'svgs')
            countrySVG.id = el.name;
            countrySVG.setAttribute('width', el.width);
            countrySVG.setAttribute('height', el.height);
            countrySVG.setAttribute('viewBox', "0 0 " + el.width + " " + el.height);
            countrySVG.setAttribute('fill', "none");
            for (var i = 0; i < el.paths.length; i++) {
                var svgPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                svgPath.setAttribute('d', el.paths[i]);
                svgPath.setAttribute('stroke', "black");
                countrySVG.appendChild(svgPath);
            }

            countrySVG.style.left = el.left;
            countrySVG.style.top = el.top;

            var countryIndex = el.index;

            countrySVG.addEventListener('click', function(e) {
                e.preventDefault();
                displayInfo(countryIndex);

                console.log(el.name);
            })

            map.appendChild(countrySVG);
        })
    })
})

function displayInfo(index) {    // Adds country info to the map info box
    fetch("../json/countryInfo.json").then(function(res) {
        res.json().then(function(json) {
            var el = json.countries[index];

            // Remove existing infobox;
            var oldBox = document.getElementById("infoBox");
            if (mapBox.contains(oldBox)) {
                mapBox.removeChild(oldBox);
            }

            // Create a box to hold the information
            var infoBox = document.createElement("div");
            infoBox.className = "info-box";
            infoBox.id = "infoBox";

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
            fetch("../json/flagGallery.json").then(function(res) {
                res.json().then(function(json) {
                    var flagInfo = json.countries[index];
                    flag.src = flagInfo.flag;
                    flag.alt = flagInfo.description;
                    flag.title = flagInfo.description;
                })
            })

            // Close Button
            var closeButton = document.createElement("button");
            closeButton.className = "info-close";
            var XLogo = document.createElement("i");
            XLogo.classList = "fa-solid fa-x";
            closeButton.appendChild(XLogo);

            closeButton.addEventListener('click', function(e) {
                e.preventDefault();
                mapBox.removeChild(infoBox);
            })

            infoBoxHeader.appendChild(namesContainer);
            // infoBoxHeader.appendChild(fullNamesContainer);
            infoBoxHeader.appendChild(flag);
            infoBoxHeader.appendChild(closeButton);


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