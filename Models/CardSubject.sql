CREATE TABLE IF NOT EXISTS CardSubject (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    creatorId int NOT NULL,
    subject varchar(100) NOT NULL,
    subjectPic varchar(255) DEFAULT '',
    reviewCount int NOT NULL DEFAULT 0,
    published bool DEFAULT false,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (creatorId) REFERENCES User(id) ON DELETE CASCADE
);
