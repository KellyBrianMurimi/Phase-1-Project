// fetching data
fetch("https://javascript-6npe.onrender.com/watches", {
    method: "GET"
})
.then((response) => response.json())
.then((data) => {
    console.log(data);
    const all_watches = document.getElementById("all_watches");
    all_watches.innerHTML = ''; // Clear the container before adding new content
    for (const element of data) {
        all_watches.innerHTML += `<div id="card">
            <img onclick="displaySingleWatch(${element.id})" src="${element.image}" alt="${element.name}">
            <h6>${element.name}</h6>
            <button onclick="deleteWatch(${element.id})" id="deleteBtn">Delete</button>
            <button onclick="edit(${element.id})">Edit</button>
        </div>`;
    }
});

// function for displaying singleWatch
function displaySingleWatch(id) {
    console.log(id);
    fetch(`https://javascript-6npe.onrender.com/watches/${id}`, {
        method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
        const single_watch = document.getElementById("single_watch");
        single_watch.innerHTML = `<div>
            <img src="${data.image}" alt="${data.name}">
            <h6>${data.name}</h6>
            <p>${data.description}</p>
        </div>`;
    });
}

// Function for deleting watches
function deleteWatch(id) {
    fetch(`https://javascript-6npe.onrender.com/watches/${id}`, {
        method: "DELETE"
    })
    .then((response) => response.json())
    .then((data) => {
        alert("Watch deleted");
    });
}

// Adding a watch
const addForm = document.getElementById("addform");
addForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const image_url = document.getElementById("image_url").value;
    console.log(name, description, image_url);

    fetch('https://javascript-6npe.onrender.com/watches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            description: description,
            image: image_url,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        alert("Watch created");
    });
});

// Edit function
function edit(id) {
    // Fetch the data for the specific watch by its ID
    fetch(`https://javascript-6npe.onrender.com/watches/${id}`)
    .then((response) => response.json())
    .then((res) => {
        console.log(res);
        const updateContainer = document.getElementById("updateContainer");
        updateContainer.innerHTML = `
            <h6>Update Form</h6>
            <div>
                <input type="text" id="update_name" value="${res.name}" placeholder="Enter name">
                <input type="text" id="update_description" value="${res.description}" placeholder="Enter description">
                <input type="text" id="update_image_url" value="${res.image}" placeholder="Enter image url">
                <button onclick="update(${id})" type="button">Update</button>
            </div>`;
    });
}

// Function for updating
function update(id) {
    const update_name = document.getElementById("update_name").value;
    const update_description = document.getElementById("update_description").value;
    const update_image_url = document.getElementById("update_image_url").value;

    // Send an HTTP request to update the watch data
    fetch(`https://javascript-6npe.onrender.com/watches/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: update_name,
            description: update_description,
            image: update_image_url
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        alert("Watch updated");
    });
}
