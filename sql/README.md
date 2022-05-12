# SQL Migrations

This is just a folder of SQL queries that should be run in order when setting up a new project. The
naming is based on date:

```
[4 digit year][2 digit month][2 digit day][1 sequence digit]_[friendly name].sql
```

For example:

```
202204201_initDb.sql
```

The queries should be able to be run in sequential order from oldest to newest and result in a
working SQL database for the project.
