import os
import json
import sqlite3
import csv
import glob
import pandas as pd
import subprocess

# path: string specifying path for the folder
# newfilename: string "something.csv"


def combine_csv(path, newfilename):
    os.chdir(path)
    extension = 'csv'
    all_filenames = [i for i in glob.glob('*.{}'.format(extension))]
    combined_csv = pd.concat([pd.read_csv(f) for f in all_filenames])
    combined_csv.to_csv(newfilename, index=False, encoding='utf-8-sig')

# create db


class DatabaseDriver(object):
    """
    Database driver for the Task app.
    Handles with reading and writing data with the database.
    """
    # string table name "somthing.db"

    def __init__(self):
        # sqlite3witll make a database
        self.conn = sqlite3.connect("tax.db", check_same_thread=False)
        self.import_tax_table()

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
                                     '.import ../TAXRATES_ZIP5/combined_csv.csv taxdata'])
            print(result)

        except Exception as e:
            print(e)

    def get_all_data(self):
        cursor = self.conn.execute('SELECT * FROM taxdata;')
        usersl = pcursor(cursor, ('State', 'ZipCode', 'TaxRegionName', 'StateRate', 'EstimatedCombinedRate',
                                  'EstimatedCountyRate', 'EstimatedCityRate', 'EstimatedSpecialRate', 'RiskLevel'))
        print(usersl)


def acrow(row, col):
    rerow = {}
    for r in range(len(col)):
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
