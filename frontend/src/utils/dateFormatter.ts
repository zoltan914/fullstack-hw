export const formatTimestamp = (timestamp: Date | string | number): string => {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleString('hu-HU');
};