const calculatePointsAllColumn = (cards) => {
  let result = {
    todo: 0,
    inProgress: 0,
    done: 0,
  };

  for (let key in cards) {
    if (cards[key].status in result) {
      const status = cards[key].status;
      result[status] += cards[key].point;
    }
  }

  return result;
};

export default calculatePointsAllColumn;
