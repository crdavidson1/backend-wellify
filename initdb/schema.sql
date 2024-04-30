CREATE SCHEMA wellify;

 

DROP TABLE IF EXISTS wellify.customers;

 

CREATE TABLE wellify.customers (
title  varchar(40),
customer_name varchar(455),
address1  varchar(100) NOT NULL,

address2 varchar(100),

postcode varchar(10) NOT NULL,

country varchar(30) NOT NULL

);