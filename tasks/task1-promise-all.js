/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function isPromise(promise) {
  return typeof promise === "object" && typeof promise.then === "function";
}

function promiseAll(promises) {
  if (typeof promises !== "object" || !(Symbol.iterator in promises)) {
    throw new TypeError(`${promises} is not iterable`);
  }

  return new Promise((resolve, reject) => {
    if (promises.length === 0) return resolve([]);
    const resultArray = [];
    let counter = 0;
    for (const item of promises) {
      (isPromise(item) ? item : Promise.resolve(item))
        .then((result) => {
          resultArray[counter] = result;
          counter++;
          if (counter === [...promises].length) {
            resolve(resultArray);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log); // [1, 2]
Promise.all([p1, p2]).then(console.log); // [1, 2]