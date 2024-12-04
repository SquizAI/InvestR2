import React, { useState } from 'react';
import { Card, Title, Select, SelectItem, Button, NumberInput } from '@tremor/react';
import { Plus, Trash2 } from 'lucide-react';

interface Rule {
  id: string;
  indicator: string;
  condition: string;
  value: number;
  timeframe: number;
}

interface StrategyBuilderProps {
  onSave: (strategy: any) => void;
}

export const StrategyBuilder: React.FC<StrategyBuilderProps> = ({ onSave }) => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [name, setName] = useState('');

  const indicators = [
    { value: 'SMA', label: 'Simple Moving Average' },
    { value: 'RSI', label: 'Relative Strength Index' },
    { value: 'MACD', label: 'MACD' },
    { value: 'BB', label: 'Bollinger Bands' }
  ];

  const conditions = [
    { value: 'crosses_above', label: 'Crosses Above' },
    { value: 'crosses_below', label: 'Crosses Below' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' }
  ];

  const addRule = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      indicator: 'SMA',
      condition: 'crosses_above',
      value: 0,
      timeframe: 14
    };
    setRules([...rules, newRule]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const updateRule = (id: string, field: keyof Rule, value: any) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  const handleSave = () => {
    onSave({
      name,
      rules,
      created: new Date().toISOString()
    });
  };

  return (
    <Card>
      <Title>Strategy Builder</Title>
      <div className="mt-4 space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Strategy Name"
          className="w-full p-2 border rounded"
        />
        
        {rules.map((rule) => (
          <div key={rule.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Select
              value={rule.indicator}
              onValueChange={(value) => updateRule(rule.id, 'indicator', value)}
            >
              {indicators.map((ind) => (
                <SelectItem key={ind.value} value={ind.value}>
                  {ind.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              value={rule.condition}
              onValueChange={(value) => updateRule(rule.id, 'condition', value)}
            >
              {conditions.map((cond) => (
                <SelectItem key={cond.value} value={cond.value}>
                  {cond.label}
                </SelectItem>
              ))}
            </Select>

            <NumberInput
              value={rule.value}
              onValueChange={(value) => updateRule(rule.id, 'value', value)}
              placeholder="Value"
              min={0}
            />

            <NumberInput
              value={rule.timeframe}
              onValueChange={(value) => updateRule(rule.id, 'timeframe', value)}
              placeholder="Timeframe"
              min={1}
            />

            <Button
              variant="secondary"
              color="red"
              icon={Trash2}
              onClick={() => removeRule(rule.id)}
            >
              Remove
            </Button>
          </div>
        ))}

        <div className="flex justify-between">
          <Button
            variant="secondary"
            icon={Plus}
            onClick={addRule}
          >
            Add Rule
          </Button>

          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!name || rules.length === 0}
          >
            Save Strategy
          </Button>
        </div>
      </div>
    </Card>
  );
};