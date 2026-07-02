import time
from services.bingo_service import generate_card_grids, calculate_card_hash

def test_generation_uniqueness():
    print("===================================================")
    print("  TESTANDO UNICIDADE DE GERAÇÃO: 2000 CARTELAS")
    print("===================================================")
    
    quantity = 2000
    hashes = set()
    start_time = time.time()
    
    # Generate 2000 cards and check for duplicate hashes
    for i in range(quantity):
        grids = generate_card_grids(number_range=75)
        card_hash = calculate_card_hash(grids)
        
        if card_hash in hashes:
            print(f"COLISÃO ENCONTRADA na cartela {i+1}!")
            assert False, "Colisão de hash encontrada! Geração não é 100% única."
        hashes.add(card_hash)
        
    end_time = time.time()
    elapsed = end_time - start_time
    
    print("✓ Sucesso: 2000 cartelas geradas.")
    print(f"✓ Total de hashes únicos: {len(hashes)}")
    print(f"✓ Tempo decorrido: {elapsed:.3f} segundos ({(quantity/elapsed):.1f} cartelas/seg)")
    print("✓ Conclusão: Geração é 100% única e rápida!")
    print("===================================================")

if __name__ == '__main__':
    test_generation_uniqueness()
