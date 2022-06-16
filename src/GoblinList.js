import React from 'react';
import Goblin from './Goblin';

export default function GoblinList({ visibleGoblins, handleDeleteGoblin }) {
  return (
    <div className='goblin-list quarter'>
      
      {
        visibleGoblins.map((goblin, i) => <Goblin handleDeleteGoblin={handleDeleteGoblin}
          key={goblin.name + i} goblin={goblin} />)

      }
    </div>
  );
}

