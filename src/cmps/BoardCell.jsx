

export function BoardCell({ cellObj, onClickCell, row, col }) {
    return (
        <td
            className={cellObj.isSelected ? 'selected' : ''}
            onClick={() => { onClickCell(row, col, cellObj.value) }}
        >
            {cellObj.value === 'B' && <div className="black-checker"> </div>}
            {cellObj.value === 'W' && <div className="white-checker"> </div>}
        </td>
    )
}
