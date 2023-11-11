import { useNavigate } from "react-router-dom";
import { useFetchFavoritePosts } from "../../api/favorites/favorites";
import LoadingSpinner from "../../global/LoadingSpinner";
import FavoritesCard from "./FavoritesCard";

const SavedFavoritePosts = () => {
  const navigate = useNavigate();
  const { data: savedFavoritesData, isLoading } = useFetchFavoritePosts();
  const favoritesDataTotalCount = savedFavoritesData?.length;
  const isFavoritesDataEmpty = favoritesDataTotalCount === 0;

  return (
    <div className="py-24 bg-whitesmoke min-h-screen h-full">
      <div className="container pt-10">
        {!isFavoritesDataEmpty && (
          <h1 className="text-lg text-center">
            Saved Favorites:{" "}
            <span className="font-bold">{favoritesDataTotalCount}</span>
          </h1>
        )}
        {!isLoading && isFavoritesDataEmpty && (
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-lg">You currently have no saved pets yet...</h1>
            <button onClick={() => navigate("/pets")} className="button-filled">
              Adopt Pet
            </button>
          </div>
        )}
        {!isLoading && (
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
            {savedFavoritesData?.map((data) => (
              <FavoritesCard key={data.id} {...data} />
            ))}
          </div>
        )}
        {isLoading && <LoadingSpinner title="Loading..." size="large" />}
      </div>
    </div>
  );
};

export default SavedFavoritePosts;
