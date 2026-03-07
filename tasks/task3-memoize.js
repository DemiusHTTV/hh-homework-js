/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
  const memoMap = new Map();
  function memoizedFunc(...args) {
    const stringArguments = JSON.stringify(args);
    if (memoMap.has(stringArguments)) {
      return memoMap.get(stringArguments);
    }
    const result = fn.apply(this, args);
    memoMap.set(stringArguments, result);
    return result;
  }
  return memoizedFunc;
}

const slowAdd = (a, b) => {
  return a + b;
};

const obj = {
  value: 10,
  add(a) {
    return this.value + a;
  }
};

const memoAdd = memoize(slowAdd);
obj.memoAdd = memoize(obj.add);

console.log(obj.memoAdd(5)); // возвращает 15
console.log(memoAdd(1, 2)); // возвращает 3

memoAdd(1, 2); // из кэша, возвращает 3
