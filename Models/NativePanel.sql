CREATE TABLE IF NOT EXISTS NativePanel (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cardSubjectId int NOT NULL,
    panel varchar(255) NOT NULL,
    FOREIGN KEY (cardSubjectId) REFERENCES CardSubject(id) ON DELETE CASCADE
);

CREATE TRIGGER IF NOT EXISTS trgPublishCardSubject
AFTER
INSERT
    ON NativePanel FOR EACH ROW BEGIN IF (
        (
            SELECT
                COUNT(cardSubjectId)
            FROM
                NativePanel
            WHERE
                NativePanel.cardSubjectId = NEW.cardSubjectId
        ) > 23
    ) THEN
UPDATE
    CardSubject
SET
    published = 1
WHERE
    id = NEW.cardSubjectId;

END IF;

END;