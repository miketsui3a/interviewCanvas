import React, { Component } from 'react'

export default class CanvasComponent extends Component {

    source = [{
        index: 0,
        sentence: "This is a simple Javascript test",
        media: "https://miro.medium.com/max/1024/1*OK8xc3Ic6EGYg2k6BeGabg.jpeg",
        duration: 3
    },
    {
        index: 1,
        sentence: "Here comes the video!",
        media: "https://media.gettyimages.com/videos/goodlooking-young-woman-in-casual-clothing-is-painting-in-workroom-video-id1069900546",
        duration: 5
    }]

    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this)
        this.state = {
            started: false,
            playing: false,
            timer: 0
        }
    }

    tickAndPlay(canvas, ctx, img, vid) {
        this.setState(prevState => {
            return { timer: prevState.timer + 1 }
        })
        if (this.state.timer < 3000) {
            ctx.drawImage(img, 0, 0, 640, 425)
            ctx.font = "30px Arial";
            ctx.strokeText(this.source[0].sentence, 10, 50);
        }
    }

    tick(){
        let s = this.state.timer + 1;
        this.setState({
            timer: s
        })
    }

    componentDidMount() {
        var canvas = this.refs.canvas
        var ctx = canvas.getContext("2d")
        var img = this.refs.image
        var vid = this.refs.video

        img.onload = () => {
            ctx.drawImage(img, 0, 0, 640, 425)
            ctx.font = "30px Arial";
            ctx.fillText("Click me!", 270, 300)
        }

        // canvas.onclick = () => {
        //     if (!this.state.started) {
        //         this.setState({
        //             started: true,
        //             playing: true
        //         })
        //         ctx.drawImage(img, 0, 0, 640, 425)
        //         ctx.font = "30px Arial";
        //         ctx.strokeText(this.source[0].sentence, 10, 50);
        //         setTimeout(function () {
        //             vid.play()
        //         }, this.source[0].duration * 1000)
        //     }else{
        //         if(this.state.playing){
        //             vid.pause()
        //             this.setState({
        //                 playing: false
        //             })
        //         }else{
        //             vid.play()
        //             this.setState({
        //                 playing: true
        //             })
        //         }
        //     }

        // }

        canvas.onclick = () => {
            if (!this.state.started) {
                this.setState({
                    started: true,
                    playing: true
                })
                this.intervalID = setInterval(this.tick,1)
            }
        }


        vid.addEventListener('play', function () {
            var $this = this; //cache
            (function loop() {
                if (!$this.paused && !$this.ended) {
                    ctx.drawImage($this, 0, 0, 640, 425);
                    ctx.font = "30px Arial";
                    ctx.strokeText("sadf World", 10, 50);
                    setTimeout(loop, 1000 / 30); // drawing at 30fps
                }
            })();
        }, 0);


    }

    componentWillUnmount(){
        clearInterval(this.intervalID)
    }


    render() {
        return (
            <div>
                <canvas ref="canvas" width={640} height={425} />
                <img ref="image" src={this.source[0].media} style={{ display: "none" }} />
                <video ref="video" src={this.source[1].media} controls style={{ display: "none" }} />
            </div>
        )
    }
}
