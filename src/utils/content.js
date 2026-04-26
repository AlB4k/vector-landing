/**
 * Interpolates template variables in a string using values from the content object.
 * Example: "Welcome to {content.companyName}" -> "Welcome to ООО VECTOR"
 */
export const interpolate = (text, content) => {
  if (!text || typeof text !== 'string') return text;

  return text
    .replace(/\{content\.companyName\}/g, content.companyName || '')
    .replace(/\{content\.logoText\}/g, content.logoText || '')
    .replace(/\{content\.domain\}/g, content.domain || '')
    .replace(/\{content\.address\}/g, content.address || '')
    .replace(/\{content\.email\}/g, content.email || '')
    .replace(/\{content\.phone\}/g, content.phone || '')
    .replace(/\{content\.inn\}/g, content.inn || '')
    .replace(/\{content\.kpp\}/g, content.kpp || '')
    .replace(/\{content\.ogrn\}/g, content.ogrn || '')
    .replace(/\{content\.ceo\}/g, content.ceo || '')
    .replace(/\{content\.pdnReg\}/g, content.pdnReg || '')
    .replace(/\{content\.pdnOrder\}/g, content.pdnOrder || '')
    // Legacy support for older content exports that might have literal names
    .replace(/ООО «ВЕКТОР»/g, content.companyName || 'ООО VECTOR')
    .replace(/ООО "ВЕКТОР"/g, content.companyName || 'ООО VECTOR');
};
