/*
Задание 2: Реализуйте delay

Требования:
- delay(ms) возвращает промис
- Промис резолвится через ms миллисекунд
*/

// Простая реализация с проверкой ms
function delay(ms) {
    // TODO: реализуйте
    if (typeof ms !== 'number') {
        return Promise.reject('Invalid ms type');
    }

    if (ms < 0) {
        return Promise.reject('Invalid ms value');
    }

    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// Test case #1
delay(500)
    .then(() => console.log('Готово через 500мс'))
    .catch(() => console.log('Не готово :('));
// Test status: success

// Test case #2
delay(-200)
    .then(() => console.log('Готово через -200мс'))
    .catch(() => console.log('Ошибка переданного значения'));
// Test status: given value error

// Test case #3
delay('400')
    .then(() => console.log('Готово через 400мс'))
    .catch(() => console.log('Ошибка переданного типа'));
// Test status: given type error
