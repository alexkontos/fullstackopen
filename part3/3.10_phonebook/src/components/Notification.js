const Notification = ({ text, isError }) => {
    if (!text) {
        return null
    } else {
        return (
            <div className={`notification ${isError ? "error" : "success"}`}>
                {text}
            </div>
        )
    }

}

export default Notification