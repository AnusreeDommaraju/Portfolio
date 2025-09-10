// Get all service boxes
const serviceBoxes = document.querySelectorAll(".service-box");

serviceBoxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Close all other open cards first
        serviceBoxes.forEach(b => {
            if (b !== box) b.classList.remove("active");
        });

        // Toggle the clicked card
        box.classList.toggle("active");
    });
});

// Resume Tabs
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // Remove active classes
        tabs.forEach(t => t.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));

        // Activate selected tab and content
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});

// Resume Card Expand/Collapse
const resumeCards = document.querySelectorAll('.resume-card');

resumeCards.forEach(card => {
  card.addEventListener('click', () => {
    // Toggle only the clicked card
    card.classList.toggle('active');
  });
});

/* ------------------ PROJECTS DATA & LOGIC ------------------ */
const projects = [
  {
    title: "MyToDo Task Manager",
    desc: "A simple and responsive task manager built with HTML, CSS, and JavaScript to efficiently organize and track daily tasks",
    stack: ["HTML5", "CSS3", "JavaScript"],
    live: "https://golist.tiiny.site/",
    code: "https://github.com/AnusreeDommaraju/MyToDo",
    image: "images/projects/proj1.jpeg",
    thumb: "images/projects/proj1.jpeg"
  },
  {
    title: "OneStop Madison",
    desc: "An e-commerce website developed using HTML, CSS, JavaScript, and PHP for online hunting gear and deli product sales.",
    stack: ["HTML", "CSS", "JavaScript", "PHP"],
    live: "https://www.onestopmadison.com/",
    code: "https://github.com/AnusreeDommaraju/OneStop",
    image: "images/projects/proj2.jpeg",
    thumb: "images/projects/proj2.jpeg"
  },
  {
    title: "ProductStore",
    desc: "A full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js) for seamless product browsing and management.",
    stack: ["MongoDB", "Express.js", "React", "Node.js"],
    live: "https://productstore-xv5x.onrender.com",
    code: "https://github.com/AnusreeDommaraju/ProductStore",
    image: "images/projects/proj3.jpeg",
    thumb: "images/projects/proj3.jpeg"
  }
];

// DOM refs
const projNumber = document.getElementById("projNumber");
const projTitle  = document.getElementById("projTitle");
const projDesc   = document.getElementById("projDesc");
const projStack  = document.getElementById("projStack");
const projLive   = document.getElementById("projLive");
const projCode   = document.getElementById("projCode");
const projImage  = document.getElementById("projImage");
const prevBtn    = document.querySelector(".proj-btn.prev");
const nextBtn    = document.querySelector(".proj-btn.next");
const thumbsWrap = document.getElementById("projThumbs");

let current = 0;

function renderProject(index){
  const p = projects[index];
  projNumber.textContent = String(index + 1).padStart(2, "0");
  projTitle.textContent = p.title;
  projDesc.textContent = p.desc;
  projImage.src = p.image;
  projImage.alt = `${p.title} preview`;
  projLive.href = p.live;
  projCode.href = p.code;

  // stack tags
  projStack.innerHTML = "";
  p.stack.forEach(s => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = s;
    projStack.appendChild(tag);
  });

  // thumbs active state
  [...thumbsWrap.children].forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
}

function buildThumbs(){
  thumbsWrap.innerHTML = "";
  projects.forEach((p, i) => {
    const t = document.createElement("button");
    t.className = "proj-thumb" + (i === 0 ? " active" : "");
    t.innerHTML = `<img src="${p.thumb}" alt="${p.title} thumbnail">`;
    t.addEventListener("click", () => { current = i; renderProject(current); });
    thumbsWrap.appendChild(t);
  });
}

prevBtn.addEventListener("click", () => {
  current = (current - 1 + projects.length) % projects.length;
  renderProject(current);
});
nextBtn.addEventListener("click", () => {
  current = (current + 1) % projects.length;
  renderProject(current);
});

buildThumbs();
renderProject(current);


/* ------------------ CONTACT FORM (demo handler) ------------------ */
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // basic required check
    const data = new FormData(contactForm);
    const required = ["name","email","message"];
    const missing = required.filter(k => !String(data.get(k) || "").trim());

    if (missing.length) {
      formNote.textContent = "Please fill in your name, email, and message.";
      formNote.classList.add("error");
      return;
    }

    // Demo success (replace with fetch to Formspree/Netlify)
    formNote.classList.remove("error");
    formNote.textContent = "Thanks! Your message has been prepared.";
    contactForm.reset();
  });
}
