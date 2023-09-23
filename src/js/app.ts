const invisible = "invisible";

/* SCROLL ARROW */
let arrowDownElement = document.querySelector(".arrow-down");
arrowDownElement?.addEventListener("click", async () => {
    ShowScrollBar();
    ScrollToPage(1);
});

/* SCROLL BAR */

/* HIDE SCROLL BAR AND SNAP PAGES */
let hidden = false;


let scrollbarStyle = document.createElement("style");
document.body.appendChild(scrollbarStyle);
HideScrollBar();

let lastScroll = 0;
let scrollComplete = true;
let scrollTarget = 0;



/* AUTO SNAP */
let lastAutoSnapScroll = 0;
window.setInterval(() => {
    let currentScroll = document.documentElement.scrollTop;

    if (!scrollComplete || currentScroll % window.innerHeight == 0) {
        lastAutoSnapScroll = currentScroll;
        return;
    }

    let diffToLastScroll = Math.abs(currentScroll - lastAutoSnapScroll);

    if(diffToLastScroll > 5){
        lastAutoSnapScroll = currentScroll;
        return;
    }

    let diffToNextPage = currentScroll % window.innerHeight;
    if(diffToNextPage > window.innerHeight / 2){
        diffToNextPage = window.innerHeight - diffToNextPage;
    }
    
    if(diffToNextPage > 100){
        lastAutoSnapScroll = currentScroll;
        return;
    }
    

    let page = Math.round(currentScroll / window.innerHeight);
    ScrollToPage(page);
    lastAutoSnapScroll = currentScroll;
}, 100);

function ScrollToPage(pageIndex: number){
    let scrollTop = window.innerHeight * pageIndex;
    scrollTarget = scrollTop;
    scrollComplete = false;
    window.scrollTo({ behavior: "smooth", top: scrollTop });

    let lastScroll = 0;
    let checker = window.setInterval(() => {
        if (scrollComplete) {
            window.clearInterval(checker);
            return;
        }

        let currentScroll = document.documentElement.scrollTop;

        let diff = Math.abs(currentScroll - scrollTarget);
        console.log(diff);
        
        scrollComplete = diff < 10;
        lastScroll = currentScroll;
    }, 30);

    window.setTimeout(() => {
        scrollComplete = true;
    }, 700)
}

let navItems = document.querySelectorAll(".nav-page");

for(let i = 0; i < navItems.length; i++){
    navItems[i].addEventListener("click", () => {
        ScrollToPage(i);
    });
}

/* Show/Hide Loop */
addEventListener("scroll", async () => {

    let currentScroll = document.documentElement.scrollTop;
    let windowHeight = window.innerHeight;

    if(currentScroll < windowHeight * 1){
        HideNav();
    } else{
        ShowNav();
    }

    if(currentScroll < windowHeight * 3){
        HideProjectHead();
    } else{
        ShowProjectHead();
    }


    if (currentScroll == 0) {
        HideScrollBar();
    } else{
        ShowScrollBar();
    }

    var gageIndex = Math.round(currentScroll / windowHeight);

    navItems.forEach(elem => elem.classList.remove("selected"));
    navItems[gageIndex].classList.add("selected");
});

/* HIDE SCROLL BAR */
function HideScrollBar() {
    if(hidden){
        return;
    }
    hidden = true;
    scrollbarStyle.textContent = "*{-ms-overflow-style: none;scrollbar-width: none;}*::-webkit-scrollbar{display: none;}";
}

function ShowScrollBar() {
    if(!hidden){
        return;
    }
    hidden = false;
    scrollbarStyle.textContent = "";
}


/* Nav Menu */
let nav = document.querySelector("nav");
function ShowNav(){
    if(!nav?.classList.contains(invisible)){
        return;
    }

    nav?.classList.remove(invisible);
}

function HideNav(){
    if(nav?.classList.contains(invisible)){
        return;
    }

    nav?.classList.add(invisible);
}

/* HIDE PROJECTS HEADLINE */
let projectHeadHidden = true;
let projectHeadLineElement = document.querySelector(".projects-headline");

function ShowProjectHead(){
    if(!projectHeadLineElement?.classList.contains(invisible)){
        return;
    }

    projectHeadLineElement?.classList.remove(invisible);
}

function HideProjectHead(){
    if(projectHeadLineElement?.classList.contains(invisible)){
        return;
    }

    projectHeadLineElement?.classList.add(invisible);
}