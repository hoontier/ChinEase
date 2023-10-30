CREATE TABLE lessons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE vocabulary (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lesson_id INT NOT NULL,
  hanzi VARCHAR(255) NOT NULL,
  pinyin VARCHAR(255) NOT NULL,
  noTones VARCHAR(255) NOT NULL,
  english VARCHAR(255) NOT NULL,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- @block
GRANT ALL PRIVILEGES ON chinease.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

-- @block
-- Clear the vocabulary table
DELETE FROM vocabulary;

-- Clear the lessons table
DELETE FROM lessons;

-- @block
ALTER TABLE vocabulary MODIFY hanzi VARCHAR(255);
