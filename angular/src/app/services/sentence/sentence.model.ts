import ISentenceDto from './sentence.interface';

export default class SentenceDto implements ISentenceDto {
  sentence: string | undefined;
  difficulty: number | undefined;
  word: string | undefined;
  translate: string | undefined;
  remarks: string | undefined;
  grantedPermissions: string[] | undefined;
  FormattedCreationTime: string | undefined;
  id: number;

  constructor(data?: ISentenceDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
          this.sentence = data["sentence"];
          this.difficulty = data["difficulty"];
          this.word = data["word"];
          this.translate = data["translate"];
          this.remarks = data["remarks"];
          if (Array.isArray(data["grantedPermissions"])) {
              this.grantedPermissions = [] as any;
              for (let item of data["grantedPermissions"])
                  this.grantedPermissions.push(item);
          }
          this.id = data["id"];
      }
  }

  static fromJS(data: any): SentenceDto {
    console.log('entered fromJS');
      data = typeof data === 'object' ? data : {};
      let result = new SentenceDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
    console.log('entered toJSON');
      data = typeof data === 'object' ? data : {};
      data["sentence"] = this.sentence;
      data["sentence"] = this.sentence;
      data["difficulty"] = this.difficulty;
      data["word"] = this.word;
      data["translate"] = this.translate;
      data["remarks"] = this.remarks;
      if (Array.isArray(this.grantedPermissions)) {
          data["grantedPermissions"] = [];
          for (let item of this.grantedPermissions)
              data["grantedPermissions"].push(item);
      }
      data["id"] = this.id;
      return data;
  }

  clone(): SentenceDto {
    console.log('entered clone');
      const json = this.toJSON();
      let result = new SentenceDto();
      result.init(json);
      return result;
  }
}
