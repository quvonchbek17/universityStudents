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

CREATE TABLE sciences(
    science_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    science_name VARCHAR(255),
    faculty_id uuid,
        FOREIGN KEY(faculty_id)
        REFERENCES faculties(faculty_id)
        ON DELETE SET NULL
);


CREATE TABLE teachers(
    teacher_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    teacher_name VARCHAR(255),
    teacher_surname VARCHAR(255),
    science_id uuid,
        FOREIGN KEY(science_id)
        REFERENCES sciences(science_id)
        ON DELETE SET NULL,
    faculty_id uuid,
        FOREIGN KEY(faculty_id)
        REFERENCES faculties(faculty_id)
        ON DELETE SET NULL
);

CREATE TABLE starttimes(
    time_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    time_desc VARCHAR(255),
    faculty_id uuid,
        FOREIGN KEY(faculty_id)
        REFERENCES faculties(faculty_id)
        ON DELETE CASCADE
);




INSERT INTO schedules(lesson_name, lesson_teacher, lesson_room, lesson_day, start_time, group_id) VALUES
('Berilganlar bazasi (maruza)','prof. M.Hakimov', 'A-413', 'dushanba', '14:00', '0222873e-7aea-49fc-b579-0f9d8d4cc1da'),
('Algoritmlar va berilganlar strukturalari (maruza)','prof.S.Gaynazarov', 'A-202', 'dushanba', '15:30', '0222873e-7aea-49fc-b579-0f9d8d4cc1da');

INSERT INTO systemadmins(admin_name, admin_password, admin_role) VALUES('admin', 'admin12345','superadmin');
INSERT INTO systemadmins(admin_name, admin_password, admin_role, faculty_id) VALUES('amitadmin', 'amit12345','facultyadmin','03a2df6a-1bbf-4f1b-8a50-7b4d6a684d4c');
INSERT INTO systemadmins(admin_name, admin_password, admin_role, university_id) VALUES('nuuadmin', 'nuu12345','universityadmin', '9498c039-b2c9-493a-8ad2-5f80b5f7efcf');


INSERT INTO mix(course_id, direction_id, education_id, group_id) VALUES('adced45f-6c9d-448b-b991-b85c54fd8089','fe2eb32a-e07d-40d2-8603-fb54ff847700','dbc73b45-8f20-4df1-a07e-319be66c33dd','0222873e-7aea-49fc-b579-0f9d8d4cc1da'),
 ('adced45f-6c9d-448b-b991-b85c54fd8089','fe2eb32a-e07d-40d2-8603-fb54ff847700','dbc73b45-8f20-4df1-a07e-319be66c33dd','fe04b37c-7538-41a5-a590-d91884a8011e'),
 ('adced45f-6c9d-448b-b991-b85c54fd8089','fe2eb32a-e07d-40d2-8603-fb54ff847700','de43e40e-6f32-4271-b1d9-a32698cbb07a','c04c8101-9e33-4aba-bd14-fc21ec4b68e5'),
 ('adced45f-6c9d-448b-b991-b85c54fd8089','fe2eb32a-e07d-40d2-8603-fb54ff847700','de43e40e-6f32-4271-b1d9-a32698cbb07a','f8b98ce8-8ee1-4fcc-a4a8-88ee1d3c61e4');