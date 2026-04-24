function randomDigits() {
  return Math.floor(Math.random() * 9000) + 1000;
}

const generateStaffId = () => {
  return `STF-${randomDigits()}-${randomDigits()}`;
};

export default generateStaffId;
