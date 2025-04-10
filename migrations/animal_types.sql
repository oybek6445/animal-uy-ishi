CREATE TABLE animal_types (
    id SERIAL PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL
);

ALTER TABLE animals ADD type_id INTEGER;
ALTER TABLE animals ADD CONSTRAINT fk_animal_type FOREIGN KEY (type_id) REFERENCES animal_types(id);

INSERT INTO animal_types (type_name) VALUES 
('mammal'),
('bird'),
('reptile'),
('fish'),
('amphibian');

UPDATE animals SET type_id = 1 WHERE id IN (1, 2, 3); 
UPDATE animals SET type_id = 2 WHERE id IN (4, 5);
UPDATE animals SET type_id = 3 WHERE id = 6; 
