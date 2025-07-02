// carousel.js

// =====================
// Certifications Page Carousel
// =====================
// This script manages the image carousel for professional certifications.
// It cycles through certificate images and descriptions with left/right arrows.

function initCertificationsCarousel() {
    const certificates = [
        { title: 'Certified Ethical Hacker', img: 'img/cert1.png', desc: 'EC-Council CEH' },
        { title: 'CompTIA Security+', img: 'img/cert2.png', desc: 'CompTIA Security+ SY0-601' },
        { title: 'CISSP', img: 'img/cert3.png', desc: 'ISC2 CISSP' }
    ];
    let certIndex = 0;
    function showCert(idx) {
        const cert = certificates[idx];
        document.getElementById('cert-carousel-content').innerHTML =
            `<h2>${cert.title}</h2><img class='cert-img' src='${cert.img}' alt='${cert.title}'><p>${cert.desc}</p>`;
    }
    document.getElementById('cert-prev').onclick = function() {
        certIndex = (certIndex - 1 + certificates.length) % certificates.length;
        showCert(certIndex);
    };
    document.getElementById('cert-next').onclick = function() {
        certIndex = (certIndex + 1) % certificates.length;
        showCert(certIndex);
    };
    showCert(certIndex);
}

// =====================
// Projects Page Carousel
// =====================
// This script manages the video carousel for projects.
// It cycles through project videos and descriptions with left/right arrows.

function initProjectsCarousel() {
    const projects = [
        { title: 'Network Scanner', video: 'videos/project1.mp4', desc: 'A fast network scanner.' },
        { title: 'Password Manager', video: 'videos/project2.mp4', desc: 'A secure password manager.' },
        { title: 'SIEM Dashboard', video: 'videos/project3.mp4', desc: 'A custom SIEM dashboard.' }
    ];
    let projIndex = 0;
    function showProj(idx) {
        const proj = projects[idx];
        document.getElementById('proj-carousel-content').innerHTML =
            `<h2>${proj.title}</h2><video class='project-video' src='${proj.video}' controls></video><p>${proj.desc}</p>`;
    }
    document.getElementById('proj-prev').onclick = function() {
        projIndex = (projIndex - 1 + projects.length) % projects.length;
        showProj(projIndex);
    };
    document.getElementById('proj-next').onclick = function() {
        projIndex = (projIndex + 1) % projects.length;
        showProj(projIndex);
    };
    showProj(projIndex);
}
