// This is here in order to find things that are in zip codes near the one the user is in.

function expandZipArea(zip) {
  const zips = [zip];

  for (let i = 1; i < 501; i++) {
    let addedZip = `${parseInt(zip) + i}`;
    let subtractedZip = `${parseInt(zip) - i}`;
    if (addedZip.length < 5) {
      for (let j = addedZip.length; j < 5; j++) {
        addedZip = `0${addedZip}`;
      }
    }
    if (subtractedZip.length < 5) {
      for (let j = subtractedZip.length; j < 5; j++) {
        subtractedZip = `0${subtractedZip}`;
      }
    }
    if (parseInt(addedZip) > 99950) {
      zips.push(subtractedZip);
      continue;
    }
    if (parseInt(subtractedZip) < 00001) {
      zips.push(addedZip);
      continue;
    }
    zips.push(addedZip);
    zips.push(subtractedZip);
  }

  return zips;
}

module.exports = expandZipArea;
