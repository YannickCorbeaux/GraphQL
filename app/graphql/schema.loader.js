// Comme on a décider de séparer les préoccupations, on doit récupérer le contenu texte du fichier
// gql  créer.

// On peut le faire de la même façon que la technique d'import JSON avec les ESM
import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';

const schemaFiles = ['restaurant', 'city', 'manager', 'cooking-style', 'query', 'mutation'];

const promises = schemaFiles.map((file) => readFile(
  new URL(`./schemas/${file}.gql`, import.meta.url),
  'utf-8',
));

const schemaFilesContent = await Promise.all(promises);

export default `
  #graphql
  ${schemaFilesContent.join(EOL)}
`;

/*
export default await readFile(
  new URL('./schemas/index.gql', import.meta.url),
  'utf-8',
);
*/
