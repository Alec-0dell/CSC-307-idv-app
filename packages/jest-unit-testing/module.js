function sum(a, b) {
  return a + b;
}

function div(a, b) {
  return a / b;
}

function containsNumbers(text) {
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) >= '0' && text.charAt(i) <= '9') return true;
  }
  return false;
}

export default { sum, div, containsNumbers };
