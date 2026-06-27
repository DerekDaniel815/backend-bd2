export function serializePrisma<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === 'object' &&
      value !== null &&
      typeof value.toFixed === 'function'
        ? Number(value)
        : value,
    ),
  );
}
