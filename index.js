document.addEventListener('dragstart', (e) => {
    e.preventDefault(); // Отключает перетаскивание
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Отключает контекстное меню
});

// Отключение выделения при долгом нажатии на мобильных устройствах
document.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Предотвращает выделение
});







const Community = document.getElementById('community');
Community.addEventListener('click', () => {
  openCommunity()
});
function openCommunity() {
    window.Telegram.WebApp.openTelegramLink("https://t.me/EmojiBetCommunity");
}

const Support = document.getElementById('support');
Support.addEventListener('click', () => {
  openSupport()
});
function openSupport() {
    window.Telegram.WebApp.openTelegramLink("https://t.me/EmojiBetSupportBot");
}




const DicePage = document.getElementById('dice-page');
const SlotPage = document.getElementById('slot-page');
const DartsPage = document.getElementById('darts-page');
const RepPage = document.getElementById('replenish-button');
const loader = document.getElementById('loader');







window.addEventListener('load', () => {
    anime({
        targets: '.loader',
        opacity: [1, 0],
        duration: 800,
        delay: 800,
        easing: 'easeInOutExpo',
        complete: () => {
          loader.classList.add('off');
        },
      });
});


RepPage.addEventListener('click', () => {
  window.location.href = 'replenishment.html';
});


DartsPage.addEventListener('click', () => {
    loader.classList.remove('off');
    anime({
        targets: '.loader',
        opacity: [0, 1],
        duration: 800,
        easing: 'easeInOutExpo',
        complete: () => {
          window.location.href = 'darts.html';
        },
      });
});

DicePage.addEventListener('click', () => {
    window.location.href = 'dice.html';
});

SlotPage.addEventListener('click', () => {
    window.location.href = 'slot.html';
});



























window.addEventListener('load', when_page_start());
function when_page_start() {
    place_coef();
    place_init_user_info(); // Вызываем функцию сразу после загрузки страницы
    // Запускаем функцию info для получения обновленных данных
    setInterval(() => {
        const tg_id = window.Telegram.WebApp.WebappInitData.user.id; // Получаем tg_id
        info(tg_id); // Передаем tg_id в функцию info
    }, 10000); // Обновляем данные каждые 10 секунд
};







function place_coef() {
    
    fetch("http://127.0.0.1:5000/get_last_game", {
        method: 'GET', // Указываем метод GET
        headers: {
            'Content-Type': 'application/json' // Указываем тип контента (необязательно для GET-запроса)
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Преобразуем ответ в JSON
    })
    .then(data => {
        updateGames(data); // Обработка полученных данных
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    });
}






function place_init_user_info() {
    // Получаем объект пользователя
    const user = window.Telegram.WebApp.WebappInitData.user;

    // Проверяем, существует ли объект пользователя
    if (!user) {
        console.error('Пользователь не найден');
        return;
    }

    // Получаем элемент для отображения фотографии
    const photoElement = document.getElementById('userPhoto'); // Замените на ID вашего элемента для фото
    if (photoElement) {
        // Подставляем новый URL фотки
        photoElement.src = user.photo_url; // Устанавливаем новый URL фотографии
    } else {
        console.error('Элемент для фото не найден');
    }

    const tg_id = user.id; // Сохраняем ID пользователя

    // Получаем элемент для отображения имени пользователя
    const usernameElement = document.getElementById('username'); // Замените на ID вашего элемента для имени пользователя
    if (usernameElement) {
        // Подставляем юзернейм
        usernameElement.innerText = user.username; // Устанавливаем имя пользователя
    } else {
        console.error('Элемент для имени пользователя не найден');
    }

    // Вызываем функцию info для отправки tg_id
    info(tg_id);
}







function info(tg_id) {
    const url = 'ваш_урл'; // Замените на ваш URL

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Указываем тип контента
        },
        body: JSON.stringify({ 'tg_id': tg_id }) // Преобразуем объект в JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Преобразуем ответ в JSON
    })
    .then(data => {
        // Предположим, что `data` содержит новое значение, которое нужно сравнить
        let newValue = data.newValue; // Замените на реальное поле из вашего ответа

        // Получаем элемент, значение которого нужно проверить и обновить
        const element = document.getElementById('yourElementId'); // Замените на ID вашего элемента

        // Проверяем текущее значение элемента
        if (element.innerText !== newValue) {
            // Если значение отличается, обновляем его
            element.innerText = newValue; // Обновляем текст элемента
        }
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    });
}




// Функция для обновления всех блоков с играми
function updateGames(last_game_list) {
    const blocks = document.querySelectorAll('.last-game');
    blocks.forEach((block, index) => {
        const gameData = last_game_list[`${index + 1}game`];
        const { Profit, user, data, game } = gameData;

        // Подстановка информации в game-info
        const gameInfo = block.querySelector('.game-info');
        gameInfo.textContent = `@${user} в ${data}`;

        // Подстановка информации в game-profit
        const gameProfit = block.querySelector('.game-profit');
        gameProfit.innerHTML = `<span style="color: #a1a1a1;">+ </span>${Profit}`;

        // Определение изображения в зависимости от игры и прибыли
        const imagePath = (game) => {
            if (game === 'dice') {
                return Profit >= 3.7 ? 'assets/dice-sup-plate.svg' : 'assets/dice-def-plate.svg';
            } else if (game === 'darts') {
                return Profit >= 3.7 ? 'assets/darts-sup-plate.svg' : 'assets/darts-def-plate.svg';
            } else if (game === 'slot') {
                return Profit >= 3.7 ? 'assets/slot-sup-plate.svg' : 'assets/slot-def-plate.svg';
            }
            return ''; // Возвращаем пустую строку, если игра не распознана
        };

        const gamePlate = document.createElement('img');
        gamePlate.src = imagePath(game);
        gamePlate.alt = "Game Plate";
        gamePlate.classList.add('game-plate');
        block.appendChild(gamePlate);

        // Установка цвета текста в game-info
        const textColor = Profit >= 3.7 ? '#f0f0f0' : '#a1a1a1';
        gameInfo.style.color = textColor;
    });
}












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
*/
