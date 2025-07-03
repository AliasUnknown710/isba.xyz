// js/certifications.js
// Handles the dynamic certification list and PDF viewer

document.addEventListener('DOMContentLoaded', function() {
    // Example certification data
    // Each PDF will be fetched via a worker endpoint, e.g. /api/cert-pdf?cert=ceh
    const certifications = [
        { title: 'Certified Ethical Hacker', workerParam: 'ceh' },
        { title: 'CompTIA Security+', workerParam: 'securityplus' },
        { title: 'CISSP', workerParam: 'cissp' }
    ];
    const certList = document.getElementById('cert-list');
    const certPdf = document.getElementById('cert-pdf');
    certifications.forEach((cert, idx) => {
        const li = document.createElement('li');
        li.textContent = cert.title;
        li.onclick = () => {
            certPdf.src = `/api/cert-pdf?cert=${encodeURIComponent(cert.workerParam)}`;
        };
        certList.appendChild(li);
    });
    // Show first cert by default
    if (certifications.length > 0) certPdf.src = `/api/cert-pdf?cert=${encodeURIComponent(certifications[0].workerParam)}`;
});
