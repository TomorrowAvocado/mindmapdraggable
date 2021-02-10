import React, { Component } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Canvas from './Canvas';

class ZoomableWrapper extends Component {
    render() {
        const options = {
            limitToWrapper: false,
            limitToBounds: false,
        }

        const panOptions = {
            disableOnTarget: ["div", "h2", "button"]
        }

        const wheelOptions = {
            disabled: false,
            step: 100,
        }

        return (
            <TransformWrapper
                defaultScale={1}
                defaultPositionX={0}
                defaultPositionY={0}
                options={options}
                pan={panOptions}
                wheel={wheelOptions}
            >
                <TransformComponent>
                    <Canvas />
                </TransformComponent>
            </TransformWrapper>
        )
    }
}

export default ZoomableWrapper