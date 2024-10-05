import React, { useState, useEffect } from 'react';
// import videoPath from '../../assets/videos/Iveew.mp4'
import videoImg from '../../assets/imgs/videoImg.png'
import toast from 'react-hot-toast';

const VideoBox = ({ videoURL }) => {
    let [isVideoPlaying, setIsVideoPlaying] = useState(true)
    const handleEnded = () => {
        if (setIsVideoPlaying) {
            setIsVideoPlaying(false)
        }
    };

    const handlePlayVideo = () => {
        if (videoURL) {
            setIsVideoPlaying(true)
        } else {
            toast.error('Video Not Available')
        }
    }


    return (
        <div style={{ width: '100%', maxWidth: '350px' }}>

            {videoURL &&
                <>
                    <div className="heading3 text-center mt-40 mb-20">Video</div>
                    <video
                        controls
                        autoPlay={false}
                        onEnded={handleEnded}
                        style={{ width: '100%', borderRadius: 10 }}
                    >
                        <source src={videoURL} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </>
            }
        </div>
    );
};

export default VideoBox;