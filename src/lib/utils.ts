// # Helper functions (Capitalize names, format IDs)

// Helper: Get ID from URL (e.g., "https://pokeapi.co/api/v2/pokemon/1/" -> "1")
export function getIdFromUrl(url: string): string {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

// Helper: Capitalize first letter (aesthetic)
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
