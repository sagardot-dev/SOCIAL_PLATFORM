export function randomName() {
  const names = [
    "Luna", "Milo", "Zara", "Nova", "Ezra", "Aria", "Enzo",
    "Sage", "Atlas", "Mira", "Orion", "Zia"
  ];

  return names[Math.floor(Math.random() * names.length)];
}
