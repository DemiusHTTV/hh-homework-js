/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
  // TODO: реализуйте
}

const slowAdd = (a, b) => {
  return a + b;
};

const memoAdd = memoize(slowAdd);
memoAdd(1, 2); // возвращает 3
memoAdd(1, 2); // из кэша, возвращает 3