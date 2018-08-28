ALTER TABLE `football`.`scores`
  ADD COLUMN `weekCheatingPenalty` INT(11) NOT NULL DEFAULT '0' AFTER `updated`;
