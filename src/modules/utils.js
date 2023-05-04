function zeroPadding(num, len){
  return ('00000' + num).slice(-len);
}

export function getdate(millisec){
  const date = new Date(millisec);
  return date.getFullYear() + "-" + zeroPadding(Number(date.getMonth()) + 1, 2) + "-" + zeroPadding(date.getDate(), 2);
}
