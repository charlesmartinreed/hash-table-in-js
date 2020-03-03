//   we create a hash function to convert a key into a number

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
  table = new Array(3);

  //   commonly, the closer you get to 1 with your loadfactor, the more likely you are to need to increase your table size
  numItems = 0;

  //   resize triggered when table is 80% full, minimum
  resize = () => {
    const newTable = new Array(this.table.length * 2);

    // rehash the items
    this.table.forEach(item => {
      if (item) {
        item.forEach(([key, value]) => {
          const idx = hashStringToInt(key, newTable.length);
          if (newTable[idx]) {
            newTable[idx].push([key, value]);
          } else {
            newTable[idx] = [[key, value]];
          }
        });
      }
    });

    this.table = newTable;
  };

  setItem = (key, value) => {
    this.numItems++;
    // e.g person[firstName] = 'bob'
    const idx = hashStringToInt(key, this.table.length);

    const loadFactor = this.numItems / this.table.length;

    if (loadFactor > 0.8) {
      // here is where you'd resize
      this.resize();
    }

    if (this.table[idx]) {
      // if already value at position...
      this.table[idx].push([key, value]);
    } else {
      // we store as an array of key/value pairs to correct against collisions from our table not being appropriately sized

      this.table[idx] = [[key, value]];
    }
  };

  getItem = key => {
    const idx = hashStringToInt(key, this.table.length);
    if (!this.table[idx]) {
      return null;
    }

    //   return the value for a given key
    return this.table[idx].find(x => x[0] === key)[1];
  };
}

const myTable = new HashTable();
myTable.setItem("firstName", "bob");
myTable.setItem("lastName", "jones");
myTable.setItem("age", 32);
myTable.setItem("dob", "3/5/87");
myTable.setItem("location", "Chicago");

console.log(myTable.table.length);

console.log(myTable.getItem("firstName"));
console.log(myTable.getItem("lastName"));
console.log(myTable.getItem("age"));
console.log(myTable.getItem("dob"));
