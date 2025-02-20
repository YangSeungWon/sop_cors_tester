import { TestCase, TestType } from '@/types/cors';
import { testXHR, testImage, testIframe } from '@/utils/cors-tests';

interface Props {
  cases: TestCase[];
  selectedType: TestType['id'];
  onRunTest: (testId: string, result: any) => void;
}

export default function TestCaseList({ cases, selectedType, onRunTest }: Props) {
  const runTest = async (testCase: TestCase) => {
    const url = testCase.urls[selectedType];
    let result;
    
    switch (selectedType) {
      case 'xhr':
        result = await testXHR(url);
        break;
      case 'image':
        result = await testImage(url);
        break;
      case 'iframe':
        result = await testIframe(url);
        break;
    }
    
    onRunTest(testCase.id, result);
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
    <div className="grid gap-6 md:grid-cols-2">
      {cases.map(testCase => (
        <div 
          key={testCase.id}
          className={`mui-paper p-6 transition-all duration-200
            ${testCase.result?.success 
              ? 'bg-success/5 border border-success/20' 
              : testCase.result 
                ? 'bg-error/5 border border-error/20'
                : ''
            }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800">{testCase.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{testCase.description}</p>
            </div>
            <button
              onClick={() => runTest(testCase)}
              className="mui-button-primary text-sm"
            >
              Run Test
            </button>
          </div>

          <div className="text-sm">
            <div className="bg-gray-50 rounded-md p-3 font-mono break-all border border-gray-100">
              {testCase.urls[selectedType]}
            </div>
          </div>

          {testCase.result && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className={`font-medium ${
                testCase.result.success ? 'text-success' : 'text-error'
              }`}>
                {testCase.result.message}
              </div>
              {testCase.result.details && (
                <pre className="mt-3 p-4 bg-gray-50 rounded-md text-xs overflow-auto border border-gray-100">
                  {testCase.result.details}
                </pre>
              )}
              {renderContent(testCase.result, selectedType)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 