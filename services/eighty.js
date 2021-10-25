function eightyChar(text, maxLength = 80) {
  const paragraph_words = text
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .reduce((paragraph_splits, p) => {
      return [
        ...paragraph_splits,
        p
          .split(" ")
          .map((word) => word.replace(/\s/g, ""))
          .filter((word) => word != ""),
      ];
    }, []);

  function spacer(spaces, additions) {
    let usedIndices = [];
    let newSpaces = spaces;
    while (additions > 0) {
      let increaseIndex = Math.floor(Math.random() * spaces.length);
      if (usedIndices.length == spaces.length) {
        usedIndices = [];
      }
      if (!usedIndices.includes(increaseIndex)) {
        usedIndices = [...usedIndices, increaseIndex];
        spaces[increaseIndex] += " ";
        additions -= 1;
      }
    }
    return newSpaces;
  }

  function justifier(split) {
    let phrases = [];
    let currentLength = 0;
    let currentPhrase = [];
    let currentSpacing = [];

    split.forEach((word) => {
      if (currentLength + currentSpacing.length + word.length > maxLength) {
        currentSpacing = currentSpacing.slice(0, -1);
        const spacing = spacer(
          currentSpacing,
          maxLength - currentLength - currentSpacing.length
        );
        spacing.forEach((sp, i) => {
          currentPhrase[i] += sp;
        });
        phrases.push(currentPhrase.join(""));

        currentLength = word.length;
        currentPhrase = [word];
        currentSpacing = [" "];
      } else {
        currentLength += word.length;
        currentPhrase = [...currentPhrase, word];
        currentSpacing.push(" ");
      }
    });
    phrases.push(currentPhrase.join(" "));

    return phrases;
  }

  let justified = paragraph_words.map((p) => justifier(p));
  let output = justified.map((lines) => lines.join("\n")).join("\n\n");

  return output;
}

module.exports = eightyChar;
