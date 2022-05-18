import Link from 'next/link'
import { useState } from 'react'

export default function Home(props) {

  console.log(props)

  const [data, setData] = useState(props.data[0])

  return (
      <div className="container">
            <h4> Facturi emise </h4>
                          
              {
                data.map( fact => <div key={fact[0]} className='home-page-element'>
                                 <div className='home-page-number'> 
                                   {fact[0]}
                                 </div>
                                 <div className='factura-tot'>
                                      <div className='factura-text'>
                                          <div className='factura'>
                                            <div> <b>Seria:</b> {fact[1]} </div>
                                            <div> <b>Numar:</b> {fact[2]} </div>
                                            <div> <b>Data:</b> {fact[3]} </div>
                                          </div>
                                          <div className='factura-date-client'>
                                            <div style={{fontSize: '20px'}}> Client </div>
                                            <div> <b>Denumire:</b> {fact[4]} {fact[5]} <b>Reg. Com.:</b> {fact[6]}
                                            <b> Cod fiscal: </b> {fact[8] === '1' ? 'RO' : null} {fact[7]} </div>
                                              <div>
                                                  <b>Tel:</b> {fact[9]} <b>Email:</b> {fact[10]} 
                                              </div>
                                          </div>
                                      </div>

                                      <div className='home-page-butoane'>
                                        <Link href={`/${fact[2]}`}> 
                                          <a className='btn btn-outline-primary btn-sm butoane'> Details &gt;&gt;&gt; </a>
                                        </Link>
                                      </div>
                                </div>
                            </div>)
              }

      </div>

  )

}

export async function getServerSideProps() {
  const res = await fetch('http://bogdanolar.pythonanywhere.com/factura')
  const data = await res.json()

  return {
    props: {
      data: data
    }
  }
}
