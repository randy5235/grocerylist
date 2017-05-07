CREATE TABLE users (
    id bigserial primary key,
    username varchar(255) NOT NULL,
    password varchar(60) NOT NULL,
    date_added timestamp without time zone default (now() at time zone 'utc')
);