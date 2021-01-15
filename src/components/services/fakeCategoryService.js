export const categories = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Freehand exercise" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "OutdoorGames" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Cardio" },
];

export function getcategories() {
  return categories.filter((c) => c);
}
