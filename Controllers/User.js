module.exports = {
  create: (username, password) => {
    return (
      "INSERT INTO User (username, password) VALUES ('" +
      username +
      "', '" +
      password +
      "'); SELECT id, username, aboutMe, profilePic FROM User WHERE id = LAST_INSERT_ID();"
    );
  },
  logIn: (username, password) => {
    return (
      "SELECT id, username, aboutMe, profilePic FROM User WHERE username = '" +
      username +
      "' AND password = '" +
      password +
      "';"
    );
  },
  updateUsername: (id, username) => {
    return (
      "UPDATE User SET username = '" +
      username +
      "' WHERE id = " +
      id +
      "; SELECT username FROM User WHERE id = " +
      id +
      ";"
    );
  },
  updatePassword: (username, password) => {
    return (
      "UPDATE User SET password = '" +
      newPassword +
      "' WHERE username = '" +
      username +
      "' AND password = '" +
      password +
      "';"
    );
  },
  updatePic: (id, pic) => {
    return (
      "UPDATE User SET profilePic = '" + pic + "' WHERE id = '" + id + "';"
    );
  },
  delete: (username, password) => {
    return (
      "DELETE FROM User WHERE username='" +
      username +
      "' AND password='" +
      password +
      "';"
    );
  },
  getUserAnalysis: (username) => {
    return (
      "SELECT " +
      "(SELECT AVG(CardSubject.rating) FROM User " +
      "JOIN CardSubject ON User.id=CardSubject.creatorId " +
      "WHERE User.username='" +
      username +
      "' AND published=1) AS 'cardSubjectAvgRating', " +
      "COUNT(DISTINCT Review) AS 'numReviews', " +
      "(SELECT COUNT(CardSubject.id) FROM User " +
      "JOIN CardSubject ON User.id=CardSubject.creatorId " +
      "WHERE User.username='" +
      username +
      "' AND CardSubject.published=1) AS 'numCardSubjects', " +
      "COUNT(DISTINCT Card.id) AS 'numCards' FROM User " +
      "JOIN CardSubject ON User.id=CardSubject.creatorId " +
      "JOIN Review ON CardSubject.id=Review.cardSubjectId " +
      "JOIN Card ON CardSubject.id=Card.cardSubjectId " +
      "WHERE User.username='" +
      username +
      "' AND CardSubject.published=1;"
    );
  },
};

/*
SELECT
(SELECT AVG(CardSubject.rating) FROM User
JOIN CardSubject ON User.id=CardSubject.creatorId
WHERE User.username='user3'
AND published=1) AS 'cardSubjetAvgRating',
COUNT(DISTINCT Review) AS 'numReviews',
(SELECT COUNT(CardSubject.id) FROM User
JOIN CardSubject ON User.id=CardSubject.creatorId
WHERE User.username='user3') AS 'numCardSubjects',
COUNT(DISTINCT Card.id) AS 'numReviews'
FROM User
JOIN CardSubject ON User.id=CardSubject.creatorId
JOIN Review ON CardSubject.id=Review.cardSubjectId
JOIN Card ON CardSubject.id=Card.cardSubjectId
WHERE User.username='user3';*/
