CREATE TABLE `football`.`schedule` (
  `id` INT NOT NULL,
  `week` INT NOT NULL,
  `oponent` VARCHAR(64) NULL DEFAULT '',
  `location` VARCHAR(64) NULL DEFAULT '',
  `homeoraway` INT NULL DEFAULT 0,
  `byuScore` INT NULL DEFAULT 0,
  `oppScore` INT NULL DEFAULT 0,
  `gameDate` DATETIME NOT NULL,
  `closeDate` DATETIME NOT NULL,
  `showUntilDate` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));
