import { useState, useEffect } from 'react'
import { boardService } from '../services/board.service'
import { BoardCell } from '../cmps/BoardCell'

export function BoardPage() {
    const [board, setBoard] = useState([])
    const [selectedCell, setSelectedCell] = useState(null)
    const [player, setPlayer] = useState('W')
    const [gameBoards, setGameBoards] = useState([])
    const [undoBoards, setUndoBoards] = useState([])
    const [loser, setLoser] = useState('')

    useEffect(() => {
        const newGameBoard = boardService.buildBoard(8)
        setBoard(newGameBoard)
        setGameBoards([newGameBoard])
    }, [])

    const togglePlayer = () => {
        setPlayer(player === 'W' ? 'B' : 'W')
    }

    const onRestart = () => {
        const newGameBoard = boardService.buildBoard(8)
        setBoard(newGameBoard)
        setLoser('')
        setPlayer('W')
        setGameBoards([newGameBoard])
    }

    const onUndo = () => {
        if (loser) return
        const undoBoard = gameBoards.pop()
        if (undoBoard) {
            const clearBoard = clearSelectedCells(undoBoard)
            setBoard(clearBoard)
            setUndoBoards([...undoBoards, undoBoard])
            togglePlayer()
        }
    }

    const onRedo = () => {
        if (loser) return
        const redoBoard = undoBoards.pop()
        if (redoBoard) {
            const clearBoard = clearSelectedCells(redoBoard)
            setBoard(clearBoard)
            setGameBoards([...gameBoards, redoBoard])
            togglePlayer()
        }
    }

    const onClickCell = (row, col, type) => {
        if (player !== type && type !== 'X') return
        if (board[row][col].isSelected) {
            onMoveChecker(selectedCell, board[row][col], player);
            setSelectedCell(null)
            const clearBoard = clearSelectedCells(board)
            setBoard(clearBoard)
            togglePlayer()
            return
        }
        const clearBoard = clearSelectedCells(board)
        setBoard(clearBoard)
        setSelectedCell(board[row][col])
        board[row][col].isSelected = true
        const selectedCellBoard = boardService.getPossibleCells(row, col, board, type)
        setBoard(selectedCellBoard)
    }

    const onMoveChecker = (fromCell, toCell, type) => {
        const updatedBoard = boardService.moveChecker(board, fromCell, toCell, type)
        setBoard(updatedBoard)
        setGameBoards([...gameBoards, updatedBoard])
        const lostPlayer = boardService.isGameOver();
        (lostPlayer) ? setLoser(lostPlayer) : setLoser('')
    }

    const clearSelectedCells = (clearBoard) => {
        clearBoard.forEach(row => {
            row.forEach(cell => {
                cell.isSelected = false
            })
        })
        return clearBoard
    }

    return (
        <section className="app-page flex column justify-center align-center">
            {!loser && <h1> {player === 'W' ? 'White' : 'Black'} Player Turn</h1>}
            {loser && <h1>{loser}</h1>}
            <table>
                <tbody>
                    {
                        board.map((row, i) => {
                            return <tr key={i}>
                                {
                                    row.map((column, j) =>
                                        <BoardCell
                                            key={i + j}
                                            cellObj={board[i][j]}
                                            onClickCell={onClickCell}
                                            row={i}
                                            col={j}
                                        />)
                                }
                            </tr>
                        })
                    }

                </tbody >
            </table >
            <div className="btns flex">
                <button className="btn clean-btn" onClick={onRestart}>Restart</button>
                <button className="btn clean-btn" onClick={onUndo}>Undo</button>
                <button className="btn clean-btn" onClick={onRedo}>Redo</button>
            </div>
        </section >
    )
}

