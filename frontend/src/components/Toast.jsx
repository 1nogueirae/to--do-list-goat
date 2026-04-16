import './Toast.css'

function Toast({ message, type = 'success', onClose }) {

    const typeClass = type === 'error' ? 'toast-error' : 'toast-success'

    return (
        <section className="toast-container">
            <div className={`toast-box ${typeClass}`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-content">
                    <div className="toast-body">
                        {message}
                    </div>
                    <button type="button" className="toast-close" onClick={onClose} aria-label="Close notification">
                        ×
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Toast
