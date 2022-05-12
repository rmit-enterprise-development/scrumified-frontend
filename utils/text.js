const textUtils = {
  truncate: (text) => {
    return `${text.slice(0, 15)} ...`;
  },

  getFirstLetters(str) {
    const firstLetters = str
      .split(" ")
      .map((word) => word[0])
      .join("");

    return firstLetters;
  },
};

export default textUtils;
