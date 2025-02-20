import { useState, useEffect } from 'react';
import { TestType, TestResult } from '@/types/cors';
import { testXHR, testImage, testIframe } from '@/utils/cors-tests';

interface Props {
  testType: TestType['id'];
  currentOrigin: string;
}

export default function CustomUrlTester({ testType, currentOrigin }: Props) {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<TestResult | null>(null);

  // 테스트 타입이 변경될 때 결과 초기화
  useEffect(() => {
    setResult(null);
  }, [testType]);

  const runTest = async () => {
    if (!url) return;

    let testResult;
    switch (testType) {
      case 'xhr':
        testResult = await testXHR(url);
        break;
      case 'image':
        testResult = await testImage(url);
        break;
      case 'iframe':
        testResult = await testIframe(url);
        break;
    }

    setResult(testResult);
  };

  const renderContent = (result: TestResult, type: TestType['id']) => {
    if (!result.content) return null;

    switch (type) {
      case 'xhr':
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Response Data:</h4>
            <pre className="text-xs overflow-auto whitespace-pre-wrap text-gray-600">
              {typeof result.content === 'string'
                ? result.content.slice(0, 500) + (result.content.length > 500 ? '...' : '')
                : JSON.stringify(result.content, null, 2)}
            </pre>
          </div>
        );
      case 'image':
        return (
          <div className="mt-4 p-2 bg-gray-50 rounded-md border border-gray-100">
            <img
              src={result.content}
              alt="Test result"
              className="max-h-32 rounded mx-auto"
            />
          </div>
        );
      case 'iframe':
        return (
          <div className="mt-4 border rounded-md overflow-hidden">
            <iframe
              src={result.content}
              className="w-full h-32"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mui-paper p-6">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Custom URL Test</h2>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={`Enter a URL to test`}
            className="mui-input"
          />
        </div>

        <button
          onClick={runTest}
          disabled={!url}
          className="mui-button-primary"
        >
          Test URL
        </button>

        {result && (
          <div className="mt-4">
            <div className={`font-medium ${result.success ? 'text-success' : 'text-error'
              }`}>
              {result.message}
            </div>
            {result.details && (
              <pre className="mt-3 p-4 bg-gray-50 rounded-md text-xs overflow-auto border border-gray-100">
                {result.details}
              </pre>
            )}
            {renderContent(result, testType)}
          </div>
        )}
      </div>
    </div>
  );
} 