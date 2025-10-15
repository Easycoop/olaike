/* eslint-disable react/prop-types */
const ValidationError = ({validationErrors, field, style}) => {
    // console.log(validationErrors);
    return(
        <>
            {validationErrors && validationErrors[field] &&
                validationErrors[field].map((err, index)=>{
                    return (
                        <div key={index} style={style}>
                            <span className="error__message">{err}</span> <br />
                        </div>
                    )
                })
            }
        </>
            
    )
    
}

export default ValidationError;