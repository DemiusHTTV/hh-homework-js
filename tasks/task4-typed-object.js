/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
  const handler = {
    set(target, prop, value) {
      const valueType = schema[prop];
      const receivedType = typeof value;
      if (valueType !== receivedType) {
        throw new Error(
          `Type '${receivedType}' is not assignable to type '${valueType}'`,
        );
      }

      target[prop] = value;
    },
  };
  return new Proxy({}, handler);
}

const user = typedObject({
  name: "string",
  age: "number",
});

user.name = "Ivan"; // выполнится
user.age = 20; // выполнится
user.age = "20";    // должно выбросить ошибку

console.log(user);
