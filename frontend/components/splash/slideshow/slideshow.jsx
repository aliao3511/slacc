import React from 'react';
import Slide from './slide';

class Slideshow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // replace with screenshots once functional
            images: [
                {   
                    id: 0,
                    url: window.slide0_URL,
                    description: 'Organize conversations',
                },
                {   id: 1,
                    url: window.slide1_URL,
                    description: 'Share files and documents',
                },
            ],
            currentIdx: 0,
        };
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
                        {images.map(image => <li key={image.id} 
                                                onClick={this.selectIdx(image.id)} 
                                                className={image.id === currentIdx ? 'selected' : ''}>
                                                    <div className={`slideshow-icon-${image.id}`}></div>
                                                    <div className='slideshow-caption'>{image.description}</div>
                                            </li>)}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Slideshow;