import sqlite3

conn = sqlite3.connect("books.sqlite")

cursor = conn.cursor()
sql_query = """ CREATE TABLE book (
    "id"	INTEGER NOT NULL UNIQUE,
	"author"	text NOT NULL,
	"language"	text NOT NULL,
	"title"	text NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
)"""
cursor.execute(sql_query)