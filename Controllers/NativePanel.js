module.exports = {
  create: (cardSubjectId, panel) => {
    return (
      "INSERT INTO NativePanel (cardSubjectId, panel) VALUES (" +
      cardSubjectId +
      ", '" +
      panel +
      "');SELECT * FROM NativePanel WHERE id = LAST_INSERT_ID();"
    );
  },
  update: (id, newPanel) => {
    return (
      "UPDATE NativePanel SET panel = '" +
      newPanel +
      "' WHERE id = '" +
      id +
      "';"
    );
  }
};
