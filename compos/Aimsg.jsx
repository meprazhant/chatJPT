import React from 'react'

function Aimsg(props) {
    var typ = props.typing
    var msg = props.msg
    return (
        <div className='aimsg'>
            <div className="mypfp">
                <img src="https://d3lkc3n5th01x7.cloudfront.net/wp-content/uploads/2019/06/02232639/AI_application_banner.png" alt="pfp" />
            </div>
            {typ ? <div className="typing">
                <div className="typingdot"></div>
                <div className="typingdot"></div>
                <div className="typingdot"></div>
            </div> : null}
            <div className="myaimessage">
                {msg}
            </div>




        </div>
    )
}

export default Aimsg