import React, { Component } from 'react'

export class TestCanvas extends Component {

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

    canvas
    ctx
    img
    vid
    interval
    timeOut

    constructor(props) {
        super(props);
        this.state = {
            started: false,
            playing: false,
            timer: 0
        }
    }

    

    componentDidMount() {
        this.canvas = this.refs.canvas
        this.ctx = this.canvas.getContext("2d")
        var ctxTmp = this.ctx
        this.img = this.refs.image
        this.vid = this.refs.video

        this.ctx.drawImage(this.img, 0, 0, 640, 425)
        this.ctx.fillText("Click me!", 270, 300)

        var sentenceTmp = this.source[1].sentence

        this.vid.addEventListener('play', function () {
            var $this = this; //cache
            (function loop(x) {
                if (!$this.paused && !$this.ended) {
                    ctxTmp.drawImage($this, 0, 0, 640, 425);
                    ctxTmp.font = "30px Arial";
                    ctxTmp.strokeText(sentenceTmp, 10, 50);
                    setTimeout(loop, 1000 / 30); // drawing at 30fps
                }
            })();
        }, 0);

        this.vid.addEventListener('timeupdate',function(){
            if(this.currentTime>=5){
                this.pause()
            }
        })


        

    }

    tick() {
        if (!this.state.started) {
            this.setState({
                started: true,
                playing: true
            })
            this.interval = setInterval(() => {
                let s = this.state.timer
                s = s + 100
                this.setState({
                    timer: s
                })
            }, 100)
            this.ctx.drawImage(this.img, 0, 0, 640, 425)
            this.ctx.font = "30px Arial";
            this.ctx.strokeText(this.source[0].sentence, 10, 50);
            this.timeOut = setTimeout(function (x) {
                x.play()
            }, this.source[0].duration * 1000,this.vid)
        } else {
            if (this.state.playing) {
                this.setState({
                    playing: false
                })
                if(this.state.timer<3000){
                    clearTimeout(this.timeOut)
                }else{
                    this.vid.pause()
                }
                clearInterval(this.interval)
            } else {
                this.setState({
                    playing: true
                })
                if(this.state.timer<3000){
                    this.timeOut = setTimeout(function (x) {
                        x.play()
                    }, 3000-this.state.timer,this.vid)
                }else{
                    this.vid.play()
                }
                this.interval = setInterval(() => {
                    let s = this.state.timer
                    s = s + 100
                    this.setState({
                        timer: s
                    })
                }, 100)
            }
            if(this.state.timer>8000){
                this.vid.pause()
            }
        }
    }



    render() {
        return (
            <div>
                <canvas ref="canvas" width={960} height={540} onClick={this.tick.bind(this)} />
                <img ref="image" src={this.source[0].media} style={{ display: "none" }} />
                <video ref="video" src={this.source[1].media} controls style={{ display: "none" }} />
            </div>
        )
    }
}

export default TestCanvas
