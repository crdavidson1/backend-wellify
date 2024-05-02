CREATE SCHEMA wellify;

DROP TABLE IF EXISTS wellify.customers;

CREATE TABLE wellify.customers (
    id SERIAL PRIMARY KEY,
    title  varchar(40),
    customer_name varchar(455),
    address1  varchar(100) NOT NULL,
    address2 varchar(100),
    postcode varchar(10) NOT NULL,
    country varchar(30) NOT NULL
);

CREATE TABLE wellify.events (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES wellify.customers(id),
    event_type varchar(30) NOT NULL,
    event_time TIMESTAMP DEFAULT NOW() 
);

INSERT INTO wellify.customers VALUES

(1, 'Cardinal','Tom B. Erichsen','Skagen 21','Stavanger','4006','Norway'),
(2, 'Wilman Kala','Matti Karttunen','Keskuskatu 45','Helsinki','21240','Finland');

INSERT INTO wellify.events VALUES

(1, 1,'eye distance'),
(2, 2, 'slough'),
(3, 2, 'look away');