/**
 * Interpolates template variables in a string using values from the content object.
 * Example: "Welcome to {content.companyName}" -> "Welcome to ООО VECTOR"
 */
export const interpolate = (text, content) => {
  if (!text || typeof text !== 'string') return text;

  // 1. Dynamic path interpolation: {content.path.to.key}
  let interpolated = text.replace(/\{content\.(.*?)\}/g, (match, path) => {
    const keys = path.split('.');
    let value = content;
    for (const key of keys) {
      if (value === undefined || value === null) break;
      value = value[key];
    }
    return (value !== undefined && value !== null) ? String(value) : match;
  });

  // 2. Legacy support for older content exports that might have literal names
  return interpolated
    .replace(/ООО «ВЕКТОР»/g, content.companyName || 'ООО VECTOR')
    .replace(/ООО "ВЕКТОР"/g, content.companyName || 'ООО VECTOR');
};
