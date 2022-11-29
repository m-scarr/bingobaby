module.exports = {
  update: (nativePanelId, cardId, ticked) => {
    return (
      "UPDATE Panel SET ticked = '" +
      (ticked ? 1 : 0) +
      "' WHERE nativePanelId = " +
      nativePanelId +
      " AND cardId = " +
      cardId +
      ";"
    );
  },
};
