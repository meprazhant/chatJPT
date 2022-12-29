import React, { useEffect, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import Aimsg from './Aimsg'
import Myms from './Mymsg'
import Particles from "react-particles";

function Homepage() {


    var [qns, setQns] = useState({
        val: '',
        as: 1
    })
    var [asked, setask] = useState([])
    var [ans, setAns] = useState([])
    var [typing, istyping] = useState(false)
    function send() {
        var qn = document.getElementById('qn').value

        if (qn == '') {
            return
        }
        if (qn.length > 100) {
            setAns([...ans, `Please ask a question that can be answered in a short sentence`])
            document.getElementById('qn').value = ''
            return
        }

        if (qn.includes('developer') || qn.includes('develop') || qn.includes('developed') || qn.includes('developing') || qn.includes('dev')) {
            setAns([...ans, `I am developed by PRASHANT`])
            document.getElementById('qn').value = ''
            return
        }
        if (qn == ('/clear')) {
            setAns([])
            setask([])
            document.getElementById('qn').value = ''
            return
        }
        if (qn == ('/help')) {
            setAns([...ans, `You can ask me any question that can be answered in a short sentence`])
            document.getElementById('qn').value = ''
            return
        }
        if (qn == ('/about')) {
            setAns([...ans, `I am a chatbot developed by Prashant using openai API. You can ask me any question and I will try to reply you.`])
            document.getElementById('qn').value = ''
            return
        }


        // setQns([...qns, qn])
        setQns({ ...qns, val: qn, as: 1 })
        setask([...asked, qn])
        document.getElementById('qn').value = ''
        ask(qn)
        istyping(true)
    }
    function ask(e) {
        fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                qn: e

            })
        }).then(res => res.json()).then(data => {
            istyping(false)
            console.log(data)
            if (data.choices) {
                setAns([...ans, data.choices[0].text])
                setQns({ ...qns, val: data.choices[0].text, as: 0 })
            } else {
                setAns([...ans, `The answer to you question ${e} is longer and I don't have enough money to buy a permium API so please ask questions that can be answered in a short sentence`])
                setQns({ ...qns, val: `The answer to you question ${e} is longer and I don't have enough money to buy a permium API so please ask questions that can be answer`, as: 0 })
            }
            // console.log(qns)

            // setQns([...qns,data])
        }
        )
    }

    function semd() {
        if (event.keyCode === 13) {
            send()
        }
    }
    function godown() {
        var objDiv = document.getElementById("message");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    useEffect(() => {
        godown()
        var name = process.env.NEXT_PUBLIC_NAME

    }, [qns])

    return (
        <div className='Homepage'>
            <div className="homeInfo">
                <a >&lt;HomePage&gt;</a>
                <h2>WELCOME</h2>
                <h5>To ChatJPT, A JPT Chatbot I made because I was bored.</h5>
                <p>Try Asking AI some Questions On Your Right. </p>
                <ul>
                    <li>
                        <p>Ask AI a Question</p>
                    </li>
                    <li>
                        <p>AI will try to answer it</p>
                    </li>
                    <li>
                        <p>Some Important Commands:</p>
                        <ul>
                            <li>
                                <p>/clear - To clear the chat</p>
                            </li>
                            <li>
                                <p>/help - To get help</p>
                            </li>
                            <li>
                                <p>/about - To know about Developer</p>
                            </li>
                        </ul>
                    </li>
                </ul>
                <a >&lt;HomePage/&gt;</a>

            </div>

            <div className="mobileCompo">
                <div className="notch">
                    <div className="notchc">
                        <div className="notchcc"></div>
                    </div>
                </div>

                {
                    // (qns.as == 1) ? <Myms qn={qns.val} /> : <Aimsg msg={qns.val} />
                    <div className="message" id='message'>
                        {qns.as == 1 ? asked.map((qn, index) => {
                            return (
                                <Myms key={index} qn={qn} />
                            )
                        }) :



                            ans.map((an, index) => {
                                return (
                                    <Aimsg key={index} msg={an} />
                                )
                            })
                        }



                    </div>
                }




                {
                    (ans.length == 0) ? <div className="mpt">
                        <img src="https://media3.giphy.com/media/26hkhPJ5hmdD87HYA/giphy.gif" alt="empty" />
                        <p>It seems Empty here, try asking AI a Question</p>
                    </div> : null

                }










                <div className="messageArea">
                    {
                        (typing) ? <div className="typing">
                            <div className="typingdot"></div>
                            <div className="typingdot"></div>
                            <div className="typingdot"></div>
                        </div> : <>
                            <input type="text" onKeyDown={semd} placeholder='Ask me a Question' id='qn' name='qn' />
                            <div className="send" onClick={send}>
                                <IoMdSend size={30} />
                            </div>
                        </>
                    }
                </div>
            </div>

        </div>
    )
}

export default Homepage