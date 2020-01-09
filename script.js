const canvas = [
    document.getElementById('canvas1'),
    document.getElementById('canvas2'),
    document.getElementById('canvas3'),
    document.getElementById('canvas4'),
    document.getElementById('canvas5')
]

// Drawing done using context

const ctx = canvas.map(canvas => canvas.getContext('2d'))

if (true) {

    // canvas.width = window.innerWidth
    
    //fillRect
    
    ctx[0].fillStyle = 'red'
    ctx[0].fillRect(20,20,150,100)
    ctx[0].fillRect(200,20,150,100)
    
    // strokeREct
    
    ctx[0].strokeStyle = 'green'
    ctx[0].lineWidth = 5
    ctx[0].strokeRect(100,200,150,100)
    
    // clearRect - clears part of rect (for animations)
    
    ctx[0].clearRect(25,25,140,90)
    
    //fillText
    
    ctx[0].fillStyle = 'blue'
    ctx[0].font = "30px Arial"
    ctx[0].fillText("Hello world",500,50)
    
    // strokeText
    
    ctx[0].strokeStyle = 'orange'
    ctx[0].lineWidth = 2
    ctx[0].strokeText("Hello world", 500, 70)
}

if (true) {
    //paths
    ctx[1].beginPath();
    ctx[1].moveTo(50,50)
    ctx[1].lineTo(150,50)
    ctx[1].lineTo(100,200)
    // ctx[1].lineTo(50,50)
    ctx[1].closePath()
    // ctx[1].stroke()
    ctx[1].fillStyle = 'coral'
    ctx[1].fill()

    ctx[1].beginPath()
    ctx[1].moveTo(200,50)
    ctx[1].lineTo(150,200)
    ctx[1].lineTo(250,200)
    ctx[1].closePath()
    ctx[1].stroke()

    ctx[1].beginPath()
    ctx[1].rect(300,50, 150, 100)
    ctx[1].fill()
    
}

if (true) {

    const centerX = canvas[2].width / 2
    const centerY = canvas[2].height / 2
    //Arcs
    ctx[2].beginPath()

    // head
    ctx[2].arc(centerX,centerY , 200, 0, Math.PI * 2)

    // move to mouth
    ctx[2].moveTo(centerX + 100, centerY)

    // draw mount
    ctx[2].arc(centerX, centerY, 100, 0, Math.PI, false)

    // ctx[2].closePath()

    //move to left eye

    ctx[2].moveTo(centerX-60, centerY-80)

    //draw left eye
    ctx[2].arc(centerX-80, centerY-80, 20, 0, Math.PI * 2)


    //move to right eye

    ctx[2].moveTo(centerX+100, centerY-80)

    //draw right eye
    ctx[2].arc(centerX+80, centerY-80, 20, 0, Math.PI * 2)
    ctx[2].stroke()
}

if (false) {
    // quadratic curve - 1 control point
    // bezier curve - 2 control points
    // ctx.quadraticCurveTo(...)
}


// animation 1
if (true) {
    const circle = {
        x: 200,
        y: 200,
        size: 30,
        dx: 5,
        dy: 4
    }

    const drawCircle = () => {
        ctx[3].beginPath()
        ctx[3].arc(circle.x, circle.y, circle.size, 0, Math.PI * 2)
        ctx[3].fillStyle = 'purple'
        ctx[3].fill()
    }

    const update = () => {
        ctx[3].clearRect(0,0,canvas[3].width, canvas[3].height)

        drawCircle()

        // change circle position
        circle.x += circle.dx
        circle.y += circle.dy

        // detect side walls

        if (circle.x + circle.size > canvas[3].width || circle.x - circle.size < 0) {
            circle.dx *= -1
        }
        if (circle.y + circle.size > canvas[3].height || circle.y - circle.size < 0) {
            circle.dy*= -1
        }

        requestAnimationFrame(update)
        

    }
    update()
}


// animation 2
if (true) {

    const image = document.getElementById("source")
    const player = {
        w: 50,
        h: 70,
        x: 20,
        y: 200,
        speed: 5,
        dx: 0,
        dy: 0
    }

    const drawPlayer = () => {
        ctx[4].drawImage(image, player.x, player.y, player.w, player.h)
    }

    const clear = () => {
        ctx[4].clearRect(0,0, canvas[4].width, canvas[4].height)
    }

    const detectWalls = () => {
        if (player.x < 0) {
            player.x = 0
        }
        else if (player.y < 0) {
            player.y = 0
        }
        else if (player.x + player.w > canvas[4].width) {
            player.x = canvas[4].width - player.w
        }
        else if (player.y + player.h > canvas[4].height) {
            player.y = canvas[4].height - player.h
        }
        
    }

    const newPos = () => {
        player.x += player.dx;
        player.y += player.dy;

        detectWalls()
    }

    const update = () => {
        clear()

        drawPlayer()

        newPos()

        requestAnimationFrame(update)
    }

    const moveRight = () => {
        player.dx = player.speed    
    }
    
    const moveLeft = () => {
        player.dx = -player.speed
    }
    
    const moveUp = () => {
        player.dy = -player.speed
    }
    
    const moveDown = () => {
        player.dy = player.speed
        
    }

    const keyDown = (e) => {
        e.preventDefault()
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            moveRight()
        }
        else if (e.key === 'ArrowLeft' || e.key === "Left"){
            moveLeft()
        }
        else if (e.key === 'ArrowUp' || e.key === "Up"){
            moveUp()
        }
        else if (e.key === 'ArrowDown' || e.key === "Down"){
            moveDown()
        }
    }

    const keyUp = (e) => {
        if (
            e.key === 'ArrowRight' || e.key === 'Right' ||
            e.key === 'ArrowDown' || e.key === 'Down' ||
            e.key === 'ArrowUp' || e.key === 'Up' ||
            e.key === 'ArrowLeft' || e.key === 'Left'
        ) {
            player.dx = 0
            player.dy = 0
        }
    }

    update()

    document.addEventListener('keydown', keyDown)
    document.addEventListener('keyup', keyUp)


}




