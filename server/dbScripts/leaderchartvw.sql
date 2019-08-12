create or replace view leaderchartvw as
select sch.id gameId, sch.opponent, sco.uid, sco.weekTotalScore, ca.name, sch.gameDate, (sum(sco.weekTotalScore)) totalScore
  from schedule sch
  join scores sco on sco.gameId = sch.id
  join customers_auth ca on ca.uid = sco.uid
group by sch.id, sco.uid
;
