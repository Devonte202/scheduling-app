--
-- Creates a table for business entity users
--
CREATE TABLE business(
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   name VARCHAR(50) NOT NULL,
   email VARCHAR(50) UNIQUE NOT NULL,
   phone_number CHAR(11) NOT NULL,
   employee_address VARCHAR(50),
   profile_image_url VARCHAR(500) 
);
--
-- Creates a table for employee users belonging to business entities
--
CREATE TABLE employee(
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   business_id uuid REFERENCES business(id),
   first_name VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   email VARCHAR(50) UNIQUE NOT NULL,
   phone_number  char(11) NOT NULL,
   is_admin bool NOT NULL,
   password VARCHAR(100) NOT NULL,
   profile_image_url VARCHAR(500) 
);
--
-- Creates a table for visiting user entities
--
CREATE TABLE customer(
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   first_name VARCHAR(50)  NOT NULL,
   last_name VARCHAR(50)  NOT NULL,
   email VARCHAR(50) UNIQUE NOT NULL,
   phone_number char(11) NOT NULL 
);
--
-- Creates a schedule belonging to employees
--
CREATE TABLE schedule(
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   employee_id uuid REFERENCES employee(id),
   event_types char(11) NOT NULL 
);
--
-- Creates a table for timeslots belonging to schedules representing availability 
--
CREATE TABLE timeslot(
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   schedule_id uuid REFERENCES schedule(id),
   time_start TEXT NOT NULL,
   time_end TEXT NOT NULL,
   date_created timestamptz,
   recurring BOOLEAN NOT NULL,
   avail_days TEXT NOT NULL,
   timezone TEXT NOT NULL
);
--
-- Creates a table for exceptions to reccuring availibilities 
--
CREATE TABLE exceptions(
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   timeslot_id uuid REFERENCES timeslot(id),
   interval_start TIMESTAMPTZ,
   interval_end TIMESTAMPTZ
);
--
-- Creates a table for appointments created by customers reserving timeslots
--
CREATE TABLE appointment(
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   timeslot_id uuid REFERENCES timeslot(id),
   customer_id uuid REFERENCES customer(id),
   employee_id uuid REFERENCES employee(id),
   appt_time TIMESTAMPTZ NOT NULL,
   details VARCHAR(100),
   event_type VARCHAR(100),
   reserved BOOLEAN NOT NULL DEFAULT false,
   is_virtual BOOLEAN,
   appt_location VARCHAR(500)
);
