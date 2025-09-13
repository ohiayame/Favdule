CREATE DATABASE IF NOT EXISTS myapp;

USE myapp;


-- -------------------------------
-- USERS
-- ------------------------------
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100),
  picture_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Refresh Tokens 
CREATE TABLE refresh_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(512) NOT NULL,
  expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_user_token (user_id, token),
  CONSTRAINT fk_refresh_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- -------------------------------
-- Channel 관련
-- ------------------------------
-- Groups (사용자의 채널 리스트)
CREATE TABLE user_groups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(100),
  CONSTRAINT fk_group_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Channels (channelId 저장 테이블)
CREATE TABLE channels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  channelId VARCHAR(255) UNIQUE,
  name VARCHAR(100)
);

-- Group_Channels (각 id저장 - 중간 테이블)
CREATE TABLE group_channels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT NOT NULL,
  channel_id INT NOT NULL,
  UNIQUE KEY uniq_group_channel (group_id, channel_id),
  CONSTRAINT fk_gc_group FOREIGN KEY (group_id) REFERENCES user_groups(id) ON DELETE CASCADE,
  CONSTRAINT fk_gc_channel FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE
);

-- Users
INSERT INTO users (email, name, picture_url) VALUES
('alice@example.com', 'Alice', 'https://example.com/img/alice.png'),
('bob@example.com', 'Bob', 'https://example.com/img/bob.png'),
('carol@example.com', 'Carol', 'https://example.com/img/carol.png');

-- Refresh Tokens
INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES
(1, 'token_alice_123', '2025-12-31 23:59:59'),
(2, 'token_bob_456', '2025-12-31 23:59:59');

-- Groups
INSERT INTO user_groups (user_id, name) VALUES
(1, 'Alice의 즐겨찾기'),
(1, 'Alice의 음악 채널'),
(2, 'Bob의 게임 채널 모음'),
(3, 'Carol의 공부 채널');

-- Channels
INSERT INTO channels (channelId, name) VALUES
('UCJFZiqLMntJufDCHc6bQixg', 'Hololive Official'),
('UC1DCedRgGHBdm81E1llLhOQ', 'Usada Pekora'),
('UC-hM6YJuNYVAmUWxeIr9FeA', 'Hoshimachi Suisei'),
('UCdyqAaZDKHXg4Ahi7VENThQ', 'Inugami Korone'),
('UC1opHUrw8rvnsadT-iGp7Cg', 'Tokino Sora');

-- Group_Channels (group과 channel 연결)
INSERT INTO group_channels (group_id, channel_id) VALUES
(1, 1),  -- Alice의 즐겨찾기 ← Hololive Official
(1, 2),  -- Alice의 즐겨찾기 ← Usada Pekora
(2, 3),  -- Alice의 음악 채널 ← Hoshimachi Suisei
(3, 4),  -- Bob의 게임 채널 모음 ← Inugami Korone
(4, 5);  -- Carol의 공부 채널 ← Tokino Sora
