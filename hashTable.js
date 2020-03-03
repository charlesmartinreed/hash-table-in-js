function hashStringToInt(s, tableSize) {
  // prime numbers are preferably because they spready easily - both 17 and 13 are arbitrarily chosen, but the usage of primes in these positions is common
  let hash = 17;

  for (let i = 0; i < s.length; i++) {
    //   using the character code
    hash = (13 * hash * s.charCodeAt(i)) % tableSize;
  }

  return hash;
}

class HashTable {
  table = new Array(100);

  //   we create a hash function to convert a key into a number

  setItem = (key, value) => {
    // e.g person[firstName] = 'bob'
    const idx = hashStringToInt(key, this.table.length);
    this.table[idx] = value;
  };

  getItem = key => {
    const idx = hashStringToInt(key, this.table.length);

    //   return the value for a given key
    return this.table[idx];
  };
}

const myTable = new HashTable();
myTable.setItem("firstName", "bob");
myTable.getItem("firstName");
myTable.setItem("lastName", "jones");

console.log(myTable.getItem("firstName"));
console.log(myTable.getItem("lastName"));
