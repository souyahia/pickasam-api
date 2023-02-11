import { Request, Response } from 'express';
import { CustomHelloParams, CustomHelloRequestBody, HelloLang, HelloResponse } from './hello.types';

function createCustomHello(lang: HelloLang, name: string): string {
  switch (lang) {
    case HelloLang.ENGLISH:
      return `Hello ${name}, how are you ?`;
    case HelloLang.FRENCH:
      return `Salut ${name}, comment vas-tu ?`;
    default:
      throw new Error(`Unknown language : ${lang as string}`);
  }
}

export function getHello(req: Request<never, HelloResponse>, res: Response<HelloResponse>): void {
  const helloResponse: HelloResponse = {
    message: 'Hello world!',
    date: new Date().toISOString(),
  };
  res.status(200).json(helloResponse);
}

// Custom hello route used to give example of uses for the async wraper, body parser, etc...
export async function getCustomHello(
  req: Request<CustomHelloParams, HelloResponse, CustomHelloRequestBody>,
  res: Response<HelloResponse>,
): Promise<void> {
  // We do this to "justify" the use of async
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  const { name } = req.params;

  const helloResponse: HelloResponse = {
    message: createCustomHello(req.body.lang, name),
  };
  if (req.body.withDate) {
    helloResponse.date = new Date().toISOString();
  }

  res.status(200).json(helloResponse);
}
