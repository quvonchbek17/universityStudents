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
    faculty_id uuid,
        FOREIGN KEY(faculty_id)
        REFERENCES faculties(faculty_id)
        ON DELETE CASCADE
);


CREATE TABLE groups(
    group_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    group_name VARCHAR(255)
);

CREATE TABLE courses (
    course_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    course_number int not null
);

create table education (
    education_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    education_name text not null
);

create table mix(
    mix_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    course_id uuid,
        FOREIGN KEY(course_id)
        REFERENCES courses(course_id)
        ON DELETE CASCADE,
    direction_id uuid,
        FOREIGN KEY(direction_id)
        REFERENCES directions(direction_id)
        ON DELETE CASCADE,
    education_id uuid,
        FOREIGN KEY(education_id)
        REFERENCES education(education_id)
        ON DELETE CASCADE,
    group_id uuid,
        FOREIGN KEY(group_id)
        REFERENCES groups(group_id)
        ON DELETE CASCADE
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

CREATE TABLE botusers(
    user_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    user_chat_id BIGINT NOT NULL UNIQUE,
    user_full_name VARCHAR(255),
    user_language VARCHAR(20),
    user_phone_number VARCHAR(30),
    username VARCHAR(255),
    user_group_id uuid,
        FOREIGN KEY(user_group_id)
        REFERENCES groups(group_id)
        ON DELETE SET NULL
);

CREATE TABLE systemadmins(
    admin_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    admin_name VARCHAR(60),
    admin_password VARCHAR(60),
    admin_role VARCHAR(20),
    faculty_id uuid,
        FOREIGN KEY(faculty_id)
        REFERENCES faculties(faculty_id)
        ON DELETE CASCADE,
    university_id uuid,
        FOREIGN KEY(university_id)
        REFERENCES universities(university_id)
        ON DELETE CASCADE
);


CREATE TABLE botadmins(
    admin_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    admin_chat_id BIGINT NOT NULL UNIQUE,
    admin_full_name VARCHAR(255),
    admin_username VARCHAR(100),
    admin_phone_number VARCHAR(30),
    admin_language VARCHAR(20),
    admin_faculty_id uuid,
        FOREIGN KEY(admin_faculty_id)
        REFERENCES faculties(faculty_id)
        ON DELETE SET NULL
);

 lesson_id | lesson_name | lesson_teacher | lesson_room | lesson_day | start_time | group_id
-----------+-------------+----------------+-------------+------------+------------+----------

INSERT INTO schedules(lesson_name, lesson_teacher, lesson_room, lesson_day, start_time, group_id) VALUES
('Berilganlar bazasi (maruza)','prof. M.Hakimov', 'A-413', 'dushanba', '14:00', '8349ae10-be1d-4b8d-a5ba-5d5cd3530014'),
('Algoritmlar va berilganlar strukturalari (maruza)','prof.S.Gaynazarov', 'A-202', 'dushanba', '15:30', '8349ae10-be1d-4b8d-a5ba-5d5cd3530014');
