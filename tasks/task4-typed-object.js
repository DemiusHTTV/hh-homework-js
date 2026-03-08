/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

// Простая реализация с возможностью добавления новых свойств
function typedObject(schema) {
    // TODO: реализуйте
    return new Proxy(
        {},
        {
            set(target, prop, value) {
                if (typeof value !== schema[prop]) {
                    throw new Error(`Тип свойства ${prop} должен быть ${schema[prop]}, дан ${typeof value}`);
                }
                return Reflect.set(target, prop, value);
            },
        }
    );
}

// Test case #1
const user = typedObject({
    name: 'string',
    age: 'number',
});

user.name = 'Ivan'; // выполнится
user.age = 20; // выполнится
user.age = '20'; // должно выбросить ошибку
user.favColor = 'green'; // установка нового значения
user.favColor = 'red'; // Интересный момент, разберем ниже

// При попытке заново установить значение цвета, получаем ошибку ниже
// Тип свойства favColor должен быть undefined, дан string
// Похоже, это из-за того, что изначально такого свойства в объекте не было
// В связи с этим, запретим создание новых свойств, чтобы избежать таких ситуаций

// Реализация без возможности установления новых свойств
function modifiedTypedObject(schema) {
    // TODO: реализуйте
    return new Proxy(
        {},
        {
            set(target, prop, value) {
                if (!(prop in schema)) {
                    throw new Error(`Свойство ${prop} не задано в объекте`);
                }

                if (typeof value !== schema[prop]) {
                    throw new Error(`Тип свойства ${prop} должен быть ${schema[prop]}, дан ${typeof value}`);
                }
                return Reflect.set(target, prop, value);
            },
        }
    );
}

// Test case #1
const newUser = modifiedTypedObject({
    name: 'string',
    age: 'number',
});

newUser.name = 'Ivan'; // выполнится
newUser.age = 20; // выполнится
newUser.age = '20'; // должно выбросить ошибку
newUser.favColor = 'green'; // значение не установится новому свойству
