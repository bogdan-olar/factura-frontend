
function EmiteFacturaDelegat(props) {

    const { delegat, selectedDelegat, handleChange } = props
    const r = delegat.filter( d => d[1] === selectedDelegat )

    return(
        <div className="client-container" style={{margin: '10px'}}>
            {/* <form> */}
                <div className="form-element-client">
                    <label htmlFor="delegat" className="select-client-label"> Select a delegat </label>
                    <select id='delegat' className="field-element-select" value={selectedDelegat} name='selectedDelegat' onChange={handleChange}>
                    {
                        delegat.map( (delegat, index) => <option key={index} value={delegat[1]}> {delegat[1]} </option>)
                    }
                    </select>
                </div>
            {/* </form> */}
            <div>
                <div style={{paddingTop: '15px'}}> <b>Nume delegat:</b> {r[0][1]} {r[0][2]} </div>
                <div> <b>Serie buletin:</b> {r[0][3]} </div>
                <div> <b>Nr. mijloc transport: </b> {r[0][4]} </div>
            </div>
        </div>
    )

}

export default EmiteFacturaDelegat