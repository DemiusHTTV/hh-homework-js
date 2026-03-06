/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return resolve([]);
    const promisesArray = [];
    let counter = 0;
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise
        .then((result) => {
          promisesArray[i] = result;
          counter++;
          if (counter === promises.length) {
            resolve(promisesArray);
          }
        })
        .catch((error) => {
          reject(error);
        })
    }
  });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log); // [1, 2]