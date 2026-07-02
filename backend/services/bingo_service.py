import json
import random
import hashlib

def get_column_ranges(number_range=75):
    if number_range == 90:
        return {
            'B': (1, 18),
            'I': (19, 36),
            'N': (37, 54),
            'G': (55, 72),
            'O': (73, 90)
        }
    # Default 1-75
    return {
        'B': (1, 15),
        'I': (16, 30),
        'N': (31, 45),
        'G': (46, 60),
        'O': (61, 75)
    }

def generate_grid(number_range=75):
    ranges = get_column_ranges(number_range)
    grid = {}
    for col, (start, end) in ranges.items():
        pool = list(range(start, end + 1))
        # Pick 5 unique numbers, sort them
        picked = sorted(random.sample(pool, 5))
        if col == 'N':
            # Replace center with FREE
            picked[2] = 'FREE'
        grid[col] = picked
    return grid

def generate_card_grids(number_range=75):
    # A card consists of 4 independent grids
    return [generate_grid(number_range) for _ in range(4)]

def calculate_card_hash(grids):
    # Serialize in a stable way
    serialized = json.dumps(grids, sort_keys=True)
    return hashlib.sha256(serialized.encode('utf-8')).hexdigest()
