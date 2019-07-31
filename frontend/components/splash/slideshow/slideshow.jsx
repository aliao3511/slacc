import React from 'react';
import Slide from './slide';

class Slideshow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // replace with screenshots once functional
            images: [
                'slacc_homepage.png',
                'slacc_file_sharing.png',
            ],
            currentIdx: 0,
        }
    }

    selectIdx(idx) {
        return () => {
            this.setState({ currentIdx: idx });
        };
    }

    render() {
        const { images, currentIdx } = this.state;
        return (
            <div className="splash-slideshow">
                <Slide image={images[currentIdx]}/>
                <nav>
                    <ul>
                        {images.map((image, idx) => <li key={idx} onClick={this.selectIdx(idx)}>{idx}</li>)}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Slideshow;