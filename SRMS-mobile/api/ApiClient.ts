import { HttpError } from "./HttpError";

type MakeRequestOptions = {
  method: "GET" | "HEAD" | "PUT" | "POST" | "DELETE" | "OPTIONS" | "TRACE" | "CONNECT" | "PATCH",
  headers: HeadersInit,
  body?: any,
  searchParams?: string[][] | Record<string, string> | string | URLSearchParams,
}


export class ApiClient {
  private scheme;
  private hostName ;
  private port;
  private baseUrl;

  constructor(
    scheme: "http" | "https",
    hostName: string, 
    port: number
  ) {
    this.scheme = scheme;
    this.hostName = hostName;
    this.port = port;
    this.baseUrl = `${this.scheme}://${this.hostName}:${this.port}`;
  }
  
  async makeRequest<T>(path: string, options: MakeRequestOptions): Promise<T> {
    const { method, headers, body, searchParams } = options;

    const searchParamsStr = (searchParams) ? `?${(new URLSearchParams(searchParams)).toString()}` : "";
    const url = `${path}${searchParamsStr}`;
    const fullUrl = new URL(url, this.baseUrl);
  
    try {
      const response = await fetch(fullUrl, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        const { message = "" } = (result) ?? {};
        throw new HttpError(`${response.status}. ${response.statusText}. ${message}.`, response.status);
      }

      return result;
    
    } catch (error) {
      throw error;
    }
  }
}