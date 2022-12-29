import React from 'react'

function Myms(props) {
    return (
        <div className='myMsg'>
            <div className="mymessage">
                {props.qn}
            </div>
            <div className="mypfp">
                <img src="https://s.hs-data.com/bilder/spieler/gross/354576.jpg?fallback=png" alt="pfp" />
            </div>
        </div>
    )
}

export default Myms