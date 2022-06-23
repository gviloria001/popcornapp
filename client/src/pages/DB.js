import { useState } from "react"

export default function DB() {
    const [visible, setVisible] = useState(false);

    return (
        <div className='site-layout'>
            <div className='header'>
                Popcorn Theaters
            </div>
            <div className='report-bar'>
                <button onClick={() => setVisible(!visible)}>{visible ? 'Show' : 'Hide'}
                </button>
                {visible &&
                    <button>
                        My element
                    </button>
                }
            </div>
            <div className='site-content'>

            </div>
            <div className='footer'>
                All Rights Reversed
            </div>
        </div>
    )
}