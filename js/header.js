function loadHeader() {
    fetch('./components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error("Error loading header:", error));
}