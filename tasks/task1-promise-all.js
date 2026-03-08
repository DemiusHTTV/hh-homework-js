/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

// Реализация для работы не только с промисами
function promiseAll(promises) {
    if (promises.length == 0) {
        return Promise.resolve([]);
    }
    return new Promise((resolve, reject) => {
        const results = [];
        let resolved = 0;
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(
                (result) => {
                    results[index] = result;
                    resolved++;

                    if (resolved === promises.length) {
                        resolve(results);
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        });
    });
}

// Test case #1
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
promiseAll([p1, p2]).then(console.log); // [1, 2, 3]
// Test status: resolved

// Test case #2
const a1 = 'hello';
const a2 = 52;
const a3 = [1, 3, 5];
promiseAll([a1, a2, a3]).then(console.log); // ['hello', 52, Array(3)]
// Test status: resolved

// Test case #3
promiseAll([]).then(console.log); // []
// Test status: resolved

// Test case #4 - rejected
const b1 = 'false';
const b2 = Promise.reject('rejected value');
promiseAll([b1, b2])
    .then(console.log) // Не пройдет
    .catch((error) => console.log(error)); // rejected value
// Test status: rejected
