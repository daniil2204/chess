import { Cell } from "../modules/cell";


interface CellProps{
    cell:Cell;
    selected:boolean;
    click:(cell:Cell) => void
}


const CellComponent = ({cell,selected,click}:CellProps) => {
    return(
        <div 
            className={['cell',cell.color,selected ? "selected" : ""].join(' ')} 
            onClick={() => click(cell)}
            style={{background:cell.available && cell.figure ? "green" : ""}}> 

            {cell.available && !cell.figure && <div className={'available'}></div>}
            {cell.figure?.logo && <img src={cell.figure?.logo} alt=""/>}

        </div>
    )
}

export default CellComponent;