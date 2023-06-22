import { useEffect, useState } from 'react'
import blueCandy from '../src/images/blue-candy.png'
import greenCandy from '../src/images/green-candy.png'
import orangeCandy from '../src/images/orange-candy.png'
import purpleCandy from '../src/images/purple-candy.png'
import redCandy from '../src/images/red-candy.png'
import yellowCandy from '../src/images/yellow-candy.png'
import blank from '../src/images/blank.png'

const width = 8
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy
]

function App() {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)



   // CHECK FOR COLUMN OF FOUR 
   const checkForColumnOfFour = () => {
    for(let i = 0; i <= 39; i++){
      // Get the column of four, (adding width to i grabs the one right below it, and grabbing width * 2 gets the one 2 below and so on)
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]

      // Grabbing the current loop color
      const decidedColor = currentColorArrangement[i]

      // Check and see if every square in columnOfFour mathces the decidedColor
      if(columnOfFour.every(square => currentColorArrangement[square] === decidedColor)){
        // Set to empty string, clear squares when there was a match
        columnOfFour.forEach(square => currentColorArrangement[square] = blank)

        return true
      }
    }
  }



  // CHECK FOR COLUMN OF THREE 
  const checkForColumnOfThree = () => {
    for(let i = 0; i <= 47; i++){
      // Get the column of three, (adding width to i grabs the one right below it, and grabbing width * 2 gets the one 2 below and so on)
      const columnOfThree = [i, i + width, i + width * 2]

      // Grabbing the current loop color
      const decidedColor = currentColorArrangement[i]

      // Check and see if every square in columnOfThree mathces the decidedColor
      if(columnOfThree.every(square => currentColorArrangement[square] === decidedColor)){

        // Set to empty string, clear squares when there was a match
        columnOfThree.forEach(square => currentColorArrangement[square] = blank)

        return true
      }
    }
  }


   // CHECK FOR ROW OF FOUR
   const checkForRowOfFour = () => {
    for(let i = 0; i < 64; i++){
      // Get the row of four
      const rowOfFour = [i, i + 1, i + 2, i + 3]

      // Grabbing the current loop color
      const decidedColor = currentColorArrangement[i]

      const notValid = [5, 6, 7 , 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

      if(notValid.includes(i)) continue

      // Check and see if every square in rowOfFour matches the decidedColor
      if(rowOfFour.every(square => currentColorArrangement[square] === decidedColor)){

        // Set to empty string, clear squares when there was a match
        rowOfFour.forEach(square => currentColorArrangement[square] = blank)

        return true
      }
    }
  }


   // CHECK FOR ROW OF THREE 
   const checkForRowOfThree = () => {
    for(let i = 0; i < 64; i++){
      // Get the row of three
      const rowOfThree = [i, i + 1, i + 2]

      // Grabbing the current loop color
      const decidedColor = currentColorArrangement[i]

      const notValid = [6, 7 , 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]

      if(notValid.includes(i)) continue

      // Check and see if every square in rowOfThree matches the decidedColor
      if(rowOfThree.every(square => currentColorArrangement[square] === decidedColor)){

        // Set to empty string, clear squares when there was a match
        rowOfThree.forEach(square => currentColorArrangement[square] = blank)

        return true
      }
    }
  }

  // MOVE TO SQUARE BELOW
  const moveIntoSquareBelow = () => {
    // Loop through all squares except the last row
    for(let i = 0; i <= 55; i++){

      // First row indexes
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]

      const isFirstRow = firstRow.includes(i)

      // Check if current loop is in first row, and check if current loop square is empty
      if (isFirstRow && currentColorArrangement[i] === blank){
        // Get a random number
        let randomNumber = Math.floor(Math.random() * candyColors.length)

        // Assing the current loop square to a random color from candyColors array
        currentColorArrangement[i] = candyColors[randomNumber]
      }

      // Check if the square under the current loop is empty
      if((currentColorArrangement[i + width]) === blank){

        // Assing the emtpy space below to the current loop
        currentColorArrangement[i + width] = currentColorArrangement[i]

        // Set current loop to empty string, because it is moving down
        currentColorArrangement[i] = blank
      }
    }
  }

  // DRAG START
  const dragStart = (e) => {
    console.log(e.target)
    console.log('drag start')
    setSquareBeingDragged(e.target)
  }

  const dragDrop = (e) => {
    console.log(e.target)
    console.log('drag drop')
    setSquareBeingReplaced(e.target)
  }

  const dragEnd = (e) => {
    console.log('drag end')

    // Get attribute data-id of squareBeingDragged
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    
    // Get attribute data-id of squareBeingReplaced
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    // Change the backgroundColor of the square in the squareBeingReplacedId index to the background of the squareBeingDragged
    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')

    // Change the backgroundColor of the square in the squareBeingDraggedId index to the background of the squareBeingReplaced
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)

    const isAColumnOfFour = checkForColumnOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfFour = checkForRowOfFour()
    const isARowOfThree = checkForRowOfThree()

    if(squareBeingReplacedId && validMove && ( isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfFour )){
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    }else {
      // Change bg back
      currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.style.getAttribute('src')

      // Change bg back
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.style.getAttribute('src')

      setCurrentColorArrangement([...currentColorArrangement])
    }

  }


  
  // CREATE GAME BOARD
  const createBoard = () => {
    // Create a empty array
    const randomColorArrangement = []

    // Loop through width * width times
    for(let i = 0; i < width * width; i++){

      // Get a random color from candyColors array
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]

      // Push randomColor to randomColorArrangement array
      randomColorArrangement.push(randomColor)
    }

    // Set state to randomColorArrangement
    setCurrentColorArrangement(randomColorArrangement)

  }

  // Run createBoard
  useEffect(() => {
    createBoard()
  }, [])

  // Run checkForColumnOfThree
  useEffect(() => {

    // Every 100ms, run checkForColumnOfThree
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)

    return () => clearInterval(timer)

  }, [checkForColumnOfFour, checkForRowOfFour , checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow,  currentColorArrangement])

  return (
    <div className='app'>
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img 
          key={index} 
          src={candyColor}
          alt={candyColor} 
          data-id={index}
          draggable={true}
          onDragStart={dragStart} 
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
           />
        ))}
      </div>
    </div>
  )
}

export default App
