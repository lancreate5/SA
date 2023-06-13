from time import time

def brute_force(target):
    begin = time()

    # Solving...
    i = 0
    sum = 0
    while sum < target:
        i += 1
        sum += i

    print(f"[{(time() - begin):.7f}]", end=" ")
    return i

def divide_and_conquer(num):
    begin = time()

    # Solving...
    low = 1
    high = num
    while low <= high:
        mid = (low + high) // 2
        sum_to_n = (mid + 1)*mid // 2
        if(sum_to_n < num):
            low = mid + 1
        elif(sum_to_n > num):
            high = mid - 1
        else:
            print(f"[{(time() - begin):.7f}]", end=" ")
            return mid

    print(f"[{(time() - begin):.7f}]", end=" ")
    return low
    

def display_method_options():
    print("STRATEGY =========")
    print("1. Brute Force")
    print("2. Divide and Conquer")
    print("0. Back")

def method_menu(num):
    display_method_options()
    response = int(input("Choose the method to be used: "))

    if response == 1:
        for _ in range(10):
            print(brute_force(num))
    elif response == 2:
        for _ in range(10):
            print( divide_and_conquer(num))

def display_menu():
    print("MENUS ==========")
    print("1. Begin")
    print("0. Exit")
    
def main():
    response = 1
    while response != 0:
        display_menu()
        response = int(input("What to do? ")) % 2
        if response == 1: 
            num = int(input("How many profit you want to reach in a day? $"))
            method_menu(num)

if __name__ == "__main__":
    main()
