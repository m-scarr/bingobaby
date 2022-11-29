CREATE TABLE IF NOT EXISTS Review (
    cardSubjectId int NOT NULL,
    reviewerId int NOT NULL,
    review varchar(255) NOT NULL,
    rating int NOT NULL,
    FOREIGN KEY (cardSubjectId) REFERENCES CardSubject(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewerId) REFERENCES User(id) ON DELETE CASCADE,
    PRIMARY KEY (cardSubjectId, reviewerId)
);

/*Add a trigger that fires everytime a review is inserted/updated/deleted, it saves the average rating and reviewCount to the applicable cardSubject*/
CREATE TRIGGER IF NOT EXISTS trgUpdateCardSubject
AFTER
INSERT
    ON Review FOR EACH ROW BEGIN
UPDATE
    CardSubject
SET
    reviewCount = reviewCount + 1,
    rating = (
        SELECT
            AVG(Review.rating)
        FROM
            Review
        WHERE
            Review.cardSubjectId = NEW.cardSubjectId
    )
WHERE
    CardSubject.id = NEW.cardSubjectId;
END;