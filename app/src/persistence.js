// persistence.js

const persistEscrow = async (escrow) => {
    try {

      // Send the escrow to the Node.js server
      const response = await fetch('http://localhost:3001/api/escrows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(escrow),
      });
  
      if (response.ok) {
        console.log('Escrow successfully saved on the server.');
      } else {
        console.error('Error saving escrow on the server.');
      }
    } catch (error) {
      console.error('Error communicating with the server:', error.message);
    }
  };
  
const fetchEscrows = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/escrows');
      if (response.ok) {
        const escrows = await response.json();
        return escrows;
      } else {
        console.error('Error fetching escrows from the server.');
        return [];
      }
    } catch (error) {
      console.error('Error communicating with the server:', error.message);
      return [];
    }
  };
    
  export { persistEscrow, fetchEscrows };
  