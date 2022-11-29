module.exports = {
  create: (userId, cardSubjectId) => {
    var order = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24,
    ];
    var i = 23;
    var temp;
    while (i != 0) {
      randomI = Math.floor(Math.random() * i);
      temp = order[i];
      order[i] = order[randomI];
      order[randomI] = temp;
      i -= 1;
    }
    var panelQuery = " ";
    for (var i = 0; i < 24; i++) {
      panelQuery +=
        "\n\nINSERT INTO Panel(nativePanelId, cardId, position) (SELECT nativePanelId, cardId, " +
        order[i] +
        " FROM tempCard WHERE id=" +
        (i + 1).toString() +
        "); ";
    }
    return (
      "INSERT INTO Card (userId, cardSubjectId) VALUES (" +
      userId +
      ", " +
      cardSubjectId +
      "); SET @cardId = LAST_INSERT_ID(); " +
      "DROP TEMPORARY TABLE IF EXISTS tempCard; " +
      "CREATE TEMPORARY TABLE tempCard (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, nativePanelId INT NOT NULL, cardId INT NOT NULL); " +
      "INSERT INTO tempCard (nativePanelId, cardId) SELECT NativePanel.id, @cardId FROM NativePanel WHERE cardSubjectId = " +
      cardSubjectId +
      " ORDER BY RAND() LIMIT 24;" +
      panelQuery +
      "SELECT CardSubject.subject, @cardId FROM Card JOIN CardSubject ON Card.cardSubjectId = CardSubject.id WHERE Card.id = @cardId; " +
      "SELECT NativePanel.panel, Panel.ticked, Panel.cardId, Panel.nativePanelId FROM Panel JOIN NativePanel ON Panel.nativePanelId = NativePanel.id " +
      "WHERE Panel.cardId = @cardId ORDER BY Panel.position ASC;"
    );
  },
  read: (id) => {
    return (
      "SELECT CardSubject.subject FROM Card JOIN CardSubject ON Card.cardSubjectId = CardSubject.id WHERE Card.id = " +
      id +
      "; SELECT NativePanel.panel, Panel.ticked, Panel.cardId, Panel.nativePanelId FROM Panel " +
      "JOIN NativePanel ON Panel.nativePanelId=NativePanel.id " +
      "WHERE Panel.cardId=" +
      id +
      " ORDER BY Panel.position ASC;"
    );
  }, //return subject from cardSubjectId and all panels and their nativepanel with the same cardId
  delete: (id) => {
    return "DELETE FROM Card WHERE id = " + id + ";";
  },
  list: (userId) => {
    return (
      "SELECT CardSubject.subject, Card.id FROM Card " +
      "JOIN CardSubject ON Card.cardSubjectId = CardSubject.id " +
      "WHERE Card.userId = " +
      userId +
      ";"
    );
  }, //returns a list of the Cards of all currently existing cards for user
};
