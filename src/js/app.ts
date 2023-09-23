const invisible = "invisible";

/* SCROLL ARROW */
let arrowDownElement = document.querySelector(".arrow-down");
arrowDownElement?.addEventListener("click", async () => {
    ShowScrollBar();
    ScrollToPage(1);
});

/* SCROLL BAR */
function HideScrollBar() {
    hidden = true;
    scrollbarStyle.textContent = "*{-ms-overflow-style: none;scrollbar-width: none;}*::-webkit-scrollbar{display: none;}";
}

function ShowScrollBar() {
    hidden = false;
    scrollbarStyle.textContent = "";
}

/* HIDE PROJECTS HEADLINE */
let projectHeadHidden = true;
let projectHeadLineElement = document.querySelector(".projects-headline");

function ShowProjectHead(){
    projectHeadLineElement?.classList.remove("invisible");
    projectHeadHidden = false;
}

function HideProjectHead(){
    projectHeadLineElement?.classList.add("invisible");
    projectHeadHidden = true;
}

/* HIDE SCROLL BAR AND SNAP PAGES */
let hidden = false;


let scrollbarStyle = document.createElement("style");
document.body.appendChild(scrollbarStyle);
HideScrollBar();

let lastScroll = 0;
let scrollComplete = true;
let scrollTarget = 0;
addEventListener("scroll", async () => {
    let currentScroll = document.documentElement.scrollTop;

    if (currentScroll == 0 && !hidden) {
        HideScrollBar()
    }
    if (currentScroll > 0 && hidden) {
        ShowScrollBar();
    }

    /*if (!scrollComplete) {
        lastScroll = currentScroll;
        return;
    }

    let diff = currentScroll % window.innerHeight;
    if(diff > window.innerHeight / 2){
        diff = window.innerHeight - diff;
    }

    if(diff > 50){
        return;
    }

    if (currentScroll > lastScroll) {
        let raw = currentScroll / window.innerHeight;
        let page = Math.ceil(raw);
        ScrollToPage(page);
    } else {
        let raw = currentScroll / window.innerHeight;
        let page = Math.floor(raw);
        ScrollToPage(page);
    }

    lastScroll = currentScroll;*/
});


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
    if(pageIndex >= 3){
        if(projectHeadHidden){
            ShowProjectHead();
        }
    } else{
        if(!projectHeadHidden){
            HideProjectHead();
        }
    }

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
        if(currentScroll == lastScroll){
            window.scrollTo({ behavior: "smooth", top: scrollTop });
        }

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

window.setInterval(() => {
    let currentScroll = document.documentElement.scrollTop;
    let windowHeight = window.innerHeight;

    if(currentScroll < windowHeight){
        HideNav();
    } else{
        ShowNav();
    }

    var gageIndex = Math.round(currentScroll / windowHeight);

    navItems.forEach(elem => elem.classList.remove("selected"));
    navItems[gageIndex].classList.add("selected");
}, 10);

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