import { forwardRef ,useImperativeHandle,useRef} from "react";
import { createPortal } from "react-dom";
const ResultModal=forwardRef( function ResultModel({targetTime,timeLeft,onReset},ref){
    
    const dialog=useRef();

    const userLost=timeLeft<=0;

    const formattedRemainingTime = (timeLeft/1000).toFixed(2);

    const score = Math.round((1- timeLeft / (targetTime*1000))*100);

    useImperativeHandle(ref,()=>{
        return{
            open(){
                if(dialog.current)
                dialog.current.showModal();
            else{
                console.error("dialog ref is not initilized");
            }
            }
    }
    })
    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
           {userLost ? <h2>You lost</h2>:<h2>Your Score:{score}</h2>}
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button >Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    );
})
export default ResultModal;