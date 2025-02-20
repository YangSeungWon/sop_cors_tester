import { useState, useEffect } from 'react';
import { TestCase, TestResult, TestType } from '@/types/cors';
import { TEST_TYPES, getDefaultTestCases } from '@/constants/cors';
import TestTypeSelector from '@/components/TestTypeSelector';
import TestCaseList from '@/components/TestCaseList';
import CustomUrlTester from '@/components/CustomUrlTester';
import Layout from '@/components/Layout';

export default function CORSTester() {
  const [currentOrigin, setCurrentOrigin] = useState('');
  const [selectedTestType, setSelectedTestType] = useState<TestType['id']>('xhr');
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  useEffect(() => {
    setCurrentOrigin(window.location.origin);
    setTestCases(getDefaultTestCases(window.location.origin));
  }, []);

  const updateTestResult = (testId: string, result: TestResult) => {
    setTestCases(prev => prev.map(test => 
      test.id === testId ? { ...test, result } : test
    ));
  };

  // 테스트 타입이 변경될 때 결과 초기화
  const handleTestTypeChange = (newType: TestType['id']) => {
    setSelectedTestType(newType);
    // 모든 테스트 케이스의 result를 undefined로 초기화
    setTestCases(prev => prev.map(test => ({ ...test, result: undefined })));
  };

  return (
    <Layout>
      <div className="space-y-8">
        <TestTypeSelector
          types={TEST_TYPES}
          selected={selectedTestType}
          onChange={handleTestTypeChange}
        />

        <TestCaseList
          cases={testCases}
          selectedType={selectedTestType}
          onRunTest={updateTestResult}
        />

        <CustomUrlTester
          testType={selectedTestType}
          currentOrigin={currentOrigin}
        />
      </div>
    </Layout>
  );
} 