export abstract class ApiService<T> {
  protected _baseUrl: string;
  protected _headers: HeadersInit;

  constructor(baseUrl: string, token: string) {
    this._baseUrl = baseUrl;
    this._headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
  }

  getById?(id: number): Promise<T>;
  getAll?(): Promise<T[]>;
  create?(data: T): Promise<T>;
  update?(id: number, data: T): Promise<T>;
  delete?(id: number): Promise<void>;
}
