import os
import sqlite3

DB_PATH = os.path.join(os.path.dirname(__file__), 'bingo.db')

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    # Create cards table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS cards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            card_number INTEGER UNIQUE,
            date_generated TEXT,
            number_range INTEGER,
            grid1 TEXT,
            grid2 TEXT,
            grid3 TEXT,
            grid4 TEXT,
            hash TEXT UNIQUE
        )
    ''')
    # Create settings table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    ''')
    conn.commit()
    conn.close()
