/* eslint-disable react/prop-types */
const ValidationError = ({validationErrors, field}) => {
    // console.log(validationErrors);
    return(
        <>
            {validationErrors && validationErrors[field] &&
                validationErrors[field].map((err, index)=>{
                    return (
                        <div key={index}>
                            <span className="error__message">{err}</span> <br />
                        </div>
                    )
                })
            }
        </>
            
    )
    
}

export default ValidationError;