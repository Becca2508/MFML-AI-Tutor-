export function browserStorage(): Storage | null {
  try { return typeof window === 'undefined' ? null : window.localStorage; }
  catch { return null; }
}

export function readStored(key: string, storage: Storage | null): unknown {
  try { return storage ? JSON.parse(storage.getItem(key) || 'null') : null; }
  catch { return null; }
}

export function writeStored(key: string, value: unknown, storage: Storage | null): boolean {
  try {
    if (!storage) return false;
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch { return false; }
}

export function stringIds(value: unknown): string[] {
  return Array.isArray(value) ? [...new Set(value.filter((item): item is string => typeof item === 'string'))] : [];
}

export function booleanMap(value: unknown): Record<string, boolean> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([, flag]) => typeof flag === 'boolean'));
}

export function addUnique(values: string[], id: string): string[] {
  return values.includes(id) ? values : [...values, id];
}