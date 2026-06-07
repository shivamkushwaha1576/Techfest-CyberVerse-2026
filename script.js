// =======================
// LOADER
// =======================

window.addEventListener("load", () => {

    gsap.to("#loader", {
        opacity: 0,
        duration: 1.5,
        delay: 1,
        onComplete: () => {
            document.getElementById("loader").style.display = "none";
        }
    });

});

// =======================
// TYPING EFFECT
// =======================

const words = [
    "Future Starts Here",
    "Artificial Intelligence",
    "Cyber Security",
    "Quantum Computing",
    "Space Technology"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingText = document.getElementById("typingText");

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

// =======================
// THEME TOGGLE
// =======================

const themeBtn =
    document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        themeBtn.innerHTML = "☀️";

    } else {

        themeBtn.innerHTML = "🌙";
    }

});

// =======================
// MUSIC TOGGLE
// =======================

const music =
    document.getElementById("bgmusic");

const musicBtn =
    document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicBtn.innerHTML = "🔊";

    } else {

        music.pause();

        musicBtn.innerHTML = "🎵";
    }

});

// =======================
// PROGRESS BAR
// =======================

window.addEventListener("scroll", () => {

    let winScroll =
        document.documentElement.scrollTop;

    let height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    let scrolled =
        (winScroll / height) * 100;

    document.getElementById(
        "progressBar"
    ).style.width = scrolled + "%";

});

// =======================
// CUSTOM CURSOR
// =======================

const cursor =
    document.querySelector(".cursor");

document.addEventListener(
    "mousemove",
    (e) => {

        cursor.style.left =
            e.clientX + "px";

        cursor.style.top =
            e.clientY + "px";

    }
);

// =======================
// GSAP HERO ANIMATION
// =======================

gsap.from(".hero h1", {

    y: -100,
    opacity: 0,
    duration: 1.5

});

gsap.from(".hero h2", {

    y: 50,
    opacity: 0,
    duration: 1.5,
    delay: 0.5

});

gsap.from(".hero p", {

    y: 50,
    opacity: 0,
    duration: 1.5,
    delay: 1

});

gsap.from(".btn", {

    scale: 0,
    duration: 1,
    delay: 1.5

});

// =======================
// GSAP SCROLL ANIMATIONS
// =======================

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".card").forEach(card => {

    gsap.from(card, {

        scrollTrigger: card,

        opacity: 0,

        y: 100,

        duration: 1.2

    });

});

// =======================
// THREE JS SCENE
// =======================

const scene = new THREE.Scene();

const camera =
    new THREE.PerspectiveCamera(
        75,
        window.innerWidth /
        window.innerHeight,
        0.1,
        1000
    );

const renderer =
    new THREE.WebGLRenderer({
        canvas:
            document.querySelector("#bg"),
        alpha: true
    });

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    window.devicePixelRatio
);

// =======================
// EARTH SPHERE
// =======================

const geometry =
    new THREE.SphereGeometry(
        2,
        64,
        64
    );

const material =
    new THREE.MeshStandardMaterial({

        color: 0x00ffff,

        wireframe: true

    });

const earth =
    new THREE.Mesh(
        geometry,
        material
    );

scene.add(earth);

// =======================
// LIGHT
// =======================

const light =
    new THREE.PointLight(
        0xffffff,
        3
    );

light.position.set(
    5,
    5,
    5
);

scene.add(light);

camera.position.z = 5;

// =======================
// PARTICLE GALAXY
// =======================

const particlesGeometry =
    new THREE.BufferGeometry();

const particlesCount = 5000;

const posArray =
    new Float32Array(
        particlesCount * 3
    );

for (
    let i = 0;
    i < particlesCount * 3;
    i++
) {

    posArray[i] =
        (Math.random() - 0.5) * 50;
}

particlesGeometry.setAttribute(

    "position",

    new THREE.BufferAttribute(
        posArray,
        3
    )
);

const particlesMaterial =
    new THREE.PointsMaterial({

        size: 0.02

    });

const particlesMesh =
    new THREE.Points(
        particlesGeometry,
        particlesMaterial
    );

scene.add(particlesMesh);

// =======================
// ANIMATION LOOP
// =======================

function animate() {

    requestAnimationFrame(
        animate
    );

    earth.rotation.y += 0.003;

    particlesMesh.rotation.y +=
        0.0005;

    renderer.render(
        scene,
        camera
    );
}

animate();

// =======================
// RESPONSIVE
// =======================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);