/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }
    const results = [];
    let resolvedCount = 0;
    promises.forEach(((promise, index)=>{
      Promise.resolve(promise)
        .then(result => {
          results[index] = result;
          resolvedCount++;
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    }))
  });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log); // [1, 2]