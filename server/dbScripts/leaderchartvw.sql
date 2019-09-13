create or replace view leaderchartvw as
select lvw.totalScore, sco.gameId, sco.weekTotalScore, ca.name, lvw.uid, sch.gameDate
  from (
	  select ca.uid, ca.name,  (sum(sco.weekTotalScore)) totalScore
	    from scores sco
	    join customers_auth ca on ca.uid = sco.uid
	  group by sco.uid
  ) lvw
  join customers_auth ca on ca.uid = lvw.uid
  join scores sco on lvw.uid = sco.uid
  join schedule sch on sco.gameId = sch.id
where sch.gameDate <= sysdate()
;
