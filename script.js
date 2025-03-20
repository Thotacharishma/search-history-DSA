document.addEventListener("DOMContentLoaded", loadHistory);

function performSearch() {
    const searchInput = document.getElementById("searchInput").value.trim();
    if (searchInput === "") return;

    addToHistory(searchInput);
    document.getElementById("searchInput").value = ""; // Clear input
}

function addToHistory(searchTerm) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (!history.includes(searchTerm)) {
        history.unshift(searchTerm); // Add to the start of the list
        localStorage.setItem("searchHistory", JSON.stringify(history));
    }

    loadHistory();
}

function loadHistory() {
    const historyList = document.getElementById("searchHistory");
    historyList.innerHTML = ""; // Clear previous history

    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    history.forEach(term => {
        let listItem = document.createElement("li");
        listItem.textContent = term;
        listItem.onclick = () => document.getElementById("searchInput").value = term;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = (event) => {
            event.stopPropagation();
            removeFromHistory(term);
        };

        listItem.appendChild(deleteBtn);
        historyList.appendChild(listItem);
    });
}

function removeFromHistory(term) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    history = history.filter(item => item !== term);
    localStorage.setItem("searchHistory", JSON.stringify(history));
    loadHistory();
}