import { TestType } from '@/types/cors';

interface Props {
  types: TestType[];
  selected: TestType['id'];
  onChange: (type: TestType['id']) => void;
}

export default function TestTypeSelector({ types, selected, onChange }: Props) {
  return (
    <div className="mui-paper p-6 mb-8">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Select Test Type</h2>
      <div className="flex flex-wrap gap-4">
        {types.map(type => (
          <button
            key={type.id}
            onClick={() => onChange(type.id)}
            className={`relative p-4 rounded-lg transition-all duration-200
              ${selected === type.id 
                ? 'bg-primary text-white shadow-mui' 
                : 'bg-white text-gray-700 shadow-mui-sm hover:shadow-mui hover:bg-gray-50'
              }`}
          >
            <div className="text-sm font-medium">{type.name}</div>
            <div className="text-xs mt-1 opacity-80 max-w-[200px]">{type.description}</div>
            {selected === type.id && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full 
                            shadow-[0_0_0_2px_white]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
} 