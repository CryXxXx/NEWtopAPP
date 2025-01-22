




const Combs = document.getElementById('combinations');
Combs.addEventListener('click', () => {
  openDeposit()
});

function openDeposit() {
    window.Telegram.WebApp.openTelegramLink("https://t.me/EmojiBetSlotMachine");
}





const movingCircle = document.getElementById('movingCircle');
const filled = document.getElementById('filled');
const sliderContainer = document.querySelector('.slider-container');
const betNumberElement = document.querySelector('.bet-number'); // Элемент для вывода текущего значения
const betPlusCont = document.querySelector('.bet-plus-cont'); // Элемент для кнопки "плюс"

let currentValueIndex = 0;
let isDragging = false;
const totalMovementWidth = 81.5; // Общая длина передвижения кружка в vw
const increment = totalMovementWidth / 6; // Увеличение на одну шестую часть от 81.5vw

// Массив значений, соответствующих индексам
const values = ["0,25", "0,50", "1,00", "1,50", "2,00", "2,50", "3,00"];

function updateSlider() {
    const leftPosition = (currentValueIndex / 6) * totalMovementWidth; // Используем 81.5vw вместо ширины контейнера

    movingCircle.style.left = `${leftPosition}vw`; // Устанавливаем позицию кружка
    filled.style.width = `${(1.5 + currentValueIndex * increment)}vw`; // Обновляем ширину заполненной области
    betNumberElement.textContent = values[currentValueIndex]; // Обновляем текст в элементе bet-number
}

function getCurrentValueIndex(mouseX) {
    const totalWidth = sliderContainer.offsetWidth;
    const newIndex = Math.round((mouseX / totalWidth) * 6); // Изменено на 6
    return Math.max(0, Math.min(newIndex, 6)); // Изменено на 6
}

// Обработчики событий для мыши
movingCircle.addEventListener('mousedown', (event) => {
    isDragging = true;
    document.body.style.cursor = 'grabbing';
    movingCircle.classList.add('dragging'); // Добавляем класс для активации псевдоэлемента
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const rect = sliderContainer.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        currentValueIndex = getCurrentValueIndex(mouseX);
        updateSlider();
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
    movingCircle.classList.remove('dragging'); // Убираем класс при отпускании
});

// Обработчики событий для сенсорных устройств
movingCircle.addEventListener('touchstart', (event) => {
    isDragging = true;
    document.body.style.cursor = 'grabbing';
    movingCircle.classList.add('dragging'); // Добавляем класс при удерживании
});

document.addEventListener('touchmove', (event) => {
    if (isDragging) {
        const rect = sliderContainer.getBoundingClientRect();
        const touchX = event.touches[0].clientX - rect.left; // Используем координаты первого касания
        currentValueIndex = getCurrentValueIndex(touchX);
        updateSlider();
    }
});

document.addEventListener('touchend', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
    movingCircle.classList.remove('dragging'); // Убираем класс при отпускании
});

// Обработчик события для кнопки "плюс"
betPlusCont.addEventListener('click', () => {
    if (currentValueIndex < values.length - 1) { // Если текущее значение меньше максимального
        currentValueIndex++; // Увеличиваем индекс
        updateSlider(); // Обновляем положение круга и текст
    }
});

// Инициализация состояния
updateSlider();





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

///////////////////////////////////////////////////////////////////////////////////////

const RepPage = document.getElementById('back-lobby-button');
RepPage.addEventListener('click', () => {
    window.location.href = 'index.html';
});