import React, { useState } from 'react';
import { Card, Title, Select, SelectItem, Button, NumberInput } from '@tremor/react';
import { Plus, Trash2 } from 'lucide-react';

interface Rule {
  id: string;
  action: 'Enter Long' | 'Exit Long' | 'Enter Short' | 'Exit Short';
  factor1Type: string;
  factor1Value: string;
  condition: string;
  factor2Type: string;
  factor2Value: string;
}

export const CustomStrategyBuilder = () => {
  const [rules, setRules] = useState<Rule[]>([]);

  const actions = [
    'Enter Long',
    'Exit Long',
    'Enter Short',
    'Exit Short',
    'Close & go Short',
    'Cover & go Long',
    'Liquidate'
  ];

  const factors = [
    'Market Order',
    'Stop Order',
    'Limit Order',
    'Close',
    'Open',
    'High',
    'Low',
    'Volume',
    'Entry Price',
    'Max Profit',
    'Max Loss'
  ];

  const conditions = [
    'crosses above',
    'crosses below',
    'is greater than',
    'is less than',
    'is equal to',
    'is not equal to'
  ];

  const addRule = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      action: 'Enter Long',
      factor1Type: 'Market Order',
      factor1Value: '',
      condition: 'crosses above',
      factor2Type: 'Open',
      factor2Value: ''
    };
    setRules([...rules, newRule]);
  };

  return (
    <Card>
      <Title>Custom Strategy Builder</Title>
      <div className="mt-6 space-y-6">
        {rules.map((rule) => (
          <div key={rule.id} className="p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="grid grid-cols-7 gap-4">
              <Select value={rule.action} onChange={(e) => {/* Update rule */}}>
                {actions.map((action) => (
                  <SelectItem key={action} value={action}>
                    {action}
                  </SelectItem>
                ))}
              </Select>

              <Select value={rule.factor1Type} onChange={(e) => {/* Update rule */}}>
                {factors.map((factor) => (
                  <SelectItem key={factor} value={factor}>
                    {factor}
                  </SelectItem>
                ))}
              </Select>

              <Select value={rule.condition} onChange={(e) => {/* Update rule */}}>
                {conditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </Select>

              <Select value={rule.factor2Type} onChange={(e) => {/* Update rule */}}>
                {factors.map((factor) => (
                  <SelectItem key={factor} value={factor}>
                    {factor}
                  </SelectItem>
                ))}
              </Select>

              <NumberInput
                value={rule.factor2Value}
                onChange={(e) => {/* Update rule */}}
                placeholder="Value"
              />

              <Button
                variant="secondary"
                color="red"
                onClick={() => {/* Remove rule */}}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}

        <Button
          variant="secondary"
          icon={Plus}
          onClick={addRule}
        >
          Add Rule
        </Button>
      </div>
    </Card>
  );
};