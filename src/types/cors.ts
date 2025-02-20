export interface TestResult {
  success: boolean;
  message: string;
  details?: string;
  content?: string;
}

export interface TestCase {
  id: string;
  name: string;
  description: string;
  urls: {
    xhr: string;
    image: string;
    iframe: string;
  };
  result?: TestResult;
}

export interface TestType {
  id: 'xhr' | 'image' | 'iframe';
  name: string;
  description: string;
} 