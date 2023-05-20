function zeroPadding(num: number, len: number){
  return ('00000' + num).slice(-len);
}

export function getdate(millisec: number){
  const d = new Date(millisec);
  return d.getFullYear() + "-" + zeroPadding(d.getMonth() + 1, 2) + "-" + zeroPadding(d.getDate(), 2);
}
