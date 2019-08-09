CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `week` int(11) NOT NULL,
  `opponent` varchar(64) NOT NULL DEFAULT '',
  `location` varchar(64) NOT NULL DEFAULT '',
  `stadiumName` varchar(64) NOT NULL DEFAULT '',
  `homeoraway` int(11) DEFAULT '0',
  `byuScore` int(11) DEFAULT '0',
  `oppScore` int(11) DEFAULT '0',
  `gameDate` datetime NOT NULL,
  `closeDate` datetime NOT NULL,
  `showUntilDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);
