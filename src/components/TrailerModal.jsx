import { useEffect } from "react";

const TrailerModal = ({ videoKey, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!videoKey) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
            onClick={handleOverlayClick}
        >
            <div className="relative w-full max-w-4xl aspect-video bg-black">
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                    title="Trailer"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
                <button
                    onClick={onClose}
                    className="absolute -top-5 -right-5 text-white text-xl font-bold bg-black/50 px-3 py-1 rounded hover:bg-black cursor-pointer"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default TrailerModal;
