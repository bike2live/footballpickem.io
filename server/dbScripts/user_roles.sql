CREATE TABLE `user_roles` (
  `roleId` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`roleId`),
  KEY `FK_userID_idx` (`uid`),
  CONSTRAINT `FK_userID` FOREIGN KEY (`uid`) REFERENCES `customers_auth` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
