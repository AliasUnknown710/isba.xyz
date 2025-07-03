// js/projects.js
// Handles the dynamic project list and video viewer

document.addEventListener('DOMContentLoaded', function() {
    // Example project data
    const projects = [
        { title: 'Network Scanner', video: 'videos/project1.mp4', desc: 'A fast network scanner.' },
        { title: 'Password Manager', video: 'videos/project2.mp4', desc: 'A secure password manager.' },
        { title: 'SIEM Dashboard', video: 'videos/project3.mp4', desc: 'A custom SIEM dashboard.' }
    ];
    const projList = document.getElementById('proj-list');
    const projVideo = document.getElementById('proj-video');
    projects.forEach((proj, idx) => {
        const li = document.createElement('li');
        li.textContent = proj.title + ' - ' + proj.desc;
        li.onclick = () => {
            projVideo.src = proj.video;
            projVideo.play();
        };
        projList.appendChild(li);
    });
    // Show first project by default
    if (projects.length > 0) projVideo.src = projects[0].video;
});
