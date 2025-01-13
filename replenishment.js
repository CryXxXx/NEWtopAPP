





  
    










/*
function openWinthdraw(){
    const tg_id = window.Telegram.WebApp.WebappInitData.user.id

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
    window.Telegram.WebApp.openTelegramLink(data.check_url);
    })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
}


*/

const RepPage = document.getElementById('back-lobby-button');
RepPage.addEventListener('click', () => {
    window.location.href = 'index.html';
});



const DepBut = document.getElementById('deposit');
DepBut.addEventListener('click', () => {
    openDeposit()
});

function openDeposit() {
    window.Telegram.WebApp.openTelegramLink("http://t.me/send?start=IVTGIPBCeUDC");
}





// Функция для анимации элементов с помощью Anime.js
const showElements = () => {
    anime({
        targets: ['.replenish-cont', '.withdraw-cont'],
        translateY: ['24.6vw', '0'],
        opacity: [0, 1], // Изменение прозрачности
        duration: 400, // Длительность анимации
        easing: 'easeOutExpo', // Тип easing
    });
    vibrateDevice(200)
};

// Запускаем анимацию после загрузки страницы
window.onload = showElements;


function vibrateDevice(duration) {
        if ("vibrate" in navigator) {
            navigator.vibrate(duration);
        } else {
            console.log("Вибрация не поддерживается на этом устройстве.");
        }
} 
  
