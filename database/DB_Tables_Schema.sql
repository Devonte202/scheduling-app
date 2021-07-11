--
-- Creates a table for business entity users
--
CREATE TABLE business(
   id PRIMARY KEY uuid DEFAULT uuid_generate_v4(),
   name varchar(50) NOT NULL,
   email varchar(50) UNIQUE NOT NULL,
   phone_number char(11) NOT NULL,
   street_address varchar(50),
   state varchar(2),
   zip_code char(5),
   city varchar(50),
   profile_image_url varchar(500) 
);
--
-- Creates a table for employee users belonging to business entities
--
CREATE TABLE employee(
   id PRIMARY KEY uuid DEFAULT uuid_generate_v4(),
   business_id int REFERENCES business(id),
   first_name varchar(50) NOT NULL,
   last_name varchar(50) NOT NULL,
   email varchar(50) UNIQUE NOT NULL,
   phone_number  char(11) NOT NULL,
   is_admin bool NOT NULL,
   password varchar(100) NOT NULL,
   profile_image_url varchar(500) 
);
--
-- Creates a table for visiting user entities
--
CREATE TABLE customer(
   id PRIMARY KEY uuid DEFAULT uuid_generate_v4(),
   username varchar(50) NOT NULL,
   first_name varchar(50)  NOT NULL,
   last_name varchar(50)  NOT NULL,
   email varchar(50) UNIQUE NOT NULL,
   phone_number  char(11) NOT NULL,
   password varchar(100) NOT NULL,
   profile_image_url varchar(500) 
);

CREATE TABLE schedule(
   id PRIMARY KEY uuid DEFAULT uuid_generate_v4(),
   employee_id uuid REFERENCES employee(id),
   has_availability BOOLEAN NOT NULL DEFAULT true,
   available_days REFERENCES available_days(id),
   available_times REFERENCES available_times(id),
   event_types char(11) NOT NULL 
);

CREATE TABLE available_days(
   id PRIMARY KEY uuid DEFAULT uuid_generate_v4(),
   schedule_id uuid REFERENCES schedule(id)
   monday BOOLEAN NOT NULL DEFAULT true,
   tuesday BOOLEAN NOT NULL DEFAULT true,
   wednesday BOOLEAN NOT NULL DEFAULT true,
   thursday BOOLEAN NOT NULL DEFAULT true,
   friday BOOLEAN NOT NULL DEFAULT true,
   saturday BOOLEAN NOT NULL DEFAULT true,
   sunday BOOLEAN NOT NULL DEFAULT true
)

CREATE TABLE available_times(
   id PRIMARY KEY uuid DEFAULT uuid_generate_v4(),
   schedule_id uuid REFERENCES schedule(id),
   monday_start TIME NOT NULL,
   monday_end TIME NOT NULL,
   tuesday_start TIME NOT NULL,
   tuesday_end TIME NOT NULL,
   wednesday_start TIME NOT NULL,
   wednesday_end TIME NOT NULL,
   thursday_start TIME NOT NULL,
   thursday_end TIME NOT NULL,
   friday_start TIME NOT NULL,
   friday_end TIME NOT NULL,
   saturday_start TIME NOT NULL,
   saturday_end TIME NOT NULL,
   sunday_start TIME NOT NULL,
   sunday_end TIME NOT NULL
)

CREATE TABLE timeslot(
   id PRIMARY KEY uuid DEFAULT uuid_generate_v4(),
   schedule_id REFERENCES schedule(id),
   customer_id REFERENCES customer(id),
   employee_id REFERENCES employee(id),
   appointment TIMESTAMPTZ NOT NULL,
   description varchar(100),
   event_type varchar(100),
   accepted BOOLEAN NOT NULL DEFAULT false,
   street_address varchar(200),
   state varchar(2),
   zipcode int(5),
   city varchar(50),
   virtual_link varchar(200)
)