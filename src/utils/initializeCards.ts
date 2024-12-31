import Card from '../models/Card';

export async function initializeCards() {
  const colors = ['Red', 'Blue', 'Green', 'Yellow'];
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const actions = ['Skip', 'Reverse', 'Draw Two'];
  const wilds = ['Wild', 'Wild Draw Four'];
  
  try {
    // Clear existing cards
    await Card.deleteMany({});
    
    // Add number cards
    for (const color of colors) {
      for (const number of numbers) {
        // Add two of each number except 0
        const count = number === '0' ? 1 : 2;
        for (let i = 0; i < count; i++) {
          await Card.create({
            cardName: `${color} ${number}`,
            color: color,
            value: number
          });
        }
      }
    }
    
    // Add action cards
    for (const color of colors) {
      for (const action of actions) {
        // Two of each action card per color
        for (let i = 0; i < 2; i++) {
          await Card.create({
            cardName: `${color} ${action}`,
            color: color,
            value: action
          });
        }
      }
    }
    
    // Add wild cards
    for (const wild of wilds) {
      // Four of each wild card
      for (let i = 0; i < 4; i++) {
        await Card.create({
          cardName: wild,
          color: 'Black',
          value: wild
        });
      }
    }
    
    console.log('Cards initialized successfully');
  } catch (error) {
    console.error('Error initializing cards:', error);
  }
}