CREATE SCHEMA wellify;

DROP TABLE IF EXISTS wellify.users;
DROP TABLE IF EXISTS wellify.posture_events;
DROP TABLE IF EXISTS wellify.emotion_events;


CREATE TABLE wellify.users (
    user_id SERIAL PRIMARY KEY,
    user_name varchar(455)
);

CREATE TABLE wellify.posture_events (
    event_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES wellify.users(user_id),
    event_type varchar(30) NOT NULL,
    event_time TIMESTAMP DEFAULT NOW()
);

CREATE TABLE wellify.emotion_events (
    event_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES wellify.users(user_id),
    event_type varchar(30) NOT NULL,
    event_time TIMESTAMP DEFAULT NOW(),
    active_program varchar(40) NOT NULL 
);

INSERT INTO wellify.users (user_name)
VALUES
    ('Murphy Palmer'),
    ('Iola Huff'),
    ('Rahim Santana'),
    ('Yvette Russo'),
    ('Blythe Rodriquez');

INSERT INTO wellify.posture_events (user_id, event_type)
VALUES
    (1,'eye distance'),
    (2, 'slouch'),
    (3, 'look away'),
    (4,'eye distance'),
    (5, 'slouch');

INSERT INTO wellify.posture_events (user_id, event_type, event_time)
VALUES
    (1, 'look away', '2024-04-29 14:30:45'),
    (1,'eye distance', '2024-04-29 18:30:45'),
    (1, 'slouch', '2024-04-30 14:20:45'),
    (1, 'look away', '2024-04-30 15:30:45'),
    (1,'eye distance', '2024-04-30 19:30:45'),
    (1, 'slouch', '2024-05-01 11:30:45'),
    (1, 'look away', '2024-05-01 15:30:45'),
    (1,'eye distance', '2024-05-01 11:30:45'),
    (1, 'slouch', '2024-05-02 11:30:45'),
    (1, 'look away', '2024-05-03 11:30:45');

INSERT INTO wellify.emotion_events (user_id, event_type, event_time, active_program)
VALUES
    (1, 'Angry', '2024-04-29 14:30:45', 'VSCode'),
    (1,'Sad', '2024-04-29 18:30:45', 'Slack'),
    (1, 'Fear', '2024-04-30 14:20:45', 'Chrome'),
    (1, 'Disgust', '2024-04-30 15:30:45', 'Slack'),
    (1,'Neutral', '2024-04-30 19:30:45', 'VSCode'),
    (1, 'Happy', '2024-05-01 11:30:45', 'Spotify'),
    (1, 'Angry', '2024-05-01 15:30:45', 'Chrome'),
    (1,'Sad', '2024-05-01 11:30:45', 'Spotify'),
    (1, 'Fear', '2024-05-02 11:30:45', 'VSCode'),
    (1, 'Happy', '2024-05-03 11:30:45', 'Terminal'),
    (1, 'Angry', '2024-05-04 15:30:45', 'Chrome'),
    (1,'Sad', '2024-05-04 11:30:45', 'Slack'),
    (1, 'Fear', '2024-05-05 11:30:45', 'Slack'),
    (1, 'Happy', '2024-05-05 11:30:45', 'Slack'),
    (1, 'Happy', '2024-05-05 11:30:45', 'Terminal'),
    (1, 'Angry', '2024-05-06 15:30:45', 'VSCode'),
    (1,'Sad', '2024-05-06 11:30:45', 'Terminal'),
    (1, 'Fear', '2024-05-07 11:30:45', 'Spotify'),
    (1, 'Disgust', '2024-05-07 15:30:45', 'Chrome'),
    (1,'Neutral', '2024-05-07 19:30:45', 'Spotify');