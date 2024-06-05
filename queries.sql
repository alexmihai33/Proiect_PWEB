-- Database: Fitness

-- DROP DATABASE IF EXISTS "Fitness";

CREATE DATABASE "Fitness"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Romanian_Romania.1250'
    LC_CTYPE = 'Romanian_Romania.1250'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Table: public.exercises

-- DROP TABLE IF EXISTS public.exercises;

CREATE TABLE IF NOT EXISTS public.exercises
(
    id integer NOT NULL DEFAULT nextval('exercises_id_seq'::regclass),
    exercise_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    exercise_day character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT exercises_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.exercises
    OWNER to postgres;


-- Table: public.meals

-- DROP TABLE IF EXISTS public.meals;

CREATE TABLE IF NOT EXISTS public.meals
(
    id integer NOT NULL DEFAULT nextval('meals_id_seq'::regclass),
    food_name character varying(100) COLLATE pg_catalog."default",
    calories integer,
    protein integer,
    fat integer,
    carbs integer,
    email character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT meals_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.meals
    OWNER to postgres;


-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default",
    nume character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;


-- Table: public.workouts

-- DROP TABLE IF EXISTS public.workouts;

CREATE TABLE IF NOT EXISTS public.workouts
(
    id integer NOT NULL DEFAULT nextval('workouts_id_seq'::regclass),
    exercise_name character varying(100) COLLATE pg_catalog."default",
    weight integer,
    reps integer,
    email character varying(100) COLLATE pg_catalog."default",
    exercise_day character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT workouts_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.workouts
    OWNER to postgres;
