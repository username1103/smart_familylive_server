module.exports = (n = 5) => {
  const possible = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let code = '';
  for (let i = 0; i < n; i += 1) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return code;
};
