import './App.css';
import { useEffect, useState } from 'react';
import GoblinForm from './GoblinForm';
import GoblinList from './GoblinList';
import Goblin from './Goblin';
 
function App() {
  const [allGoblins, setAllGoblins] = useState([
    {
      name: 'terry',
      hp:'1000',
      color: 'green',   
    }
  ]);
  
  const [goblinFormName, setGoblinFormName] = useState('buck');
  const [goblinFormHP, setGoblinFormHP] = useState('12');
  const [goblinFormColor, setGoblinFormColor] = useState('blue');
  const [visibleGoblins, setVisibleGoblins] = useState(allGoblins);
  const [search, setSearch] = useState('');
    
  /* 
    track: 
      allGoblins, an array of all goblins
      visibleGoblins, a second array of goblins: this one is the filtered version of the above allGoblins array
      goblinFormName, which is how we track the user input for the current name of the goblin in the form
      goblinFormHP, which is how we track the user input for the current HP of the goblin in the form
      goblinFormColor, which is how we track the user input for the current color of the goblin in the form
*/
  
  function submitGoblin(e) {
    e.preventDefault();
    const newGoblin = {
      id: Math.floor((Math.random() * 5000) * (Math.random() * 5000)),
      name: goblinFormName,
      hp: goblinFormHP,
      color: goblinFormColor
    };

    setAllGoblins([...allGoblins, newGoblin]);
    setGoblinFormName('');
    setGoblinFormHP('');
    setGoblinFormColor('');

    
    // on submit, make a new goblin object with a name that comes from the form state, an hp that comes from the form state, and a color that comes from the form state

    // update the allGoblins array. Add the new goblin to the allGoblins array immutably.
    
    // clear out the goblin form state items by setting them to empty strings. This will cause the form to reset in the UI.
  }

  function handleDeleteGoblin(name) {
    const index = allGoblins.findIndex(goblin => goblin.name === name);
    allGoblins.splice(index, 1);
    setAllGoblins([...allGoblins]);
    // find the index of the goblin in allGoblins with this name

    // use splice to delete the goblin object at this index

    // update the allGoblins array immutably to this new, smaller array
  }

  function handleFilterGoblins(search) {
    setSearch(search);
    const updateGoblins = allGoblins.filter(goblin =>
      goblin.name.toLowerCase().includes(search.toLowerCase()));
    setVisibleGoblins(updateGoblins);
    // use the filter method to get an array of goblins whose name includes this search argument

    // if there is a search argument, set the visible goblins to the filtered goblins
    // if the search argument is undefined, set the visible goblins in state to just be the array of all goblins
  }
  useEffect(() => {
    setVisibleGoblins(allGoblins);
    setSearch('');
  }, [allGoblins]);


  return (
    <div className="App">
      <div className='current-goblin quarter'>
        <Goblin goblin={{
          name: goblinFormName,
          hp: goblinFormHP,
          color: goblinFormColor,
          /* 
            use the goblin form state to make a goblin object and to display it. 
            This will let the user see the current form state 
          */
        }}/>
      </div>
      <div className='goblin-filter quarter'>
        Filter Goblins
        {/* note that handleFilterGoblins is defined upstairs. This is where the allGoblins array gets filtered */}
        <input value={search} onChange={(e) => handleFilterGoblins(e.target.value)} />
      </div>
      <GoblinForm 
      
        submitGoblin={submitGoblin}
        goblinFormName={goblinFormName}
        setGoblinFormName={setGoblinFormName}
        goblinFormColor ={goblinFormColor}
        setGoblinFormColor={setGoblinFormColor}
        goblinFormHP={goblinFormHP}
        setGoblinFormHP={setGoblinFormHP}
        
      />
      <GoblinList 
        // this takes in an array of goblins. If the filteredGoblins has a length, use that array. Otherwise, use the allGoblins array 
        handleDeleteGoblin={handleDeleteGoblin}
        VisibleGoblins={visibleGoblins} // note that the goblin list has access to the ability to delete
      
      />
    </div>
  );
}

export default App;
