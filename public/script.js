document.addEventListener('DOMContentLoaded', function() {
    const cheeseListContainer = document.getElementById('cheese-list');

    fetch('/api/cheeses')
    .then(response => response.json())
    .then(cheeses => {
        if (cheeses.length === 0) {
            cheeseListContainer.innerHTML = '<p class="text-center">Сыры не найдены.</p>';
            return;
        }

        cheeses.forEach(cheese => {
            const cheeseCard = `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <img src="${cheese.imageUrl}" class="card-img-top" alt="${cheese.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${cheese.name}</h5>
                        <p class="card-text">${cheese.category}</p>
                        <p class="card-text">${cheese.description}</p>
                        <p class="card-text">${cheese.price}</p>
                    </div>
                </div>
            </div>
            `;
            cheeseListContainer.innerHTML += cheeseCard;
    });
})
    .catch(error => {
        console.error('Ошибка при загрузке каталога сыров:', error);
        cheeseListContainer.innerHTML = '<p class="text-center text-danger">Не удалось загрузить каталог.</p>';
    });
});