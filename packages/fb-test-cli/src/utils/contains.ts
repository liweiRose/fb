// 枚举类型的值
export function enumContains<T extends object, V = unknown>(enums: T, val: V) {
  return Object.values(enums).includes(val);
}
