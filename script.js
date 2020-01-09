const canvas = document.getElementById('canvas')

// Drawing done using context

const ctx = canvas.getContext('2d')

if (false) {

    // canvas.width = window.innerWidth
    
    //fillRect
    
    ctx.fillStyle = 'red'
    ctx.fillRect(20,20,150,100)
    ctx.fillRect(200,20,150,100)
    
    // strokeREct
    
    ctx.strokeStyle = 'green'
    ctx.lineWidth = 5
    ctx.strokeRect(100,200,150,100)
    
    // clearRect - clears part of rect (for animations)
    
    ctx.clearRect(25,25,140,90)
    
    //fillText
    
    ctx.fillStyle = 'blue'
    ctx.font = "30px Arial"
    ctx.fillText("Hello world",500,50)
    
    // strokeText
    
    ctx.strokeStyle = 'orange'
    ctx.lineWidth = 2
    ctx.strokeText("Hello world", 500, 70)
}

if (false) {
    //paths
    ctx.beginPath();
    ctx.moveTo(50,50)
    ctx.lineTo(150,50)
    ctx.lineTo(100,200)
    // ctx.lineTo(50,50)
    ctx.closePath()
    // ctx.stroke()
    ctx.fillStyle = 'coral'
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(200,50)
    ctx.lineTo(150,200)
    ctx.lineTo(250,200)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.rect(300,50, 150, 100)
    ctx.fill()
    
}

if (false) {

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    //Arcs
    ctx.beginPath()

    // head
    ctx.arc(centerX,centerY , 200, 0, Math.PI * 2)

    // move to mouth
    ctx.moveTo(centerX + 100, centerY)

    // draw mount
    ctx.arc(centerX, centerY, 100, 0, Math.PI, false)

    // ctx.closePath()

    //move to left eye

    ctx.moveTo(centerX-60, centerY-80)

    //draw left eye
    ctx.arc(centerX-80, centerY-80, 20, 0, Math.PI * 2)


    //move to right eye

    ctx.moveTo(centerX+100, centerY-80)

    //draw right eye
    ctx.arc(centerX+80, centerY-80, 20, 0, Math.PI * 2)
    ctx.stroke()
}

if (false) {
    // quadratic curve - 1 control point
    // bezier curve - 2 control points
    // ctx.quadraticCurveTo(...)
}


// animation 1
if (false) {
    const circle = {
        x: 200,
        y: 200,
        size: 30,
        dx: 5,
        dy: 4
    }

    const drawCircle = () => {
        ctx.beginPath()
        ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2)
        ctx.fillStyle = 'purple'
        ctx.fill()
    }

    const update = () => {
        ctx.clearRect(0,0,canvas.width, canvas.height)

        drawCircle()

        // change circle position
        circle.x += circle.dx
        circle.y += circle.dy

        // detect side walls

        if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
            circle.dx *= -1
        }
        if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
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
        ctx.drawImage(image, player.x, player.y, player.w, player.h)
    }

    const clear = () => {
        ctx.clearRect(0,0, canvas.width, canvas.height)
    }

    const detectWalls = () => {
        if (player.x < 0) {
            player.x = 0
        }
        else if (player.y < 0) {
            player.y = 0
        }
        else if (player.x + player.w > canvas.width) {
            player.x = canvas.width - player.w
        }
        else if (player.y + player.h > canvas.height) {
            player.y = canvas.height - player.h
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




