document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("searchBtn").addEventListener("click", function() {
        const searchTerm = document.getElementById("searchBar").value.toLowerCase();
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";

        fetch("travel_recommendation_api.json")
            .then(response => response.json())
            .then(data => {
                let matches = [];

                if (searchTerm.includes("beach")) {
                    matches.push(...data.beaches);
                } else if (searchTerm.includes("temple")) {
                    matches.push(...data.temples);
                } else if (searchTerm.includes("country")) {
                    data.countries.forEach(country => matches.push(...country.cities));
                }

                if (matches.length === 0) {
                    resultsDiv.innerHTML = "<p>No results found.</p>";
                } else {
                    matches.forEach(place => {
                        resultsDiv.innerHTML += `
                            <div style="background-color: rgba(255,255,255,0.8); padding: 15px; border-radius: 8px;">
                                <img src="${place.imageUrl}" style="width: 100%;">
                                <h3>${place.name}</h3>
                                <p>${place.description}</p>
                            </div>
                        `;
                    });
                }
            });
    });
    document.getElementById("resetBtn").addEventListener("click", function() {
        document.getElementById("results").innerHTML = "";
        document.getElementById("searchBar").value = "";
    });
});