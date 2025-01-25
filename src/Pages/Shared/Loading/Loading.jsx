import ReactLoading from 'react-loading'

const Loading = () => {
    return (
        <div className="md:w-[80%] mx-auto mt-9">
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-blue-600 animate__animated animate__fadeIn animate__slower">
                    <ReactLoading type="spin" color="orange" />
                </div>
            </div>
        </div>
    );
};

export default Loading;