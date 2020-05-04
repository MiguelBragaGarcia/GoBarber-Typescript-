declare module '*.svg' {
  const content: string;
  export default content;
}
/**
 * Caso o typescript não seja capaz de reconhecer o  formato svg
 * adicione esse código em um arquivo custom.d.ts
 */
