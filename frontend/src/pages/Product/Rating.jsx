import {FaStarHalfAlt,FaRegStar , FaStar} from 'react-icons/fa'

const Rating = ({value,text,color}) => {

    const fullstar = Math.floor(value);
    const halfstar = value - fullstar > 0.5 ? 1 : 0 ;
    const emptystar = 5 - fullstar - halfstar;

  return (
    <div className='flex justify-center text-white'>

        {[...Array(fullstar)].map((_,index)=> (
            <FaStar key={index} className={`text-${color} ml-1`} />
        ))
        }

        {halfstar===1 && <FaStarHalfAlt className={`text-${color} ml-1`} />}
        {[...Array(emptystar)].map((_,index)=> (
            <FaRegStar key={index} className={`text-${color} ml-1`} />
        ))
        }
        <span className={`rating-text text-xl ml-2 mt-[-0.5rem]`}>{text && text}</span>
    </div>
  )
}

Rating.defaultProps ={
    color : 'yellow-500'
}

export default Rating