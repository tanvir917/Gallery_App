import './App.css';
import React, {useState, useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {decrement, increment, incrementByAmount} from './redux/counter';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  // const {value} = useSelector(state => state.counter);
  // const dispatch = useDispatch();
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    .then((response) => response.json())
    .then((data) => {
      setImages(data.hits);
      setIsLoading(false);
    })
    .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
     <ImageSearch searchText={(text) => setTerm(text)} />
     {!isLoading && images.length === 0 && <h1 className="text-6xl text-center mx-auto mt-32">No Image Found</h1> }
     {isLoading ? 
     <h1 className="text-6xl text-center mx-auto mt-32">Loading Images</h1> :  <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>}
    </div>
    // <div className="text-lg">
    //   <h1>The count is: {value}</h1>
    //   <button className="bg-blue-500 px-4 py-4 text-white rounded-lg" onClick={() => dispatch(increment())} >increment</button>
    //   <button onClick={() => dispatch(decrement())}>decrement</button>
    //   <button onClick={() => dispatch(incrementByAmount(33))} >increment by 33</button>
    // </div>
    // <div className="container p-4">
    //   <TailwindCSSButton> Tail button</TailwindCSSButton>
    // </div>
  )
};

function TailwindCSSButton(props) {
  return (
    <button className="bg-blue-500 text-white 
    font-medium px-4 py-4 rounded hover:bg-blue-600" >{props.children}</button>
  )
}

export default App;   
