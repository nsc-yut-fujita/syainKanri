-- SQLite
CREATE TABLE sinnyuu(
    id INTEGER PRIMARY KEY,
    sei TEXT,
    mei TEXT,
    bangou INTEGER,
    address TEXT
);

INSERT INTO sinnyuu(id,sei,mei,bangou,address)VALUES(
    1111,
    "山田",
    "一郎",
    1234,
    "asd@asd"
);

INSERT INTO sinnyuu(id,sei,mei,bangou,address)VALUES(
    2222,
    "山田",
    "二郎",
    5678,
    "fgh@asd"
);

INSERT INTO sinnyuu(id,sei,mei,bangou,address)VALUES(
    3333,
    "山田",
    "三郎",
    9000,
    "jkl@asd"
);

INSERT INTO sinnyuu(id,sei,mei,bangou,address)VALUES(
    3333,
    "山田",
    "四郎",
    9001,
    "jkl@asd"
);

DELETE FROM sinnyuu WHERE id = 1;