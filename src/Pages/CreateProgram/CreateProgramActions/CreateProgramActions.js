import { color } from 'd3';
import styles from './CreateProgramActions.module.scss';
import classNames from "classnames/bind";



const cx = classNames.bind(styles);
const CreateProgramActions = () => {
    
    return <div  className={cx("create-program__actions_group")}>
    <div  className={cx("create-program__actions")}>
   
    <button>Back</button>
   
    </div>
        
        <div className={cx("create-program__actions")} >
           
             <button style={{color: "red", textDecoration: "underline", backgroundColor:"transparent", }}>
                Cancel
            </button>
            <button>Save</button>
        </div>

    </div>
}
 
export default CreateProgramActions;