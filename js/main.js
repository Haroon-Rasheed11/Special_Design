//local storg for color option

const mainColor = localStorage.getItem("color-opition");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color--", mainColor);
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("act");
    // element.target.classList.add("act");
    if (element.dataset.color === mainColor) {
      element.classList.add("act");
    }
  });
}

//toggal spin class

let settingBox = document.querySelector(".setting-box");
let toggal = document.querySelector(".toggal-setting");
// // select page element
let point = document.querySelectorAll(".point ul li");
let BNext = document.querySelector(".next span");
let BPrev = document.querySelector(".prev span");
let activ = document.querySelector(".activ");
let count = 0;
let landingPage = document.querySelector(".landing-page");
let imageArray = [
  "page1.png",
  "page-1.jpg",
  "page-2.png",
  "page-3.jpg",
  "page-4.png",
  "page-5.jpg",
];
function timeP() {
  let randoomNum = Math.floor(Math.random() * imageArray.length);
  let img = new Image();
  img.src = `image/${imageArray[randoomNum]}`;
  img.onload = function () {
    landingPage.style.backgroundImage = `url("${img.src}")`;
    landingPage.style.transition = "0.3s";
    localStorage.setItem("chang", img.src);
    pointrPrev();
  };
}
function time() {
  let randoomNum = Math.floor(Math.random() * imageArray.length);
  let img = new Image();
  img.src = `image/${imageArray[randoomNum]}`;
  img.onload = function () {
    landingPage.style.backgroundImage = `url("${img.src}")`;
    landingPage.style.transition = "0.3s";
    localStorage.setItem("chang", img.src);

    pointr();
  };
}
//opition-3  randoom background opition
let backgroundOpition = true;

let backgroundInterval;

let no = document.querySelector(".no");
let Yes = document.querySelector(".Yes");
// button yes or no
no.onclick = function () {
  backgroundOpition = false;
  clearInterval(backgroundInterval);
  localStorage.setItem("backgroundopition", false);
};
Yes.onclick = function () {
  backgroundOpition = true;
  randomizeImage();
  localStorage.setItem("backgroundopition", true);
};
//local storag for background
let backgroundLocal = localStorage.getItem("backgroundopition");
if (backgroundLocal !== null) {
  if (backgroundLocal === "true") {
    backgroundOpition = true;
  } else {
    backgroundOpition = false;
  }
  console.log(backgroundLocal);
}
//funcition randomaiz funcition
function randomizeImage() {
  if (backgroundOpition === true) {
    backgroundInterval = setInterval(() => {
      time();
    }, 3000);
  }
}
randomizeImage();
//زر الانتقال
let ent = document.querySelector(".ent");
let ON = document.querySelector(".ent p:first-child");
let off = document.querySelector(".ent p:not(:first-child)");
let onq = false;

let entMoveLocal = localStorage.getItem("entMove");

if (entMoveLocal === "true") {
  ent.classList.add("move");
  ON.style.visibility = "visible";
  off.style.visibility = "hidden";
  onq = true;
} else {
  ent.classList.remove("move");
  ON.style.visibility = "hidden";
  off.style.visibility = "visible";
  onq = false;
}

ent.addEventListener("click", function () {
  // ent.style.position = "absolute";
  // ent.style.right = "30px";
  ent.classList.toggle("move");
  localStorage.setItem("entMove", ent.classList.contains("move"));
  onq = !onq;
  if (onq) {
    ON.style.visibility = "visible";
    off.style.visibility = "hidden";
    backgroundOpition = false;
    localStorage.setItem("backgroundopition", false);
    clearInterval(backgroundInterval);
  } else {
    backgroundOpition = true;
    randomizeImage();
    localStorage.setItem("backgroundopition", true);
    ON.style.visibility = "hidden";
    off.style.visibility = "visible";
  }
});
// time();
// chang landing image with button
let ch = localStorage.getItem("chang");
if (ch !== null) {
  landingPage.style.backgroundImage = `url("${ch}")`;
  landingPage.style.transition = "0.3s";
}
function pointr() {
  point.forEach((li) => li.classList.remove("activ"));
  point[count].classList.add("activ");
  count++;
  if (count >= point.length) {
    count = 0;
  }
}
function pointrPrev() {
  count--;
  if (count < 0) {
    count = point.length - 1;
  }

  point.forEach((li) => li.classList.remove("activ"));
  point[count].classList.add("activ");
}
BNext.onclick = function () {
  time();
};
BPrev.onclick = function () {
  timeP();
};
settingBox.classList.add("open");
toggal.onclick = function () {
  settingBox.classList.toggle("open");
};

//opition color
const colorslist = document.querySelectorAll(".colors-list li");

colorslist.forEach((li) => {
  console.log(li);
  li.addEventListener("click", (e) => {
    console.log(e.target.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color--",
      e.target.dataset.color,
    );
    //local storge set item color
    localStorage.setItem("color-opition", e.target.dataset.color);
    colorslist.forEach((li) => {
      li.classList.remove("act");
    });
    e.target.classList.add("act");
  });
});

//opition languge
import translation from "./transilition.js";
const langugeSelector = document.querySelector("select");
langugeSelector.addEventListener("change", (event) => {
  setlanguge(event.target.value);
  localStorage.setItem("lang", event.target.value);
});
document.addEventListener("DOMContentLoaded", () => {
  const languge = localStorage.getItem("lang");
  langugeSelector.value = languge;

  setlanguge(languge);
});
const setlanguge = (languge) => {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const translitionKey = element.getAttribute("data-i18n");
    element.textContent = translation[languge][translitionKey];
  });
  document.dir = languge === "ar" ? "rtl" : "ltr";
  if (languge === "ar") {
    BPrev.onclick = function () {
      time();
    };
    BNext.onclick = function () {
      timeP();
    };
  } else {
    BNext.onclick = function () {
      time();
    };
    BPrev.onclick = function () {
      timeP();
    };
  }
  elements.forEach((el) => {
    if (languge === "ar") {
      el.style.fontWeight = "bold";
    } else {
      el.style.fontWeight = "normal";
    }
  });
};

// opition-box4
const showBullet = document.querySelector(".setting-box .Yess");
const hiddenBullet = document.querySelector(".setting-box .noo");
const bulletsnav = document.querySelector(".bullets-nav");
let chois = localStorage.getItem("save");
if (chois != null) {
  if (chois === "show") {
    bulletsnav.classList.add("bullets-nav");
    showBullet.style.opacity = "1";
    hiddenBullet.style.opacity = "0.6";
  }
  if (chois === "hid") {
    bulletsnav.classList.remove("bullets-nav");
    hiddenBullet.style.opacity = "1";
    showBullet.style.opacity = "0.6";
  }
}
showBullet.onclick = function () {
  bulletsnav.classList.add("bullets-nav");
  tooltips.forEach((tol) => {
    tol.classList.add("tooltip");
  });
  showBullet.style.opacity = "1";
  hiddenBullet.style.opacity = "0.6";
  localStorage.setItem("save", "show");
};
hiddenBullet.onclick = function () {
  bulletsnav.classList.remove("bullets-nav");
  tooltips.forEach((tol) => {
    tol.classList.add("hide-bullets");
  });
  hiddenBullet.style.opacity = "1";
  showBullet.style.opacity = "0.6";
  localStorage.setItem("save", "hid");
};
// our skills
//select our skill selctor
let ourSkill = document.querySelector(".our-skills");

window.onscroll = function () {
  //skills off st top
  let SkillsOffSetTop = ourSkill.offsetTop;

  // skills outr hight
  let skillsOutrHight = ourSkill.offsetHeight;

  //window Height
  let WindowHeight = this.innerHeight;

  //window Scroll
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > SkillsOffSetTop + skillsOutrHight - WindowHeight) {
    let allSkills = this.document.querySelectorAll(
      ".box-skills .porogres-skills span ",
    );
    allSkills.forEach((skills) => {
      skills.style.width = skills.dataset.progres;
      skills.parentElement.parentElement.classList.add("show");
    });
  }
};
// start our galerry
let galerry = document.querySelectorAll(".gallery img");

galerry.forEach((img) => {
  img.addEventListener("click", (e) => {
    let ovarlay = document.createElement("div");
    ovarlay.className = "popup-ovarlay";
    document.body.appendChild(ovarlay);

    //create popup-box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let imgheader = document.createElement("h3");
      let imgtext = document.createTextNode(img.alt);
      // imgheader.style.textAlign = "center";
      imgheader.appendChild(imgtext);
      popupBox.appendChild(imgheader);
    }
    //craete popup-image
    let popupimg = document.createElement("img");
    popupimg.src = img.src;
    popupBox.appendChild(popupimg);
    document.body.appendChild(popupBox);

    // /craete span close
    let close = document.createElement("span");
    let textclose = document.createTextNode("X");
    close.appendChild(textclose);
    close.onclick = function () {
      // ovarlay.classList.remove("popup-ovarlay");
      // popupBox.classList.remove("popup-box");
      ovarlay.remove();
      popupBox.remove();
    };
    popupBox.appendChild(close);
  });
});
// start nav-boletts
let bullets = document.querySelectorAll(".bullets");
let tooltips = document.querySelectorAll(".tooltip");

bullets.forEach((b) => {
  b.addEventListener("click", function (e) {
    // اخفاء كل التولتيب
    tooltips.forEach((t) => {
      t.classList.remove("activ-buletts");
      // t.style.display = "none";
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });

    // اظهار التولتيب الخاص بالعنصر اللي انضغط
    //   let currentTooltip = b.querySelector(".tooltip");
    //   currentTooltip.style.display = "block";
    //   currentTooltip.classList.add("activ-buletts");
    //   setTimeout(() => {
    //     currentTooltip.style.display = "none";
    //     currentTooltip.style.transition = "0.3s";
    //   }, 1000);
  });
});

// select all links

const allLinks = document.querySelectorAll(".link a");
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
//rest button
document.querySelector(".rest-option").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("save");
  localStorage.removeItem("entMove");
  localStorage.removeItem("backgroundopition");
  localStorage.removeItem("color-opition");
  localStorage.removeItem("lang");
  window.location.reload();
};
// button of menu
let menu = document.querySelector(".toggal-menu");
let me = document.querySelector(".menu-land");
menu.onclick = function () {
  me.classList.toggle("show");
  me.innerHTML = "";
  allLinks.forEach((link) => {
    let clenLink = link.cloneNode(true);
    me.appendChild(clenLink);
    clenLink.classList.add("clenLink");
    clenLink.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
      me.classList.remove("show");
    });
  });
};
