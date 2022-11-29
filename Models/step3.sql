CREATE DATABASE IF NOT EXISTS bingobaby;

USE bingobaby;

CREATE TABLE IF NOT EXISTS User (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username varchar(100) NOT NULL UNIQUE,
    password varchar(100) NOT NULL,
    aboutMe varchar(255) DEFAULT '',
    profilePic varchar(255) DEFAULT '',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS CardSubject (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    creatorId int NOT NULL,
    subject varchar(100) NOT NULL,
    subjectPic varchar(255) DEFAULT '',
    reviewCount int NOT NULL DEFAULT 0,
    published bool DEFAULT false,
    rating DECIMAL(4, 2) DEFAULT 5,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (creatorId) REFERENCES User(id) ON DELETE CASCADE
);

CREATE VIEW SubjectsByAuthor AS
SELECT
    User.username,
    CardSubject.subject,
    CardSubject.rating
FROM
    CardSubject
    JOIN User ON CardSubject.creatorId = User.id
ORDER BY
    (User.username);

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

CREATE TABLE IF NOT EXISTS Card (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cardSubjectId int NOT NULL,
    userId int NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cardSubjectId) REFERENCES CardSubject(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Panel (
    nativePanelId int NOT NULL,
    cardId int NOT NULL,
    ticked boolean DEFAULT false,
    position int NOT NULL,
    FOREIGN KEY (nativePanelId) REFERENCES NativePanel(id) ON DELETE CASCADE,
    FOREIGN KEY (cardId) REFERENCES Card(id) ON DELETE CASCADE,
    PRIMARY KEY (nativePanelId, cardId)
);

CREATE TABLE IF NOT EXISTS Review (
    rating int NOT NULL,
    cardSubjectId int NOT NULL,
    reviewerId int NOT NULL,
    review varchar(255) DEFAULT '',
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

INSERT INTO
    User (username, password)
VALUES
    ('User1', 'pass'),
    ('User2', 'pass'),
    ('User3', 'pass'),
    ('User4', 'pass'),
    ('User5', 'pass'),
    ('User6', 'pass'),
    ('User7', 'pass'),
    ('User8', 'pass'),
    ('User9', 'pass'),
    ('User10', 'pass');

INSERT INTO
    CardSubject (creatorId, subject)
VALUES
    (4, 'Love Island S3'),
    (3, 'Futurama'),
    (3, 'Parks and Rec'),
    (3, 'The Office'),
    (2, 'Love Island S4'),
    (3, 'Community'),
    (1, 'Arrested Development'),
    (2, 'Love Island S5'),
    (7, 'The Bachelor'),
    (8, 'Archer');

INSERT INTO
    NativePanel (cardSubjectId, panel)
VALUES
    (4, 'Pranks'),
    (4, '“That’s what she said”'),
    (4, 'Michael is mean to Toby'),
    (4, 'Jim looks at the camera'),
    (4, 'Toby is sad'),
    (4, 'Moes shows up'),
    (4, 'Kelly mentions a celebrity'),
    (4, 'Michael sings'),
    (4, 'Michael calls for a meeting'),
    (4, '"Bob Vance, Vance Refridgeration"'),
    (4, 'Dwight does karate'),
    (4, 'Someone actually gets work done'),
    (4, 'Stanley does a crossword puzzle'),
    (4, 'Office party'),
    (
        4,
        'Michael corrects dwight: assistant TO the regional manager'
    ),
    (4, 'Party planning committee politics'),
    (4, 'Angela being judgemental'),
    (4, 'Andy mentions Cornell'),
    (4, 'Michael being dramatic'),
    (4, '“Dunder-Mifflin this is Pam”'),
    (4, 'Andy sings'),
    (4, 'Michael does a character'),
    (4, 'Michael is obsessed with Ryan'),
    (4, 'Dwight complains about Jim');

INSERT INTO
    Review (reviewerId, cardSubjectId, review, rating)
VALUES
    (
        1,
        4,
        "Makes pretty good bingo cards for The Office.",
        8
    ),
    (
        2,
        4,
        "Perfect for my The Office theme party!",
        9
    ),
    (
        3,
        4,
        "I created this and I think it's great!",
        10
    ),
    (
        4,
        4,
        "the bare minimum amount of possible panels.",
        4
    ),
    (
        5,
        4,
        "Needs more panels to increase the randomness of the cards it generates.",
        6
    ),
    (
        6,
        4,
        "Pretty good",
        7
    ),
    (
        7,
        4,
        "meh",
        5
    ),
    (
        8,
        4,
        "pretty good, but could use more panels",
        7
    ),
    (
        9,
        4,
        "This generates the best office bingo cards.",
        9
    ),
    (
        10,
        4,
        "terrible",
        2
    );

INSERT INTO
    Card (userId, cardSubjectId)
VALUES
    (2, 4);

SET
    @cardId = LAST_INSERT_ID();

DROP TEMPORARY TABLE IF EXISTS tempCard;

CREATE TEMPORARY TABLE tempCard (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nativePanelId INT NOT NULL,
    cardId INT NOT NULL
);

INSERT INTO
    tempCard (nativePanelId, cardId)
SELECT
    NativePanel.id,
    @cardId
FROM
    NativePanel
WHERE
    cardSubjectId = 4
ORDER BY
    RAND()
LIMIT
    24;

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            14
        FROM
            tempCard
        WHERE
            id = 1
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            17
        FROM
            tempCard
        WHERE
            id = 2
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            20
        FROM
            tempCard
        WHERE
            id = 3
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            2
        FROM
            tempCard
        WHERE
            id = 4
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            13
        FROM
            tempCard
        WHERE
            id = 5
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            9
        FROM
            tempCard
        WHERE
            id = 6
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            5
        FROM
            tempCard
        WHERE
            id = 7
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            10
        FROM
            tempCard
        WHERE
            id = 8
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            4
        FROM
            tempCard
        WHERE
            id = 9
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            6
        FROM
            tempCard
        WHERE
            id = 10
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            16
        FROM
            tempCard
        WHERE
            id = 11
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            1
        FROM
            tempCard
        WHERE
            id = 12
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            21
        FROM
            tempCard
        WHERE
            id = 13
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            18
        FROM
            tempCard
        WHERE
            id = 14
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            24
        FROM
            tempCard
        WHERE
            id = 15
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            15
        FROM
            tempCard
        WHERE
            id = 16
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            11
        FROM
            tempCard
        WHERE
            id = 17
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            7
        FROM
            tempCard
        WHERE
            id = 18
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            23
        FROM
            tempCard
        WHERE
            id = 19
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            22
        FROM
            tempCard
        WHERE
            id = 20
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            8
        FROM
            tempCard
        WHERE
            id = 21
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            12
        FROM
            tempCard
        WHERE
            id = 22
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            3
        FROM
            tempCard
        WHERE
            id = 23
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            19
        FROM
            tempCard
        WHERE
            id = 24
    );

INSERT INTO
    Card (userId, cardSubjectId)
VALUES
    (2, 4);

SET
    @cardId = LAST_INSERT_ID();

DROP TEMPORARY TABLE IF EXISTS tempCard;

CREATE TEMPORARY TABLE tempCard (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nativePanelId INT NOT NULL,
    cardId INT NOT NULL
);

INSERT INTO
    tempCard (nativePanelId, cardId)
SELECT
    NativePanel.id,
    @cardId
FROM
    NativePanel
WHERE
    cardSubjectId = 4
ORDER BY
    RAND()
LIMIT
    24;

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            9
        FROM
            tempCard
        WHERE
            id = 1
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            13
        FROM
            tempCard
        WHERE
            id = 2
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            2
        FROM
            tempCard
        WHERE
            id = 3
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            21
        FROM
            tempCard
        WHERE
            id = 4
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            24
        FROM
            tempCard
        WHERE
            id = 5
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            23
        FROM
            tempCard
        WHERE
            id = 6
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            12
        FROM
            tempCard
        WHERE
            id = 7
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            6
        FROM
            tempCard
        WHERE
            id = 8
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            7
        FROM
            tempCard
        WHERE
            id = 9
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            14
        FROM
            tempCard
        WHERE
            id = 10
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            3
        FROM
            tempCard
        WHERE
            id = 11
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            4
        FROM
            tempCard
        WHERE
            id = 12
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            19
        FROM
            tempCard
        WHERE
            id = 13
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            16
        FROM
            tempCard
        WHERE
            id = 14
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            5
        FROM
            tempCard
        WHERE
            id = 15
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            15
        FROM
            tempCard
        WHERE
            id = 16
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            20
        FROM
            tempCard
        WHERE
            id = 17
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            10
        FROM
            tempCard
        WHERE
            id = 18
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            8
        FROM
            tempCard
        WHERE
            id = 19
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            22
        FROM
            tempCard
        WHERE
            id = 20
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            11
        FROM
            tempCard
        WHERE
            id = 21
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            1
        FROM
            tempCard
        WHERE
            id = 22
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            18
        FROM
            tempCard
        WHERE
            id = 23
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            17
        FROM
            tempCard
        WHERE
            id = 24
    );

INSERT INTO
    Card (userId, cardSubjectId)
VALUES
    (5, 4);

SET
    @cardId = LAST_INSERT_ID();

DROP TEMPORARY TABLE IF EXISTS tempCard;

CREATE TEMPORARY TABLE tempCard (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nativePanelId INT NOT NULL,
    cardId INT NOT NULL
);

INSERT INTO
    tempCard (nativePanelId, cardId)
SELECT
    NativePanel.id,
    @cardId
FROM
    NativePanel
WHERE
    cardSubjectId = 4
ORDER BY
    RAND()
LIMIT
    24;

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            6
        FROM
            tempCard
        WHERE
            id = 1
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            16
        FROM
            tempCard
        WHERE
            id = 2
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            19
        FROM
            tempCard
        WHERE
            id = 3
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            22
        FROM
            tempCard
        WHERE
            id = 4
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            3
        FROM
            tempCard
        WHERE
            id = 5
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            13
        FROM
            tempCard
        WHERE
            id = 6
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            17
        FROM
            tempCard
        WHERE
            id = 7
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            23
        FROM
            tempCard
        WHERE
            id = 8
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            15
        FROM
            tempCard
        WHERE
            id = 9
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            5
        FROM
            tempCard
        WHERE
            id = 10
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            9
        FROM
            tempCard
        WHERE
            id = 11
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            7
        FROM
            tempCard
        WHERE
            id = 12
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            11
        FROM
            tempCard
        WHERE
            id = 13
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            20
        FROM
            tempCard
        WHERE
            id = 14
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            14
        FROM
            tempCard
        WHERE
            id = 15
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            18
        FROM
            tempCard
        WHERE
            id = 16
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            1
        FROM
            tempCard
        WHERE
            id = 17
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            10
        FROM
            tempCard
        WHERE
            id = 18
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            12
        FROM
            tempCard
        WHERE
            id = 19
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            21
        FROM
            tempCard
        WHERE
            id = 20
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            4
        FROM
            tempCard
        WHERE
            id = 21
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            24
        FROM
            tempCard
        WHERE
            id = 22
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            2
        FROM
            tempCard
        WHERE
            id = 23
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            8
        FROM
            tempCard
        WHERE
            id = 24
    );

INSERT INTO
    Card (userId, cardSubjectId)
VALUES
    (5, 4);

SET
    @cardId = LAST_INSERT_ID();

DROP TEMPORARY TABLE IF EXISTS tempCard;

CREATE TEMPORARY TABLE tempCard (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nativePanelId INT NOT NULL,
    cardId INT NOT NULL
);

INSERT INTO
    tempCard (nativePanelId, cardId)
SELECT
    NativePanel.id,
    @cardId
FROM
    NativePanel
WHERE
    cardSubjectId = 4
ORDER BY
    RAND()
LIMIT
    24;

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            2
        FROM
            tempCard
        WHERE
            id = 1
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            20
        FROM
            tempCard
        WHERE
            id = 2
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            6
        FROM
            tempCard
        WHERE
            id = 3
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            3
        FROM
            tempCard
        WHERE
            id = 4
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            12
        FROM
            tempCard
        WHERE
            id = 5
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            14
        FROM
            tempCard
        WHERE
            id = 6
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            4
        FROM
            tempCard
        WHERE
            id = 7
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            5
        FROM
            tempCard
        WHERE
            id = 8
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            10
        FROM
            tempCard
        WHERE
            id = 9
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            7
        FROM
            tempCard
        WHERE
            id = 10
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            21
        FROM
            tempCard
        WHERE
            id = 11
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            24
        FROM
            tempCard
        WHERE
            id = 12
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            16
        FROM
            tempCard
        WHERE
            id = 13
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            18
        FROM
            tempCard
        WHERE
            id = 14
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            19
        FROM
            tempCard
        WHERE
            id = 15
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            1
        FROM
            tempCard
        WHERE
            id = 16
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            9
        FROM
            tempCard
        WHERE
            id = 17
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            11
        FROM
            tempCard
        WHERE
            id = 18
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            17
        FROM
            tempCard
        WHERE
            id = 19
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            8
        FROM
            tempCard
        WHERE
            id = 20
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            13
        FROM
            tempCard
        WHERE
            id = 21
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            15
        FROM
            tempCard
        WHERE
            id = 22
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            22
        FROM
            tempCard
        WHERE
            id = 23
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            23
        FROM
            tempCard
        WHERE
            id = 24
    );

INSERT INTO
    Card (userId, cardSubjectId)
VALUES
    (5, 4);

SET
    @cardId = LAST_INSERT_ID();

DROP TEMPORARY TABLE IF EXISTS tempCard;

CREATE TEMPORARY TABLE tempCard (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nativePanelId INT NOT NULL,
    cardId INT NOT NULL
);

INSERT INTO
    tempCard (nativePanelId, cardId)
SELECT
    NativePanel.id,
    @cardId
FROM
    NativePanel
WHERE
    cardSubjectId = 4
ORDER BY
    RAND()
LIMIT
    24;

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            5
        FROM
            tempCard
        WHERE
            id = 1
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            19
        FROM
            tempCard
        WHERE
            id = 2
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            20
        FROM
            tempCard
        WHERE
            id = 3
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            21
        FROM
            tempCard
        WHERE
            id = 4
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            4
        FROM
            tempCard
        WHERE
            id = 5
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            24
        FROM
            tempCard
        WHERE
            id = 6
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            6
        FROM
            tempCard
        WHERE
            id = 7
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            11
        FROM
            tempCard
        WHERE
            id = 8
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            7
        FROM
            tempCard
        WHERE
            id = 9
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            18
        FROM
            tempCard
        WHERE
            id = 10
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            16
        FROM
            tempCard
        WHERE
            id = 11
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            13
        FROM
            tempCard
        WHERE
            id = 12
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            15
        FROM
            tempCard
        WHERE
            id = 13
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            1
        FROM
            tempCard
        WHERE
            id = 14
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            8
        FROM
            tempCard
        WHERE
            id = 15
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            23
        FROM
            tempCard
        WHERE
            id = 16
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            2
        FROM
            tempCard
        WHERE
            id = 17
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            3
        FROM
            tempCard
        WHERE
            id = 18
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            10
        FROM
            tempCard
        WHERE
            id = 19
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            9
        FROM
            tempCard
        WHERE
            id = 20
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            22
        FROM
            tempCard
        WHERE
            id = 21
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            12
        FROM
            tempCard
        WHERE
            id = 22
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            17
        FROM
            tempCard
        WHERE
            id = 23
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            14
        FROM
            tempCard
        WHERE
            id = 24
    );

INSERT INTO
    Card (userId, cardSubjectId)
VALUES
    (1, 4);

SET
    @cardId = LAST_INSERT_ID();

DROP TEMPORARY TABLE IF EXISTS tempCard;

CREATE TEMPORARY TABLE tempCard (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nativePanelId INT NOT NULL,
    cardId INT NOT NULL
);

INSERT INTO
    tempCard (nativePanelId, cardId)
SELECT
    NativePanel.id,
    @cardId
FROM
    NativePanel
WHERE
    cardSubjectId = 4
ORDER BY
    RAND()
LIMIT
    24;

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            9
        FROM
            tempCard
        WHERE
            id = 1
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            13
        FROM
            tempCard
        WHERE
            id = 2
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            17
        FROM
            tempCard
        WHERE
            id = 3
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            7
        FROM
            tempCard
        WHERE
            id = 4
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            23
        FROM
            tempCard
        WHERE
            id = 5
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            3
        FROM
            tempCard
        WHERE
            id = 6
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            5
        FROM
            tempCard
        WHERE
            id = 7
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            14
        FROM
            tempCard
        WHERE
            id = 8
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            11
        FROM
            tempCard
        WHERE
            id = 9
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            2
        FROM
            tempCard
        WHERE
            id = 10
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            24
        FROM
            tempCard
        WHERE
            id = 11
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            1
        FROM
            tempCard
        WHERE
            id = 12
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            16
        FROM
            tempCard
        WHERE
            id = 13
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            15
        FROM
            tempCard
        WHERE
            id = 14
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            18
        FROM
            tempCard
        WHERE
            id = 15
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            21
        FROM
            tempCard
        WHERE
            id = 16
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            20
        FROM
            tempCard
        WHERE
            id = 17
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            19
        FROM
            tempCard
        WHERE
            id = 18
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            6
        FROM
            tempCard
        WHERE
            id = 19
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            10
        FROM
            tempCard
        WHERE
            id = 20
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            22
        FROM
            tempCard
        WHERE
            id = 21
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            4
        FROM
            tempCard
        WHERE
            id = 22
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            12
        FROM
            tempCard
        WHERE
            id = 23
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            8
        FROM
            tempCard
        WHERE
            id = 24
    );

INSERT INTO
    Card (userId, cardSubjectId)
VALUES
    (7, 4);

SET
    @cardId = LAST_INSERT_ID();

DROP TEMPORARY TABLE IF EXISTS tempCard;

CREATE TEMPORARY TABLE tempCard (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nativePanelId INT NOT NULL,
    cardId INT NOT NULL
);

INSERT INTO
    tempCard (nativePanelId, cardId)
SELECT
    NativePanel.id,
    @cardId
FROM
    NativePanel
WHERE
    cardSubjectId = 4
ORDER BY
    RAND()
LIMIT
    24;

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            17
        FROM
            tempCard
        WHERE
            id = 1
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            4
        FROM
            tempCard
        WHERE
            id = 2
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            10
        FROM
            tempCard
        WHERE
            id = 3
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            8
        FROM
            tempCard
        WHERE
            id = 4
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            12
        FROM
            tempCard
        WHERE
            id = 5
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            2
        FROM
            tempCard
        WHERE
            id = 6
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            5
        FROM
            tempCard
        WHERE
            id = 7
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            16
        FROM
            tempCard
        WHERE
            id = 8
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            19
        FROM
            tempCard
        WHERE
            id = 9
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            1
        FROM
            tempCard
        WHERE
            id = 10
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            13
        FROM
            tempCard
        WHERE
            id = 11
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            15
        FROM
            tempCard
        WHERE
            id = 12
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            21
        FROM
            tempCard
        WHERE
            id = 13
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            18
        FROM
            tempCard
        WHERE
            id = 14
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            22
        FROM
            tempCard
        WHERE
            id = 15
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            3
        FROM
            tempCard
        WHERE
            id = 16
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            24
        FROM
            tempCard
        WHERE
            id = 17
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            20
        FROM
            tempCard
        WHERE
            id = 18
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            11
        FROM
            tempCard
        WHERE
            id = 19
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            6
        FROM
            tempCard
        WHERE
            id = 20
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            7
        FROM
            tempCard
        WHERE
            id = 21
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            14
        FROM
            tempCard
        WHERE
            id = 22
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            9
        FROM
            tempCard
        WHERE
            id = 23
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            23
        FROM
            tempCard
        WHERE
            id = 24
    );

INSERT INTO
    Card (userId, cardSubjectId)
VALUES
    (9, 4);

SET
    @cardId = LAST_INSERT_ID();

DROP TEMPORARY TABLE IF EXISTS tempCard;

CREATE TEMPORARY TABLE tempCard (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nativePanelId INT NOT NULL,
    cardId INT NOT NULL
);

INSERT INTO
    tempCard (nativePanelId, cardId)
SELECT
    NativePanel.id,
    @cardId
FROM
    NativePanel
WHERE
    cardSubjectId = 4
ORDER BY
    RAND()
LIMIT
    24;

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            24
        FROM
            tempCard
        WHERE
            id = 1
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            21
        FROM
            tempCard
        WHERE
            id = 2
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            5
        FROM
            tempCard
        WHERE
            id = 3
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            19
        FROM
            tempCard
        WHERE
            id = 4
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            1
        FROM
            tempCard
        WHERE
            id = 5
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            16
        FROM
            tempCard
        WHERE
            id = 6
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            23
        FROM
            tempCard
        WHERE
            id = 7
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            2
        FROM
            tempCard
        WHERE
            id = 8
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            6
        FROM
            tempCard
        WHERE
            id = 9
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            14
        FROM
            tempCard
        WHERE
            id = 10
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            17
        FROM
            tempCard
        WHERE
            id = 11
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            11
        FROM
            tempCard
        WHERE
            id = 12
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            4
        FROM
            tempCard
        WHERE
            id = 13
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            7
        FROM
            tempCard
        WHERE
            id = 14
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            10
        FROM
            tempCard
        WHERE
            id = 15
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            20
        FROM
            tempCard
        WHERE
            id = 16
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            18
        FROM
            tempCard
        WHERE
            id = 17
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            9
        FROM
            tempCard
        WHERE
            id = 18
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            3
        FROM
            tempCard
        WHERE
            id = 19
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            13
        FROM
            tempCard
        WHERE
            id = 20
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            22
        FROM
            tempCard
        WHERE
            id = 21
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            15
        FROM
            tempCard
        WHERE
            id = 22
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            12
        FROM
            tempCard
        WHERE
            id = 23
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            8
        FROM
            tempCard
        WHERE
            id = 24
    );

INSERT INTO
    Card (userId, cardSubjectId)
VALUES
    (9, 4);

SET
    @cardId = LAST_INSERT_ID();

DROP TEMPORARY TABLE IF EXISTS tempCard;

CREATE TEMPORARY TABLE tempCard (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nativePanelId INT NOT NULL,
    cardId INT NOT NULL
);

INSERT INTO
    tempCard (nativePanelId, cardId)
SELECT
    NativePanel.id,
    @cardId
FROM
    NativePanel
WHERE
    cardSubjectId = 4
ORDER BY
    RAND()
LIMIT
    24;

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            2
        FROM
            tempCard
        WHERE
            id = 1
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            10
        FROM
            tempCard
        WHERE
            id = 2
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            11
        FROM
            tempCard
        WHERE
            id = 3
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            13
        FROM
            tempCard
        WHERE
            id = 4
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            21
        FROM
            tempCard
        WHERE
            id = 5
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            20
        FROM
            tempCard
        WHERE
            id = 6
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            9
        FROM
            tempCard
        WHERE
            id = 7
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            4
        FROM
            tempCard
        WHERE
            id = 8
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            24
        FROM
            tempCard
        WHERE
            id = 9
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            14
        FROM
            tempCard
        WHERE
            id = 10
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            15
        FROM
            tempCard
        WHERE
            id = 11
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            18
        FROM
            tempCard
        WHERE
            id = 12
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            17
        FROM
            tempCard
        WHERE
            id = 13
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            7
        FROM
            tempCard
        WHERE
            id = 14
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            1
        FROM
            tempCard
        WHERE
            id = 15
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            22
        FROM
            tempCard
        WHERE
            id = 16
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            16
        FROM
            tempCard
        WHERE
            id = 17
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            19
        FROM
            tempCard
        WHERE
            id = 18
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            3
        FROM
            tempCard
        WHERE
            id = 19
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            12
        FROM
            tempCard
        WHERE
            id = 20
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            23
        FROM
            tempCard
        WHERE
            id = 21
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            6
        FROM
            tempCard
        WHERE
            id = 22
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            8
        FROM
            tempCard
        WHERE
            id = 23
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            5
        FROM
            tempCard
        WHERE
            id = 24
    );

INSERT INTO
    Card (userId, cardSubjectId)
VALUES
    (3, 4);

SET
    @cardId = LAST_INSERT_ID();

DROP TEMPORARY TABLE IF EXISTS tempCard;

CREATE TEMPORARY TABLE tempCard (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nativePanelId INT NOT NULL,
    cardId INT NOT NULL
);

INSERT INTO
    tempCard (nativePanelId, cardId)
SELECT
    NativePanel.id,
    @cardId
FROM
    NativePanel
WHERE
    cardSubjectId = 4
ORDER BY
    RAND()
LIMIT
    24;

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            5
        FROM
            tempCard
        WHERE
            id = 1
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            11
        FROM
            tempCard
        WHERE
            id = 2
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            13
        FROM
            tempCard
        WHERE
            id = 3
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            22
        FROM
            tempCard
        WHERE
            id = 4
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            14
        FROM
            tempCard
        WHERE
            id = 5
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            19
        FROM
            tempCard
        WHERE
            id = 6
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            17
        FROM
            tempCard
        WHERE
            id = 7
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            20
        FROM
            tempCard
        WHERE
            id = 8
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            4
        FROM
            tempCard
        WHERE
            id = 9
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            24
        FROM
            tempCard
        WHERE
            id = 10
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            21
        FROM
            tempCard
        WHERE
            id = 11
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            6
        FROM
            tempCard
        WHERE
            id = 12
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            9
        FROM
            tempCard
        WHERE
            id = 13
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            18
        FROM
            tempCard
        WHERE
            id = 14
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            2
        FROM
            tempCard
        WHERE
            id = 15
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            15
        FROM
            tempCard
        WHERE
            id = 16
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            10
        FROM
            tempCard
        WHERE
            id = 17
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            12
        FROM
            tempCard
        WHERE
            id = 18
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            3
        FROM
            tempCard
        WHERE
            id = 19
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            7
        FROM
            tempCard
        WHERE
            id = 20
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            23
        FROM
            tempCard
        WHERE
            id = 21
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            8
        FROM
            tempCard
        WHERE
            id = 22
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            1
        FROM
            tempCard
        WHERE
            id = 23
    );

INSERT INTO
    Panel(nativePanelId, cardId, position) (
        SELECT
            nativePanelId,
            cardId,
            16
        FROM
            tempCard
        WHERE
            id = 24
    );