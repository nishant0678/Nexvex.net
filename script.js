// Menu toggle
function toggleMenu(){
    const m = document.getElementById("mobileMenu");
    m.style.display = m.style.display === "flex" ? "none" : "flex";
}

// Slide animation (only for homepage)
let slides = document.querySelectorAll(".slide");
if(slides.length){
    let i = 0;
    setInterval(()=>{
        slides[i].classList.remove("active");
        i = (i + 1) % slides.length;
        slides[i].classList.add("active");
    }, 5000);
}

// Particle generation
let particles = [];
for(let i = 0; i < 50; i++){
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.width = 2 + Math.random() * 6 + "px";
    p.style.height = p.style.width;
    p.style.backgroundColor = `hsl(${Math.random()*360},100%,75%)`;
    p.style.animationDuration = 4 + Math.random()*8 + "s";
    document.body.appendChild(p);
    particles.push(p);
}

// Mouse parallax (slides + particles)
document.addEventListener('mousemove', e => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    slides.forEach((s, index) => {
        s.style.transform = `translate(${x*20*(index+1)}px,${y*15*(index+1)}px)`;
    });
    particles.forEach(p => {
        const speed = parseFloat(p.style.width)*2;
        p.style.transform = `translate(${x*speed}px,${y*speed}px)`;
    });
});

// Animated counters (only for homepage)
function animate(id, target){
    let n = 0;
    const el = document.getElementById(id);
    if(!el) return;
    const t = setInterval(()=>{
        n += Math.ceil(target/40);
        if(n >= target){ n=target; clearInterval(t) }
        el.innerText = n + "+";
    }, 30);
}
animate("players", 1200);
animate("servers", 4);

// Theme & accent
function setAccent(color){
    document.documentElement.style.setProperty('--accent', color);
    localStorage.setItem("accent", color);
}
function toggleMode(){
    document.body.classList.toggle("light");
    localStorage.setItem("mode", document.body.classList.contains("light"));
}
if(localStorage.accent){
    document.documentElement.style.setProperty('--accent', localStorage.accent);
}
if(localStorage.mode==="true"){
    document.body.classList.add("light");
}

// Automatically highlight current page in navbar
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav .links a, #mobileMenu a");
  const path = window.location.pathname.split("/").pop();
  links.forEach(link => {
    if(link.getAttribute("href") === path){
      link.classList.add("current-page");
      link.setAttribute("aria-current", "page");
    }
  });
});
