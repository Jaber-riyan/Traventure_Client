const Overview = () => {
    return (
        <div>
            
            <h2 className='text-4xl underline text-center mb-6 font-bold dark:text-white text-zinc-700'>Overview</h2>
            <iframe 
                className='h-64 md:h-96 md:w-[800px] w-full mx-auto rounded-xl shadow-[0_0_15px_#000] dark:shadow-[#b9b9b9]' 
                src="https://www.youtube.com/embed/0NMIZ-PTt8k?si=GM-RECmoXWyKLCB5" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowfullscreen
            ></iframe>
        </div>
    );
};

export default Overview;
