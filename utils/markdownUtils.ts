/**
 * Returns an array of values from code blocks (any matches that start and end with a ` symbol)
 * example result:
 *  ['fret wire | the metal strips on your fretboard',
 *  'action | distance from your fret wire to the string']
 * @param markdown
 */
export const getCodeBlocksFromMarkdown = (markdown: string) => {
  const codeBlocks = markdown.match(/`(.*?)`(?!`)/g);

  const codeSymbolStripped = codeBlocks?.map((codeBlock) => codeBlock.slice(1, -1));

  return codeSymbolStripped;
};
