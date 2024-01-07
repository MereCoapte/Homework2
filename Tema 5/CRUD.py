import sqlite3, traceback, sys

def print_error(er):
    print('SQLite error: %s' % (' '.join(er.args)))
    print("Exception class is: ", er.__class__)
    print('SQLite traceback: ')
    exc_type, exc_value, exc_tb = sys.exc_info()
    print(traceback.format_exception(exc_type, exc_value, exc_tb))

def POST(id, title, description, time):
    conn = sqlite3.connect("notes.sqlite")
    cursor = conn.cursor()
    sql_query = "INSERT INTO note(id, title, description, date) VALUES (?, ?, ?, ?)"

    try:
        cursor.execute(sql_query, (id, title, description, time))
    except sqlite3.Error as er:
        print_error(er)
        print(f"INSERT INTO note(id, title, description, date) VALUES ({id}, {title}, {description}, {time})")
        cursor.close()
        conn.close()
        return ["", 500]
    conn.commit()
    cursor.close()
    conn.close()
    return ["", 200]

def GET(id = None):
    conn = sqlite3.connect("notes.sqlite")
    cursor = conn.cursor()
    sql_query: str
    if(id == None):
        sql_query = "SELECT * FROM note"
    else:
        sql_query = "SELECT * FROM note WHERE id = ?"

    try:
        if(id):
            cursor.execute(sql_query, (id, ))
        else:
            cursor.execute(sql_query)
    except sqlite3.Error as er:
        print_error(er)
        cursor.close()
        conn.close()
        return ["", 500]

    result = cursor.fetchall()
    print(result)

    cursor.close()
    conn.close()
    
    return [result, 200]

def PATCH(id, title, description):
    conn = sqlite3.connect("notes.sqlite")
    cursor = conn.cursor()
    sql_query = "UPDATE note SET title = ?, description = ? WHERE id = ?"
    print(id, title, description)

    try:
        cursor.execute(sql_query, (title, description, id))
    except sqlite3.Error as er:
        print_error(er)
        cursor.close()
        conn.close()
        return ["", 500]
    
    conn.commit()
    cursor.close()
    conn.close()
    return ["", 200]

def DELETE(id):
    conn = sqlite3.connect("notes.sqlite")
    cursor = conn.cursor()
    sql_query = "DELETE FROM note WHERE id = ?"
    print(id)

    try:
        cursor.execute(sql_query, (id, ))
    except sqlite3.Error as er:
        print_error(er)
        cursor.close()
        conn.close()
        return ["", 500]
    
    conn.commit()
    cursor.close()
    conn.close()
    return ["", 200]