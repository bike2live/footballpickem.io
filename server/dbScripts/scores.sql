CREATE TABLE `scores` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `gameId` int(11) NOT NULL,
  `byuScore` mediumint(9) NOT NULL DEFAULT '0',
  `oppScore` mediumint(9) NOT NULL DEFAULT '0',
  `delta` int(11) NOT NULL DEFAULT '0',
  `weekLowDiffBonus` int(11) NOT NULL DEFAULT '0',
  `weekExactDiffBonus` int(11) NOT NULL DEFAULT '0',
  `weekExactScoreBonus` int(11) NOT NULL DEFAULT '0',
  `weekTotalScore` int(11) NOT NULL DEFAULT '0',
  `weekHomerPenalty` int(11) NOT NULL DEFAULT '0',
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
)
