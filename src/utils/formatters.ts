export const highlightText = (text: string, searchTerm: string): string => {
  if (!searchTerm) return text;

  const safeSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${safeSearchTerm})`, 'gi');

  return text.replace(regex, '<span class="highlight">$1</span>');
};

export const formatDate = (timestamp: number | string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};