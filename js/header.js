function loadHeader() {
    console.log('Loading header...'); // Debug log
    fetch('./components/header.html')
        .then(response => response.text())
        .then(data => {
            console.log('Header content received'); // Debug log
            document.getElementById('header').innerHTML = data;
            console.log('Header content inserted'); // Debug log
            
            // Re-run the menu initialization
            const scriptContent = data.match(/<script>([\s\S]*?)<\/script>/)?.[1];
            if (scriptContent) {
                console.log('Executing menu script'); // Debug log
                eval(scriptContent);
            }
        })
        .catch(error => console.error("Error loading header:", error));
}

// Call loadHeader when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded'); // Debug log
    loadHeader();
});