export const generateSKU = (name: string): string => {
  const randomString = Math.random().toString(36).substring(2, 8);
  const sanitizedProductName = name.replace(/\s+/g, "-").toLowerCase();
  return `${sanitizedProductName}-${randomString}`;
};
