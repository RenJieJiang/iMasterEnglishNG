export default interface IWordDto {
  word: string | undefined;
  frequency: number | undefined;
  phoneticSymbol: string | undefined;
  definition: string | undefined;
  synonym: string | undefined;
  antonym: string | undefined;
  remarks: string | undefined;
  grantedPermissions: string[] | undefined;
  id: number;
}
