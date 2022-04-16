const objectUtils = {
  getListForAutoComplete: (userList) => {
    return userList.map((a) => {
      const userInfo = a.name + " (" + a.email + ")";
      return { value: a.id, label: userInfo };
    });
  },

  getListIds: (userList) => {
    return userList.map((a) => {
      return a.id;
    });
  },
};

export default objectUtils;
