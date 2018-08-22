CREATE TABLE `football`.`schedule` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `week` INT NOT NULL,
  `opponent` VARCHAR(64) GENERATED ALWAYS AS (''),
  `location` VARCHAR(64) GENERATED ALWAYS AS (''),
  `homeoraway` INT NULL,
  `byuScore` INT NULL,
  `oppScore` INT NULL,
  `gameDate` DATETIME NOT NULL,
  `closeDate` DATETIME NOT NULL,
  `showUntilDate` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
