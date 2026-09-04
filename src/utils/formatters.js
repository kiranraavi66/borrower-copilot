/**
 * Format a number as Indian Rupee (INR) currency string e.g. 50000 -> "₹ 50,000"
 */
export function formatINR(val) {
  if (val === undefined || val === null || val === '') return '';
  const num = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.]/g, '')) : val;
  if (isNaN(num)) return '';
  
  return '₹ ' + num.toLocaleString('en-IN');
}

/**
 * Clean user string input to extract pure integer/number
 */
export function parseCleanNumber(val) {
  if (typeof val === 'number') return val;
  if (!val) return '';
  const cleaned = String(val).replace(/[^0-9]/g, '');
  return cleaned ? parseInt(cleaned, 10) : '';
}

/**
 * Format credit score display
 */
export function formatCreditScore(val) {
  if (val === 'UNKNOWN' || !val) {
    return 'Unknown (Not Specified)';
  }
  return String(val);
}
