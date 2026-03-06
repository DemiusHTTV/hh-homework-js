/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
  try {
    const handler = {
      set(_, prop, value) {
        const valueType = schema[prop];
        const recievedType = typeof value;
        if (valueType !== recievedType) {
          throw new Error(
            `Type '${recievedType}' is not assignable to type '${valueType}'`,
          );
        }
      },
    };
    return new Proxy({}, handler);
  } catch (error) {
    console.error(error);
  }
}

const user = typedObject({
  name: "string",
  age: "number",
});

user.name = "Ivan"; // выполнится
user.age = 20;      // выполнится
user.age = "20";    // должно выбросить ошибку