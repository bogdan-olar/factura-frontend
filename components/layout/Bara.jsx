
function Bara(props){

    console.log(props)

    function delog() {
        fetch('https://bogdanolar.pythonanywhere.com/logout').then( res => res.json() ).then( res => props.handleLog(false) ).catch( err => console.log(err) )
    }

    return (
        <div className="bara">
            <div> 
                 <div><b> Utilizator: </b></div>
                 <div> user </div>
            </div>
            <div> 
                <div className="log-element" onClick={delog}> 
                    <span className="log-text"> log out </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                </div>
            </div>
        </div>
    )

}

export default Bara