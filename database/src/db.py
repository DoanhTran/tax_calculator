
import os
import json
import sqlite3
import time
import subprocess


def acrow(row, col):
    rerow = {}
    for r in range(len(col)):
        # print(col[r])
        # print(row[r])
        rerow[col[r]] = row[r]

    return rerow


def pcursor(cursor, col):
    # print("in func")
    relist = []
    for row in cursor:
        relist.append(acrow(row, col))
    return relist


def singleton(cls):
    instances = {}

    def getinstance():
        if cls not in instances:
            instances[cls] = cls()
        return instances[cls]
    return getinstance


class DatabaseDriver(object):
    """
    Database driver for the Task app.
    Handles with reading and writing data with the database.
    """

    def __init__(self):
        # connect to db
        self.conn = sqlite3.connect("tax.db", check_same_thread=False)
        self.import_tax_table()
        self.create_report_table()

    def import_tax_table(self):
        try:
            # self.conn.execute("""
            #     .mode csv;
            #     .import ../TAXRATES_ZIP5/combined_csv.csv taxdata;
            #     """)
            result = subprocess.run(['sqlite3',
                                     'tax.db',
                                     '-cmd',
                                     '.mode csv',
                                     '.import ./combined_csv.csv taxdata'])
            # print(result)

        except Exception as e:
            print("error")
            print(e)

    def get_tax_info(self, zip):
        cursor = self.conn.execute(
            'SELECT TaxRegionName, EstimatedCombinedRate FROM taxdata WHERE ZipCode =?', (zip,))
        for row in cursor:
            dat = acrow(row, ('TaxRegionName', 'EstimatedCombinedRate'))
            return dat
        return None

    def create_report_table(self):
        try:
            self.conn.execute("""
                
                CREATE TABLE problem_report (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    time_stamp REAL,
                    email TEXT,
                    title TEXT,
                    message TEXT,
                    processed,
                    solution TEXT
                );
            """)
        except Exception as e:
            print(e)

    def add_report(self, title, message, email):
        cursor = self.conn.cursor()
        cursor.execute(
            'INSERT INTO problem_report (time_stamp, email, title, message, processed, solution) VALUES (?, ?, ?, ?, ?, ?)', (time.time(), email, title, message, False, None))
        self.conn.commit()
        return cursor.lastrowid

    def get_all_report(self):
        cursor = self.conn.execute(
            'SELECT * FROM problem_report')
        for row in cursor:
            dat = acrow(row, ('time_stamp', 'title', 'processed'))
            return dat
        return None

    def get_report_by_id(self, id):
        cursor = self.conn.execute(
            'SELECT * FROM problem_report WHERE id =?', (id,))
        # print(cursor)
        for row in cursor:
            # print(row)
            dat = acrow(row, ('id', 'time_stamp', 'email',
                              'title', 'message', 'processed', 'solution'))

            return dat
        return None

    def get_latest_report(self, number):
        query = 'SELECT * FROM problem_report ORDER BY time_stamp DESC LIMIT ' + \
            str(number)
        cursor = self.conn.execute(query)
        for row in cursor:
            dat = acrow(row, ('id', 'time_stamp', 'title',
                              'email', 'processed', 'message, solution'))
            return dat
        return None

        # later might be better to make association table with one to many relationship for updating process with the report
        # and solution might not be an accurate name

    def update_report(self, report_id, processed, solution):
        self.conn.execute(
            'UPDATE problem_report SET processed =? solution =? WHERE id =?', (processed, solution, report_id))
        self.conn.commit()
