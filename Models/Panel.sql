CREATE TABLE IF NOT EXISTS Panel (
    nativePanelId int NOT NULL,
    cardId int NOT NULL,
    ticked boolean DEFAULT false,
    position int NOT NULL,
    FOREIGN KEY (nativePanelId) REFERENCES NativePanel(id) ON DELETE CASCADE,
    FOREIGN KEY (cardId) REFERENCES Card(id) ON DELETE CASCADE,
    PRIMARY KEY (nativePanelId, cardId)
);