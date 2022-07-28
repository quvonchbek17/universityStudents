CREATE EXTENSION "uuid-ossp";

CREATE TABLE universities(
   university_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
   university_name VARCHAR(255)
);


CREATE TABLE faculties(
    faculty_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    faculty_name VARCHAR(255),
    university_id uuid,
        FOREIGN KEY(university_id)
        REFERENCES universities(university_id)
        ON DELETE CASCADE
);

CREATE TABLE directions(
    direction_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    direction_name VARCHAR(255),
    university_id uuid,
        FOREIGN KEY(university_id)
        REFERENCES universities(university_id)
        ON DELETE CASCADE,
    faculty_id uuid,
        FOREIGN KEY(faculty_id)
        REFERENCES faculties(faculty_id)
        ON DELETE CASCADE
);

CREATE TABLE groups(
    group_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    group_name VARCHAR(255),
    university_id uuid,
        FOREIGN KEY(university_id)
        REFERENCES universities(university_id)
        ON DELETE CASCADE,
    faculty_id uuid,
        FOREIGN KEY(faculty_id)
        REFERENCES faculties(faculty_id)
        ON DELETE CASCADE,
    direction_id uuid,
        FOREIGN KEY(direction_id)
        REFERENCES directions(direction_id)
        ON DELETE CASCADE
);


CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    user_chat_id VARCHAR(30),
    user_name_surname VARCHAR(100),
    user_language VARCHAR(20),
    user_group_id uuid,
        FOREIGN KEY(user_group_id)
        REFERENCES groups(group_id)
        ON DELETE SET NULL

);

CREATE TABLE schedules(
    lesson_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    lesson_name VARCHAR(100),
    lesson_teacher VARCHAR(150),
    lesson_room VARCHAR(40),
    lesson_day VARCHAR(30),
    start_time VARCHAR(70),
    group_id uuid,
        FOREIGN KEY(group_id)
        REFERENCES groups(group_id)
        ON DELETE CASCADE

);