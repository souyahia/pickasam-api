CREATE TABLE Picture (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) NOT NULL UNIQUE,
  elo INT NOT NULL,
  elo_male INT NOT NULL,
  elo_female INT NOT NULL,
  elo_other INT NOT NULL,
  elo_unknown INT NOT NULL,
  data LONGBLOB NOT NULL
);

CREATE TABLE `Match` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) NOT NULL UNIQUE,
  gender VARCHAR(7) NOT NULL,
  picture_1_id INT NOT NULL,
  picture_2_id INT NOT NULL,
  winner INT,
  CONSTRAINT fk_picture1 FOREIGN KEY (picture_1_id) REFERENCES Picture(id),
  CONSTRAINT fk_picture2 FOREIGN KEY (picture_2_id) REFERENCES Picture(id)
);
