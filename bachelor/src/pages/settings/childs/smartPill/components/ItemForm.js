// https://javascript.plainenglish.io/how-to-create-a-multi-step-form-with-react-hooks-53a85efdff62

import React from "react";
import TimePicker from 'rc-time-picker';
import moment from 'moment';
const showSecond = false;

const ItemForm = ({ label, children, type = "text", ...otherProps }) => {
    return(
             <TimePicker
                    style={{ width: 100 }}
                    showSecond={showSecond}
                    defaultValue={moment()}
                    className='add-medicine__time__timepicker'
                  />
   
    )
};

export default ItemForm;

// import React from "react";

// const ItemForm = ({ label, children, type = "text", ...otherProps }) => (
//     <div>
//         {type === "text" ? (
//             <>
//                 <label>{label}</label>
//                 <input type={type} {...otherProps} />
//             </>
//         ) : (
//             <>
//                 <label />
//                 <input type={type} {...otherProps} />
//                 {label}
//             </>
//         )}
//     </div>
// );

// export default ItemForm;
