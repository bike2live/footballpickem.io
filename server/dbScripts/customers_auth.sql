CREATE TABLE `customers_auth` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `idp_id` varchar(64) NOT NULL,
  `photo` varchar(256) DEFAULT NULL COMMENT 'Url to a photo of the user. This is provided by google. By Facebook???',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
);
