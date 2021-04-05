export default interface ISentenceDto {
  sentence: string | undefined;
  difficulty: number | undefined;
  word: string | undefined;
  translate: string | undefined;
  remarks: string | undefined;
  grantedPermissions: string[] | undefined;
  id: number;
}
