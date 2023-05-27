function zeroPadding(num: number, len: number): string {
  return ("00000" + num).slice(-len);
}

export function getdate(millisec: number): string {
  const d = new Date(millisec);
  return `${d.getFullYear()}-${zeroPadding(d.getMonth() + 1, 2)}-${zeroPadding(
    d.getDate(),
    2
  )}`;
}
