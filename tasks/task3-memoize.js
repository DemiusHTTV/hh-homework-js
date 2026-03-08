/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

// Простое замыкание с логированием при повторном выражении
function memoize(fn) {
    // TODO: реализуйте
    let cache = {};

    return (...args) => {
        const key = JSON.stringify(args);
        if (key in cache) {
            console.log("I've already seen this one");
            return cache[key];
        }
        let result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const slowAdd = (a, b) => {
    return a + b;
};

// Test case #1
const memoAddNumbers = memoize(slowAdd);
memoAddNumbers(1, 2); // возвращает 3
memoAddNumbers(1, 2); // из кэша, выводит сообщение о найденном выражении и возвращает 3

// Test case #2
const memoAddStrings = memoize(slowAdd);
memoAddStrings('Hello', 'world'); // возвращает Helloworld
memoAddStrings('Hello', 'world'); // из кэша, выводит сообщение о найденном выражении и возвращает Helloworld

// Добавим возможность сортировки аргументов, если порядок не важен.
// Добавим возможность учитывать регистронезависимость
// посредством добавления опционального аргумента caseInsensitivity функции
// В целом, оптимизируем немного нашу функцию:
//     - Добавим возможность выбора регистронезависимости
//     - Сделаем сортировку
function improvedMemoize(fn, sort = false, caseInsensitivity = false) {
    let cache = {};

    return (...args) => {
        // Регистронезависимость
        const normalized = args.map((arg) => (caseInsensitivity && typeof arg === 'string' ? arg.toLowerCase() : arg));

        // Сортировка
        if (sort) {
            normalized.sort();
        }

        const key = JSON.stringify(normalized);
        if (key in cache) {
            console.log("I've already seen this one");
            return cache[key];
        }
        let result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// Test case #1
const improvedMemoAddNumbers = improvedMemoize(slowAdd, true);
improvedMemoAddNumbers(1, 2); // возвращает 3
improvedMemoAddNumbers(1, 2); // из кэша, выводит сообщение о найденном выражении и возвращает 3
improvedMemoAddNumbers(2, 1); // из кэша благодаря сортировке, возвращает 3

// Test case #2
const improvedMemoAddCaseStrings = improvedMemoize(slowAdd, false, true);
improvedMemoAddCaseStrings('Hello', 'world'); // возвращает Helloworld
improvedMemoAddCaseStrings('Hello', 'world'); // из кэша, выводит сообщение о найденном выражении и возвращает Helloworld
improvedMemoAddCaseStrings('hello', 'World'); // из кэша, выводит сообщение о найденном выражении и возвращает Helloworld
