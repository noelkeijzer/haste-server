function incrementKey(iteration, keyspaceLength, currentKey) {
  if (currentKey[iteration] + 1 >= keyspaceLength) {
    currentKey[iteration] = 0;
    if (iteration >= 1) {
      return incrementKey(iteration - 1, keyspaceLength, currentKey);
    }
  } else {
    currentKey[iteration] +=+ 1;
    return currentKey;
  }
}


module.exports = class RandomKeyGenerator {
  // Initialize a new generator with the given keySpace
  constructor(options = {}) {
    this.keyspace = options.keyspace || 'ABC';
    //this.keyspace = options.keyspace || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  }

  // Generate a key of the given length
  createKey(keyLength, currentKey) {
    var text = '';

    for (var i = 0; i < keyLength; i++) {
      var charIndex;
      if(currentKey[i] === undefined) {
        currentKey[i] = 0;
      }
      charIndex = currentKey[i];
      if (i + 1 >= keyLength) {
        currentKey = incrementKey(i, this.keyspace.length, currentKey);
      }
      text += this.keyspace.charAt(charIndex);
    }

    return text;
  }
};
