
function EmiteFacturaEmitent( props ) {

    const {emitent} = props

    return (
        <div className="emitent-container">
            <div> <b>Denumire:</b> {emitent[1]} {emitent[2]}</div>
            <div> <b>Reg. com.:</b> {emitent[3]} </div>
            <div> <b>Cod fiscal:</b> {emitent[5] === '1' ? "RO" : ""} {emitent[4]}</div>
            <div style={{paddingBottom: '15px'}}> <b>Capital Social:</b> {emitent[6]} </div>
            <div> <b>Adresa:</b> {`Loc. ${emitent[7]}, Str. ${emitent[8]}, Nr. ${emitent[9]}, Sc. ${emitent[10]}, Ap. ${emitent[11]}, Jus. ${emitent[12]}`} </div>
            <div> <b>Telefon:</b> {emitent[13]} </div>
            <div style={{paddingBottom: '15px'}}> <b>Email:</b> {emitent[14]} </div>
            <div> <b>IBAN:</b> {emitent[15]} </div>
            <div> <b>Banca:</b> {emitent[16]} </div>
        </div>
    )

}

export default EmiteFacturaEmitent