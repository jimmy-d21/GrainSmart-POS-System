function randomDigits() {
  return Math.floor(Math.random() * 9000) + 1000;
}

const generateTransactionId = () => {
  return `TXN-${randomDigits()}-${randomDigits()}`;
};

export default generateTransactionId;
