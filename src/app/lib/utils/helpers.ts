export function deslugify(slug: string) {
  // Capitalize each word, replace dashes with spaces, handle apostrophes if needed
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}