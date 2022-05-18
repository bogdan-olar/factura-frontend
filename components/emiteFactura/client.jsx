
function EmiteFacturaClient( props ) {

    const { client, selectedClient, handleChange } = props
    const r = client.filter( (c) => c[1] === selectedClient )

    return (
        <div className="client-container">
            <form>
                <div className="form-element-client">
                    <label htmlFor='client' className="select-client-label"> Select a client </label>
                    <select id='client' className="field-element-select" value={selectedClient} name='selectedClient' onChange={handleChange} >
                        {
                            client.map( ( c, i ) => <option key={i} value={c[1]}> {c[1]} </option>)
                        }
                    </select>
                </div>
            </form>
                <div> 
                    <div style={{paddingTop: '15px'}}> <b>Denumire:</b> {r[0][1]} {r[0][2]} </div>
                    <div> <b>Reg. Com.:</b> {r[0][3]} </div>
                    <div> <b>Cod fiscal:</b> {r[0][5] === '1' ? 'RO' : null } {r[0][4]} </div>
                    <div style={{paddingTop: '10px'}}> <b>Telefon:</b> {r[0][6]} </div>
                    <div> <b>Email:</b> {r[0][7]} </div>
                </div> 
        </div>
    )

} 

export default EmiteFacturaClient