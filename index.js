const RepPage = document.getElementById('replenish-button');
RepPage.addEventListener('click', () => {
  window.location.href = 'replenishment.html';
});












/*




// Пример массива с данными о последних играх
let last_game_list = {
    "1game": {"Profit": 4.0, "user": 'username1', "data": '00:00', "game": 'darts'},
    "2game": {"Profit": 2.5, "user": 'username2', "data": '00:05', "game": 'dice'},
    "3game": {"Profit": 3.8, "user": 'username3', "data": '00:10', "game": 'slot'},
    "4game": {"Profit": 1.2, "user": 'username4', "data": '00:15', "game": 'darts'},
    "5game": {"Profit": 3.0, "user": 'username5', "data": '00:20', "game": 'dice'}
};

// Константы для высоты блока и общего смещения
const BLOCK_HEIGHT_VW = 8.33; // Высота блока в vw
const OFFSET_ADDITIONAL_VW = 2.083; // Дополнительное смещение в vw
const TOTAL_OFFSET_VW = BLOCK_HEIGHT_VW + OFFSET_ADDITIONAL_VW; // Общее смещение в vw




// Функция для обновления блока с игрой
function updateGameBlock(gameData, block) {
    const { Profit, user, data, game } = gameData;

    // Подстановка информации в game-info
    const gameInfo = block.querySelector('.game-info');
    gameInfo.textContent = `@${user} в ${data}`;

    // Подстановка информации в game-profit
    const gameProfit = block.querySelector('.game-profit');
    gameProfit.innerHTML = `<span style="color: #a1a1a1;">+ </span>${Profit}`; // Добавляем символ «+» с нужным цветом

    // Определение изображения в зависимости от игры и прибыли
    const imagePath = getImagePath(game, Profit);
    const gamePlate = document.createElement('img'); // Создаем элемент img
    gamePlate.src = imagePath; // Устанавливаем путь к изображению
    gamePlate.alt = "Game Plate"; // Устанавливаем альтернативный текст
    gamePlate.classList.add('game-plate'); // Добавляем класс game-plate
    block.appendChild(gamePlate); // Добавляем изображение в блок

    // Установка цвета текста в game-info
    const textColor = Profit >= 3.7 ? '#f0f0f0' : '#a1a1a1';
    gameInfo.style.color = textColor; // Изменение цвета текста
}

// Функция для получения пути к изображению в зависимости от игры и прибыли
function getImagePath(game, Profit) {
    if (game === 'dice') {
        return Profit >= 3.7 ? 'assets/dice-sup-plate.svg' : 'assets/dice-def-plate.svg';
    } else if (game === 'darts') {
        return Profit >= 3.7 ? 'assets/darts-sup-plate.svg' : 'assets/darts-def-plate.svg';
    } else if (game === 'slot') {
        return Profit >= 3.7 ? 'assets/slot-sup-plate.svg' : 'assets/slot-def-plate.svg';
    }
    return ''; // Возвращаем пустую строку, если игра не распознана
}




// Функция для обновления всех блоков с играми
function updateGames() {
    const blocks = document.querySelectorAll('.last-game');
    for (let i = 0; i < blocks.length; i++) {
        updateGameBlock(last_game_list[`${i + 1}game`], blocks[i]);
    }
}

// Функция для анимации смещения блоков вниз
function animateBlocksDown(n) {
    const blocks = document.querySelectorAll('.last-game');
    const blockHeight = TOTAL_OFFSET_VW * (window.innerWidth / 100); // Общее смещение в пикселях
    const translateY = n * blockHeight; // Расчет общего смещения

    // Применение анимации к каждому блоку
    blocks.forEach(block => {
        block.style.transform = `translateY(${translateY}px)`;
    });
}

// Функция для получения новых данных с сервера
function fetchNewData() {
    // Здесь должен быть код для запроса данных с сервера
    // Например, мы просто будем обновлять last_game_list случайными значениями для демонстрации

    // Имитация получения новых данных
    const newGameData = {
        "1game": {"Profit": Math.random() * 5, "user": 'username6', "data": '00:25', "game": 'darts'},
        "2game": {"Profit": Math.random() * 5, "user": 'username7', "data": '00:30', "game": 'dice'},
        "3game": {"Profit": Math.random() * 5, "user": 'username8', "data": '00:35', "game": 'slot'},
        "4game": {"Profit": Math.random() * 5, "user": 'username9', "data": '00:40', "game": 'darts'},
        "5game": {"Profit": Math.random() * 5, "user": 'username10', "data": '00:45', "game": 'dice'}
    };

    // Проверка на количество новых игр
    const newGamesCount = Object.keys(newGameData).length;
    if (newGamesCount > 0) {
        // Сохранение старых данных
        const oldGameData = last_game_list;

        // Обновление last_game_list новыми данными
        last_game_list = newGameData;

        // Анимация смещения блоков
        animateBlocksDown(newGamesCount);

        // Обновление блоков с новыми данными
        updateGames();

        // Удаление старых блоков (последние n)
        const gameContainer = document.querySelector('.last-games-cont');
        for (let i = 0; i < newGamesCount; i++) {
            gameContainer.removeChild(gameContainer.lastChild); // Удаляем последний блок
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateGames(); // Инициализация обновления при загрузке страницы
});

// Пример запроса обновления каждые 10 секунд
setInterval(() => {
    fetchNewData(); // Получение новых данных и обновление интерфейса
}, 10000);


*/