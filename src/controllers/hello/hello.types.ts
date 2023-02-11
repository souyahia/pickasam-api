export interface HelloResponse {
  message: string;
  date?: string;
}

export interface CustomHelloParams {
  name: string;
}

export enum HelloLang {
  ENGLISH = 'en',
  FRENCH = 'fr',
}

export interface CustomHelloRequestBody {
  lang: HelloLang;
  withDate?: boolean;
}
