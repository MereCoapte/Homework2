import sqlite3

conn = sqlite3.connect("notes.sqlite")

cursor = conn.cursor()
sql_query = """ CREATE TABLE note (
    "id"	INTEGER NOT NULL UNIQUE,
	"title"	text NOT NULL,
	"description"	text NOT NULL,
	"date"	text NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
)"""
cursor.execute(sql_query)