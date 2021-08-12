import React from 'react'
import { Image, Button, Space, Card } from 'antd';

const Adicional = () => {
    return (

        <Card>
            <div className = " text-center">

                <h1 className = "lead text-center mt-4 text-primary">FELIZZZZZZZZZZZZZZZZZZZZZ CUMPLEEEEEEEEEEEEEEEAÑOSSSSS</h1>
                <p className = "lead text-center" > 😍 😍 😍 😍 Iliana :) 😊 😊 😊 😊 </p>
                <Image 
                    width={400}
                    src={`https://st4.depositphotos.com/1006075/31243/i/600/depositphotos_312439056-stock-photo-happy-birthday-cupcake.jpg`}
                    
                />
                {/* <img ></img> */}
                <p className ="lead">!Felicidades en tu cumpleaños!!! Cada aliento de tu vida se tierno y fresco como el día en que naciste.</p>
                <p className ="lead">Lleno de muchas alegrías</p>
            </div>
        </Card>

    )
}

export default Adicional;
