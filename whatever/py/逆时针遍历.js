let m = 5;
let n = 5;
let incre = Math.floor(m / 2);
let row = [];
let r = [];
for (let j = 0; j < m; j++) {
  row = [];
  for (let i = 1 + j * n; i <= (j + 1) * n; i++) {
    row.push(i);
  }
  r.push(row);
}
let re = [];
for (let j = 0; j < incre; j++) {
  for (let i = 0; i < m; i++) {
    if (i !== j) {
      re.push(r[i][j]);
    }
  }
  for (let i = 0; i < n; i++) {
    if (i !== r.length - 1 - j) {
      re.push(r[m - 1 - j][i]);
    }
  }
  for (let i = m - 1; i >= 0; i--) {
    if (i !== n - 1 - j) {
      re.push(r[i][n - 1 - j]);
    }
  }
  for (let i = n - 1; i >= 0; i--) {
    if (i !== j) {
      re.push(r[j][i]);
    }
  }
}
console.log(...new Set(re));
