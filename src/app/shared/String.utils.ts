export function formatProfileName(name?: string) {
  if (!name) return;

  return name.split(' ')[0];
}
