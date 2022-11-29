module.exports = {
  create: (reviewerId, cardSubjectId, review, rating) => {
    return (
      "INSERT INTO Review (reviewerId, cardSubjectId, review, rating) VALUES (" +
      reviewerId +
      ", " +
      cardSubjectId +
      ", '" +
      review +
      "', " +
      rating +
      ");"
    );
  },
  read: (id) => {
    return (
      "SELECT User.username, User.profilePic, Review.review, Review.rating FROM Review JOIN User ON Review.reviewerId=User.id WHERE Review.cardSubjectId = " + id + ";"
    );
  },
};
