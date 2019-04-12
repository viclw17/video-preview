import React from 'react';
import VideoData from './VideoData';

class VideoPreview extends React.Component {
    componentDidMount() {
        document.fonts.ready.then(() => {
            // for some reason, we need to wait a little longer still...
            window.setTimeout(() => {
                this.beginDraw(this.refs.canvas);
            }, 200);
        });
    }

    beginDraw(canvas) {
        const ctx = canvas.getContext('2d');

        // const font_size = 10;
        // const message = "Your preview here!";
        // ctx.font = `${font_size}px "${VideoData.font}"`;
        // ctx.fillText(
        //     message,
        //     canvas.width / 2 - ctx.measureText(message).width / 2,
        //     canvas.height / 2 - font_size / 2,
        // );

        var video = document.createElement("video");
        video.src = VideoData.background.mp4_url;
        // video.autoplay = true;
        // video.loop = true;

        // Render first video frame
        canvas.width = VideoData.background.width;
        canvas.height = VideoData.background.height;
        requestAnimationFrame(updateCanvas);

        var animFrame = 0;

        // Draw text, just brute force animation...
        function drawText() {
            animFrame+=1;

            var xTextOffset = 10;
            var yTextOffset = 70;
            var boxH = 90;
            var frtClipDuration = 180;
            var sndClipDuration = 70;

            if(animFrame <= frtClipDuration){
                ctx.fillStyle = 'rgba('+ VideoData.text_background_color +')';
                var boxAnimDuration = 40;

                // letter box
                if (animFrame <= boxAnimDuration) {
                    ctx.fillRect(100, 430, 860*animFrame/boxAnimDuration, boxH);
                    ctx.fillRect(100, 430+boxH+10, 380*animFrame/boxAnimDuration, boxH);
                }else{
                    ctx.fillRect(100, 430, 860, boxH);
                    ctx.fillRect(100, 430+boxH+10, 380, boxH);
                }

                ctx.fillStyle = 'white';
                ctx.font = "75px " + VideoData.font;
                // "What is"
                ctx.fillText(
                    VideoData.text[0].content.slice(0,
                    VideoData.text[0].keyword_indexes[0]),
                    100+xTextOffset, 430+yTextOffset);
                // "morning"
                ctx.fillText(
                    VideoData.text[0].content.slice(
                    VideoData.text[0].keyword_indexes[1],
                    VideoData.text[0].keyword_indexes[1]+8),
                    100+xTextOffset+500, 430+yTextOffset);
                // "routine?"
                ctx.fillText(
                    VideoData.text[0].content.slice(
                    VideoData.text[0].keyword_indexes[1]+8,
                    VideoData.text[0].keyword_indexes[1]+17),
                    100, 430+yTextOffset*2+30);

                ctx.fillStyle = 'rgba('+ VideoData.highlight_color +')';
                // "your"
                ctx.fillText(
                    VideoData.text[0].content.slice(
                    VideoData.text[0].keyword_indexes[0],
                    VideoData.text[0].keyword_indexes[1]),
                    100+xTextOffset+300, 430+yTextOffset);
            }
            else{
                // letter box
                ctx.fillStyle = 'rgba('+ VideoData.text_background_color +')';
                if (animFrame <= frtClipDuration+sndClipDuration) {
                    ctx.fillRect(100, 470, 600*(animFrame-frtClipDuration)/sndClipDuration, boxH);
                }else{
                    ctx.fillRect(100, 470, 600, boxH);
                }

                ctx.fillStyle = 'white';
                ctx.font = "75px " + VideoData.font;
                // "Coffee"
                ctx.fillText(
                    VideoData.text[1].content.slice(0,
                    VideoData.text[1].keyword_indexes[0]),
                    100+xTextOffset, 470+yTextOffset);
                // "Email"
                ctx.fillText(
                    VideoData.text[1].content.slice(
                    VideoData.text[1].keyword_indexes[1],
                    VideoData.text[1].keyword_indexes[1]+7),
                    100+xTextOffset+320, 470+yTextOffset);

                ctx.fillStyle = 'rgba('+ VideoData.highlight_color +')';
                // "+"
                ctx.fillText(
                    VideoData.text[1].content.slice(
                    VideoData.text[1].keyword_indexes[0],
                    VideoData.text[1].keyword_indexes[1]),
                    100+xTextOffset+280, 470+yTextOffset);
            }
            requestAnimationFrame(drawText);
        }

        function updateCanvas(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(video,0,0,canvas.width,canvas.height);

            // reset
            if(video.currentTime * 1000 >= VideoData.duration){
                // cancelAnimationFrame(drawText);
                animFrame = 0;
                video.currentTime = 0;
            }
            requestAnimationFrame(updateCanvas);
            // console.log(animFrame);
        }

        function clickToPlay(){
            updateCanvas()
            drawText();
            video.play();
        }
        canvas.addEventListener("click",clickToPlay);
    }

    render() {
        return (
            <div className="lefts-border-line manufacturer-panel">
                <h1 className="manufacturer-title">
                    Video Preview
                </h1>
                <hr/>
                <div className="video-container">
                    <div className="aspect-ratio-fixer">
                        <div className="use-aspect-ratio">
                            <canvas ref="canvas"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoPreview;
