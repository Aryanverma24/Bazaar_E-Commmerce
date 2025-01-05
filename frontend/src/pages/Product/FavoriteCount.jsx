import { useSelector } from "react-redux"

const FavoriteCount = ({sidebar}) => {
  
    const favorites = useSelector(state => state.favorites)
    const favoriteCount = favorites.length;
    console.log(sidebar)
  return (
    <>
    {sidebar ? (
        <div className="absolute left-[7.2rem] top-[19rem]">
            {favoriteCount > 0 && (
              <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {favoriteCount}
              </span>
             )}
        </div>
    ) : (
          <div className="absolute left-6 top-[16.5rem]">
          {favoriteCount > 0 && (
              <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {favoriteCount}
              </span>
             )}
       </div>
    ) }
  
    </>
    
  )
}

export default FavoriteCount