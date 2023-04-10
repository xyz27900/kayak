import argparse
import csv
import os
import random

parser = argparse.ArgumentParser()
parser.add_argument('-f', '--file', type=str, required=True, help='path to the CSV file')
args = parser.parse_args()

if not os.path.isabs(args.file):
    args.file = os.path.join(os.getcwd(), args.file)

with open(args.file, 'r') as file:
    reader = csv.DictReader(file)
    names = list(reader)

unused_names = [name for name in names if name['used'] != 'True']

if not unused_names:
    raise ValueError('All names have been used')

chosen_name = random.choice(unused_names)
chosen_name['used'] = 'True'

with open(args.file, 'w', newline='') as file:
    fieldnames = ['name', 'used']
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(names)

print(chosen_name['name'])
