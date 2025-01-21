


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







const RepPage = document.getElementById('back-lobby-button');
RepPage.addEventListener('click', () => {
    window.location.href = 'index.html';
});




const movingCircle = document.getElementById('movingCircle');
const filled = document.getElementById('filled');
const sliderContainer = document.querySelector('.slider-container');

let currentValueIndex = 0;
let isDragging = false;
const totalMovementWidth = 81.5; // Общая длина передвижения кружка в vw
const increment = totalMovementWidth / 6; // Увеличение на одну шестую часть от 81.5vw

function updateSlider() {
    const leftPosition = (currentValueIndex / 6) * totalMovementWidth; // Используем 81.5vw вместо ширины контейнера

    movingCircle.style.left = `${leftPosition}vw`; // Устанавливаем позицию кружка
    filled.style.width = `${(1.5 + currentValueIndex * increment)}vw`; // Обновляем ширину заполненной области
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
});

// Обработчики событий для сенсорных устройств
movingCircle.addEventListener('touchstart', (event) => {
    isDragging = true;
    document.body.style.cursor = 'grabbing';
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
});

// Инициализация состояния
updateSlider();












































let activeOption = null;
let allDef = true; // Флаг, чтобы отслеживать состояние всех опций

function changeImage(selectedOption) {
    const defImage = selectedOption.querySelector('.def');
    const supImage = selectedOption.querySelector('.sup');

    // Если есть активный блок, и это не тот же самый блок
    if (activeOption && activeOption !== selectedOption) {
        const activeDefImage = activeOption.querySelector('.def');
        const activeSupImage = activeOption.querySelector('.sup');

        // Возвращаем активный блок к состоянию def
        activeDefImage.style.opacity = '1';
        activeSupImage.style.opacity = '0';
    }

    // Анимация для выбранного блока
    if (supImage.style.opacity === '0') {
        defImage.style.opacity = '0';
        supImage.style.opacity = '1';
        activeOption = selectedOption; // Устанавливаем активный блок
        allDef = false; // Устанавливаем флаг, что не все опции в состоянии def
    } else {
        // Если уже активен, возвращаем его обратно
        defImage.style.opacity = '1';
        supImage.style.opacity = '0';
        activeOption = null; // Сбрасываем активный блок
        allDef = true; // Устанавливаем флаг, что все опции теперь в состоянии def
    }

    // Управление состоянием bet-button
    toggleBetButton();
}

function toggleBetButton() {
    const betButtonDef = document.querySelector('.bet-button .def');
    const betButtonSup = document.querySelector('.bet-button .sup');

    if (allDef) {
        betButtonDef.style.opacity = '1';
        betButtonSup.style.opacity = '0';
    } else {
        betButtonDef.style.opacity = '0';
        betButtonSup.style.opacity = '1';
    }
}













