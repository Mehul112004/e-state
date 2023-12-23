
function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-4xl font-semibold text-center my-8">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-10">
        <div className="flex gap-4 flex-col flex-1">
          <input
            type="text"
            placeholder="Name"
            className="p-3 border rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="p-3 border rounded-lg"
            id="description"
            rows={3}
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="p-3 border rounded-lg"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <label htmlFor="sale">Sell</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className=" flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                className="p-1 border border-gray-300 rounded-lg"
              />
              <label htmlFor="bedrooms">Bedrooms</label>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min={1}
                max={10}
                required
                className="p-1 border border-gray-300 rounded-lg"
              />
              <label htmlFor="bathrooms">Bathrooms</label>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min={1}
                max={10}
                required
                className="p-1 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <label htmlFor="regularPrice">Regular Price</label>
                <span className="text-sm font-thin">$ per month</span>
              </div>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="number"
                id="discountedPrice"
                min={1}
                max={10}
                required
                className="p-1 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <label htmlFor="discountedPrice">Discounted Price</label>
                <span className="text-sm font-thin">$ per month</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-1 flex-wrap max-w-md">
          <p className="font-semibold">
            Images :
            <span className="font-normal text-gray-700 ml-2">
              First image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              accept="image/*"
              multiple
              id="images"
              className="border border-black p-2 rounded-md"
            />
            <button className="px-2 py-1 border text-green-700 border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-600 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
