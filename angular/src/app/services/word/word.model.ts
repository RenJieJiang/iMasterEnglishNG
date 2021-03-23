import IWordDto from './word.interface';

export default class WordDto implements IWordDto {
  word: string | undefined;
  frequency: number | undefined;
  phoneticSymbol: string | undefined;
  definition: string | undefined;
  synonym: string | undefined;
  antonym: string | undefined;
  remarks: string | undefined;
  grantedPermissions: string[] | undefined;
  createdDate: string | undefined;
  id: number;

  constructor(data?: IWordDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
          this.word = data["word"];
          this.frequency = data["frequency"];
          this.phoneticSymbol = data["phoneticSymbol"];
          this.definition = data["definition"];
          this.synonym = data["synonym"];
          this.antonym = data["antonym"];
          this.remarks = data["remarks"];
          if (Array.isArray(data["grantedPermissions"])) {
              this.grantedPermissions = [] as any;
              for (let item of data["grantedPermissions"])
                  this.grantedPermissions.push(item);
          }
          this.id = data["id"];
      }
  }

  static fromJS(data: any): WordDto {
    console.log('entered fromJS');
      data = typeof data === 'object' ? data : {};
      let result = new WordDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
    console.log('entered toJSON');
      data = typeof data === 'object' ? data : {};
      data["word"] = this.word;
      data["frequency"] = this.frequency;
      data["phoneticSymbol"] = this.phoneticSymbol;
      data["definition"] = this.definition;
      data["synonym"] = this.synonym;
      data["antonym"] = this.antonym;
      data["remarks"] = this.remarks;
      if (Array.isArray(this.grantedPermissions)) {
          data["grantedPermissions"] = [];
          for (let item of this.grantedPermissions)
              data["grantedPermissions"].push(item);
      }
      data["id"] = this.id;
      return data;
  }

  clone(): WordDto {
    console.log('entered clone');
      const json = this.toJSON();
      let result = new WordDto();
      result.init(json);
      return result;
  }
}
