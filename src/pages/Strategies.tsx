import React from 'react';
import { CustomStrategyBuilder } from '../components/strategy/CustomStrategyBuilder';
import { StrategyVisualizer } from '../components/strategy/StrategyVisualizer';

export const Strategies = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Strategy Builder</h1>
      <CustomStrategyBuilder />
      <StrategyVisualizer 
        data={[]} 
        signals={[]}
      />
    </div>
  );
};