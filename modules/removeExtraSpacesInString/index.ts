function removeExtraSpacesInString(string: string) {
  return string.replace(/\s+/g, ' ').trim();
}

export default removeExtraSpacesInString;
