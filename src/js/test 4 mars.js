a = 5625
b = -16875
c = 12600
counter = 0

start = time.time()
for d in range(-a, a + 1):
    if d != 0:
        for e in range(-c, c + 1):
            if ((e != 0) and (d * (c / e) + e * (a / d) == b)
                    and int(c / e) == c / e and int(a / d) == a / d):
                counter += 1
                print("Sol." + str(counter))
                print(d, e)
                print(int(a / d), int(c / e))
                print()
if counter == 0:
    print("No solution found.")
else:
    print(str(counter) + " solutions found.")
print("Time elapsed: " + str(time.time() - start))
