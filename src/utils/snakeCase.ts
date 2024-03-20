const snakeCase = (str: string): string => {
  return str
    // Remove standard and curly apostrophes
    .replace(/[’']/g, "")
    // Replace colons and spaces with underscores
    .replace(/[: ]+/g, "_")
    // Insert an underscore before all uppercase letters and convert to lowercase
    .replace(/([A-Z])/g, (match, offset) => offset > 0 ? `_${match}` : match)
    .toLowerCase();
};

export default snakeCase;
