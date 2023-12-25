// ui.js
function displayMessage(message, color) {
    const response_result = document.getElementById('response_result');
    response_result.innerHTML = message;
    response_result.style.color = color;
}

function createCard(title, description, date) {
    const colDiv = document.createElement('div');
    const cardDiv = document.createElement('div');
    const cardBodyDiv = document.createElement('div');
    const cardTitle = document.createElement('h3');
    const cardText = document.createElement('p');
    const dateText = document.createElement('p');

    colDiv.className = 'col-lg-4 col-md-6 col-12 mb-4';
    cardDiv.className = 'card h-100 d-flex flex-column';
    cardBodyDiv.className = 'card-body d-flex flex-column';
    cardTitle.className = 'card-title';
    cardText.className = 'card-text flex-grow-1';
    dateText.className = 'card-text text-muted';

    cardTitle.textContent = title;
    cardText.textContent = description;
    dateText.textContent = date;

    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardText);
    cardBodyDiv.appendChild(dateText);

    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);

    document.getElementById('notesContainer').appendChild(colDiv);
}

export { displayMessage, createCard };
