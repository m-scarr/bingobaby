module.exports = {
  create: (creatorId, subject) => {
    return (
      "INSERT INTO CardSubject (creatorId, subject) VALUES (" +
      creatorId +
      ", '" +
      subject +
      "'); SELECT * FROM CardSubject WHERE id=LAST_INSERT_ID();"
    );
  },
  read: (id) => {
    return (
      "SELECT id, panel FROM NativePanel WHERE cardSubjectId = " + id + ";"
    );
  }, //return subject and all native panels with the same cardSubjectId
  readUserCardSubjects: (creatorId) => {
    return "SELECT * FROM CardSubject WHERE creatorId = " + creatorId + ";";
  },
  update: (userId, id, subject) => {
    return (
      "UPDATE CardSubject SET subject = '" +
      subject +
      "' WHERE id = '" +
      id +
      "' AND creatorId = '" +
      userId +
      "';"
    );
  },
  updatePic: (userId, id, subjectPic) => {
    return (
      "UPDATE CardSubject SET subjectPic = '" +
      subjectPic +
      "' WHERE id = '" +
      id +
      "' AND creatorId = '" +
      userId +
      "';"
    );
  },
  delete: (id) => {
    return "DELETE FROM CardSubject WHERE id = " + id + ";";
  },
  search: (subject) => {
    return (
      "SELECT cardSubject.id, cardSubject.subject, cardSubject.rating, cardSubject.subjectPic, User.username FROM CardSubject " +
      "JOIN User ON CardSubject.creatorId = User.id WHERE CardSubject.published = 1 AND CardSubject.subject LIKE '%" +
      subject +
      "%';"
    );
  },
};
