/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
  const memoMap = new Map();
  function memoizedFunc() {
    const stringArguments = JSON.stringify(arguments);
    if (memoMap.has(stringArguments)) {
      return memoMap.get(stringArguments);
    }
    const result = fn(...arguments);
    memoMap.set(stringArguments, result);
    return result;
  }
  return memoizedFunc;
}

const slowAdd = (a, b) => {
  return a + b;
};

const memoAdd = memoize(slowAdd);
memoAdd(1, 2); // возвращает 3
memoAdd(1, 2); // из кэша, возвращает 3
